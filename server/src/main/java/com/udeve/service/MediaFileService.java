package com.udeve.service;
/**
 * +----------------------------------------------------------------------
 * | 友得云客  - 开启房产营销新纪元
 * +----------------------------------------------------------------------
 * | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
 * +----------------------------------------------------------------------
 * | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
 * +----------------------------------------------------------------------
 * | Author: www.youdeyunke.com
 * +----------------------------------------------------------------------
 */

import com.alibaba.fastjson.JSONObject;
import com.udeve.request.AdminMediaFIleCreateRequest;
import com.udeve.request.AdminMediaFIleUpdateRequest;
import com.udeve.utils.file.UdykUtil;
import com.udeve.vo.AdminMediaFileListVo;
import com.udeve.request.MediaFileQueryRequest;
import com.udeve.vo.PageableInfoVo;
import com.udeve.entity.MediaFile;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.udeve.repository.MediaFileRepository;
import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MediaFileService {

    @Autowired
    private MediaFileRepository mediaFileRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    UploadService uploadService;

    public JsonResponse getMediaFiles(MediaFileQueryRequest query){

        Page<MediaFile> files;

        JSONObject data = new JSONObject();
        if (query.getParentId() != null && query.getParentId() != 0){
            Pageable pageable = PageRequest.of(query.getPage()-1,query.getPageSize());
            files = mediaFileRepository.findByParentIdAndIsDeleteFalseOrderByFiletypeAscIdDesc(query.getParentId(), pageable);

            AdminMediaFileListVo medirdto = getMedirdto(query.getParentId());
            AdminMediaFileListVo medirdto1 = getMedirdto(medirdto.getParentId());

            data.put("upper",medirdto1);
            data.put("parent",medirdto);

        }else {
            Pageable pageable = PageRequest.of(query.getPage()-1,query.getPageSize());
            files = mediaFileRepository.findByParentIdIsNullAndIsDeleteFalseOrderByFiletypeAscIdDesc(pageable);

            data.put("upper",null);
            AdminMediaFileListVo adminMediaFileListVo = new AdminMediaFileListVo();
            adminMediaFileListVo.setCanCreateDir(true);
            data.put("parent", adminMediaFileListVo);
        }

        PageableInfoVo page = new PageableInfoVo(files.getPageable(),  files.getTotalPages(), files.getTotalElements());

        List<AdminMediaFileListVo> list = files.getContent().stream().map(mediaFile -> {
            AdminMediaFileListVo dirDto = modelMapper.map(mediaFile, AdminMediaFileListVo.class);

            if(mediaFile.getFiletype().equals("image")){
                dirDto.setCoverUrl(mediaFile.getUrl() + "?imageView2/2/w/100");
            }

            dirDto.setIsDir(dirDto.getFiletype().equals("dir"));
            dirDto.setCanDelete(dirDto.getId() != 0);
            dirDto.setCanMove(!dirDto.getFiletype().equals("dir"));
            dirDto.setCanRename(dirDto.getId() != 0);


            return dirDto;
        }).collect(Collectors.toList());

        data.put("result", list);
        data.put("page", page);



        return JsonResponse.ok(data);
    }

    private AdminMediaFileListVo getMedirdto(Integer id){
        if(id == null){
            AdminMediaFileListVo dto = new AdminMediaFileListVo();
            dto.setCanCreateDir(true);
            return dto;
        }
        MediaFile mediaFile = mediaFileRepository.findById(id).orElse(null);
        if (mediaFile == null){
            return new AdminMediaFileListVo();
        }
        AdminMediaFileListVo dirDto = modelMapper.map(mediaFile, AdminMediaFileListVo.class);
        if(mediaFile.isParentLevelValid()){
            dirDto.setCanCreateDir(true);
        }else {
            dirDto.setCanCreateDir(false);
        }
        dirDto.setCanDelete(true);
        dirDto.setCanMove(false);
        dirDto.setCanRename(true);
        return dirDto;
    }

    public JsonResponse createMediaFile(String userName, AdminMediaFIleCreateRequest mediafile){

        if(mediafile.getFilename() == null || mediafile.getFiletype() == null){
            return JsonResponse.error("请传入数据");
        }

        MediaFile mediaFile = modelMapper.map(mediafile, MediaFile.class);
        mediaFile.setCreatedAt(LocalDateTime.now());
        mediaFile.setUpdatedAt(LocalDateTime.now());
        mediaFile.setIsDelete(false);
        mediaFile.setUser(userName);
        mediaFile.setPlatform("local-storage");//标识文件是哪个存储平台
        if(Objects.equals(0,mediafile.getParentId())){
            mediaFile.setParentId(null);
        }
        mediaFileRepository.saveAndFlush(mediaFile);

        return JsonResponse.ok();
    }

    public JsonResponse updateMediaFile(Integer id, AdminMediaFIleUpdateRequest mediaFIleupdate){
        MediaFile mediaFile = mediaFileRepository.findById(id).orElse(null);
        if (mediaFile== null){
            return JsonResponse.error("文件不存在");
        }
        modelMapper.map(mediaFIleupdate,mediaFile);
        mediaFileRepository.saveAndFlush(mediaFile);

        return JsonResponse.ok();
    }

    public JsonResponse deleteMediaFile(Integer id){

        MediaFile mediaFile = mediaFileRepository.findById(id).orElse(null);
        if (mediaFile==null){
            return JsonResponse.error("文件不存在");
        }
        deletefile(mediaFile);

        return JsonResponse.ok();
    }

    private void deletefile(MediaFile mediaFile){

        if (mediaFile.getFiletype().equals("dir")){
            List<MediaFile> fileList = mediaFileRepository.findListByParentIdAndIsDeleteFalseOrderByFiletypeAscIdDesc(mediaFile.getId());
            for (MediaFile file : fileList) {
                deletefile(file);
            }
        }else{//不是目录时去执行删除文件操作
            if (mediaFile.getPlatform()==null || ("").equals(mediaFile.getPlatform())) {
                throw new RuntimeException("删除失败，文件存储标识为空！");
            }
            delFileForLocal(mediaFile);

        }
        mediaFile.setIsDelete(true);
        mediaFileRepository.saveAndFlush(mediaFile);
    }

    //删除本地文件
    private void delFileForLocal(MediaFile mediaFile){
        String mediaFileUrl = mediaFile.getUrl();
        //通过 getFilestorePath 截取获得 文件路径：/2024/2/20/aaa.png
        //再 拼接  D:/app/upload  +  /2024/2/20/aaa.png  获得绝对路径
        //使用File类的delete方法执行删除
        if(!mediaFileUrl.contains(UdykUtil.getFilestorePath())){
            throw new RuntimeException("当前文件不是本地存储，请检查文件存储标识是否正常！");
        }
        try {
            String[] split = mediaFileUrl.split(UdykUtil.getFilestorePath());//   /filestore
            String pathForFile = split[1];
            String uploadDir = UdykUtil.getUploadDir();
            String delPath = uploadDir + pathForFile;
            File file = new File(delPath);
            if (!file.exists()) {
                //文件已被删除，但删除标记还为false，则更改为true
                if (!mediaFile.getIsDelete()) {
                    mediaFile.setIsDelete(true);
                    mediaFile.setUpdatedAt(LocalDateTime.now());
                    mediaFileRepository.saveAndFlush(mediaFile);
                }
                throw new RuntimeException("文件不存在！");
            }
            if (!file.delete()) {
                throw new RuntimeException("删除文件失败！");
            }
            log.info("Local storage - delete success:{}",mediaFileUrl);
        }catch (RuntimeException e){//只捕获
            log.error("Local storage - runtimeException:{}",e.getMessage());
            throw new RuntimeException(e.getMessage());
        }catch(Exception e){
            log.error("Other exception:{}",e.getMessage());
            throw new RuntimeException("删除文件异常！");
        }
    }
}
