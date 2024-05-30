package com.udeve.utils.file;
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

import com.udeve.utils.constants.Constants;
import com.udeve.entity.Myconfig;
import com.udeve.repository.MyconfigRepository;
import com.udeve.utils.DateUtils;
import com.udeve.utils.text.StringUtils;
import com.udeve.vo.FileInfo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Objects;

@Component
@Slf4j
public class UploadFileUtil {

    private static MyconfigRepository myconfigRepositoryStatic;

    @Autowired
    public void setMyconfigRepository(MyconfigRepository myconfigRepository) {
        UploadFileUtil.myconfigRepositoryStatic = myconfigRepository;
    }

    /**
     * 获取允许上传的文件扩展名数组
     * @return
     */
    public static String[] getALLOWED_EXTENSION() {
        //如果没获取到myconfig的静态成员变量就返回默认的扩展名数组
        if (myconfigRepositoryStatic == null) {
            return Constants.DEFAULT_ALLOWED_EXTENSION;
        }
        Myconfig myconfig = myconfigRepositoryStatic.findFirstByOrderByIdDesc();
        //如果myconfig表中没有配置扩展名，则返回默认的扩展名数组
        if (myconfig==null || myconfig.getUploadAllowedExtension()==null || ("").equals(myconfig.getUploadAllowedExtension())) {
            return Constants.DEFAULT_ALLOWED_EXTENSION;
        }
        String allowedExtension = myconfig.getUploadAllowedExtension();
        return allowedExtension.split(",");
    }

    /**
     * 默认的文件名最大长度 100
     */
    public static final int DEFAULT_FILE_NAME_LENGTH = 100;

    public static final String IMAGE_PNG = "image/png";

    public static final String IMAGE_JPG = "image/jpg";

    public static final String IMAGE_JPEG = "image/jpeg";

    public static final String IMAGE_BMP = "image/bmp";

    public static final String IMAGE_GIF = "image/gif";

    /**
     * 默认上传的地址
     */
    private static String defaultUploadDir = UdykUtil.getUploadDir();

    public static void setDefaultUploadDir(String defaultBaseDir)
    {
        UploadFileUtil.defaultUploadDir = defaultBaseDir;
    }

    public static String getDefaultUploadDir()
    {
        return defaultUploadDir;
    }


    public static FileInfo uploadLocal(MultipartFile file , String domain){
        try
        {
            // 上传文件路径
            String filePath = UdykUtil.getUploadDir();
            log.info("upload file path :{}",filePath);
            // 上传并返回新文件名称 带文件的路径 /filestore/2024/02/01/xxx.png
            String fileName = upload(filePath,file);

            //构建返回对象
            FileInfo fileInfo = new FileInfo();
            if (!("").equals(domain)) {//有配置域名的话换为域名
                if (domain.endsWith("/")){
                    domain = domain.substring(0,domain.length()-1);
                }
                fileInfo.setUrl(domain+fileName);
            }else{
                //获取url  http://192.168.31.45:8080
                String url = getUrl().isEmpty() ? "" : getUrl();
                fileInfo.setUrl(url+fileName);
            }

            fileInfo.setFilename(fileName);
            fileInfo.setContentType(file.getContentType());
            fileInfo.setOriginalFilename(file.getOriginalFilename());
            fileInfo.setSize(file.getSize());
            return fileInfo;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            throw new RuntimeException("上传失败,"+e.getMessage());
        }

    }

    public static String getUrl() {
        String domain;
        try {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            domain = getDomain(request);
            return domain;
        }catch (Exception e){
            log.warn("获取request失败，可能不是客户端发起调用");
            return "";
        }
    }

    // 如果当前请求的 URL 是 http://192.168.31.45:8080/api/v6/upload，应用程序的上下文路径是 ""，那么该方法将返回 http://192.168.31.45:8080
    // URI /api/v6/upload
    public static String getDomain(HttpServletRequest request) {
        StringBuffer url = request.getRequestURL();// http://192.168.31.45:8080/api/v6/upload
        String contextPath = request.getServletContext().getContextPath();//上下文 ""
        // 删除 /api/v6/upload
        StringBuffer delete = url.delete(url.length() - request.getRequestURI().length(), url.length());// http://192.168.31.45:8080
        String string = delete.append(contextPath).toString();// http://192.168.31.45:8080
        return string;
    }

    /**
     * 根据文件路径上传
     *
     * @param baseDir 相对应用的基目录
     * @param file 上传的文件
     * @return 文件名称
     * @throws IOException
     */
    public static final String upload(String baseDir, MultipartFile file) throws IOException {
        try
        {
            return upload(baseDir, file, getALLOWED_EXTENSION());
        }
        catch (Exception e)
        {
            throw new IOException(e.getMessage(), e);
        }
    }

    /**
     * 文件上传
     *
     * @param baseDir 相对应用的基目录
     * @param file 上传的文件
     * @param allowedExtension 上传文件类型
     * @return 返回上传成功的文件名
     */
    public static final String upload(String baseDir, MultipartFile file, String[] allowedExtension) throws  IOException {
        int fileNamelength = Objects.requireNonNull(file.getOriginalFilename()).length();
        if (fileNamelength > DEFAULT_FILE_NAME_LENGTH)
        {
            throw new RuntimeException("文件名过长");
        }

        //判断是否允许上传的文件类型
        if(allowedExtension==null||allowedExtension.length==0){
            log.info("未获取到配置文件中的扩展名，使用默认的扩展名");
            allowedExtension = Constants.DEFAULT_ALLOWED_EXTENSION;
        }
        assertAllowed(file,allowedExtension);

        String fileName = null;
        try {
            fileName = extractFilename(file);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("编码文件名称异常");
        }

        String absPath = getAbsoluteFile(baseDir, fileName).getAbsolutePath();
        file.transferTo(Paths.get(absPath));
        return getPathFileName(baseDir, fileName);
    }

    /**
     * 校验文件大小和文件扩展名是否规范
     * @param file
     * @param allowedExtension
     */
    public static void assertAllowed(MultipartFile file,String[] allowedExtension){
        long size = file.getSize();
        if (size > Constants.DEFAULT_MAX_SIZE)
        {
            throw new RuntimeException("文件大小超过"+Constants.DEFAULT_MAX_SIZE / 1024 / 1024);
        }
        String fileName = file.getOriginalFilename();
        String extension = getExtension(file);
        if (!isAllowedExtension(extension, allowedExtension))
        {
            throw new RuntimeException("["+fileName+"]文件类型错误，请选择正确的文件类型！");
        }

    }

    /**
     * 判断MIME类型是否是允许的MIME类型
     *
     * @param extension
     * @param allowedExtension
     * @return
     */
    public static final boolean isAllowedExtension(String extension, String[] allowedExtension)
    {
        for (String str : allowedExtension)
        {
            if (str.equalsIgnoreCase(extension))
            {
                return true;
            }
        }
        return false;
    }

    /**
     * 编码文件名
     */
    public static final String extractFilename(MultipartFile file) throws IOException, NoSuchAlgorithmException {
        return StringUtils.format("{}/{}_{}.{}", DateUtils.datePath(),
                getMultipartFileMD5(file), Seq.getId(Seq.uploadSeqType), getExtension(file));
    }

    public static String getFileMD5(File file) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            FileInputStream fis = new FileInputStream(file);
            byte[] dataBytes = new byte[1024];

            int bytesRead;
            while ((bytesRead = fis.read(dataBytes)) != -1) {
                md.update(dataBytes, 0, bytesRead);
            }
            byte[] mdBytes = md.digest();

            // 将字节数组转换为BigInteger表示
            BigInteger bigInt = new BigInteger(1, mdBytes);

            // 转换为16进制，并补齐前导零
            String md5 = bigInt.toString(16);
            while (md5.length() < 32) {
                md5 = "0" + md5;
            }
            return md5;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String getMultipartFileMD5(MultipartFile multipartFile) throws IOException, NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] buffer = new byte[8192];
        int bytesRead;
        try (InputStream is = multipartFile.getInputStream()) {
            while ((bytesRead = is.read(buffer)) != -1) {
                md.update(buffer, 0, bytesRead);
            }
        }
        byte[] mdBytes = md.digest();

        // 将字节数组转换为十六进制表示
        StringBuilder sb = new StringBuilder();
        for (byte mdByte : mdBytes) {
            sb.append(Integer.toString((mdByte & 0xff) + 0x100, 16).substring(1));
        }
        return sb.toString();
    }

    /**
     * 获取文件名的后缀
     *
     * @param file 表单文件
     * @return 后缀名
     */
    public static final String getExtension(MultipartFile file) {
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (StringUtils.isEmpty(extension))
        {
            extension = getExtension(Objects.requireNonNull(file.getContentType()));
        }
        return extension;
    }

    public static String getExtension(String prefix) {
        switch (prefix)
        {
            case IMAGE_PNG:
                return "png";
            case IMAGE_JPG:
                return "jpg";
            case IMAGE_JPEG:
                return "jpeg";
            case IMAGE_BMP:
                return "bmp";
            case IMAGE_GIF:
                return "gif";
            default:
                return "";
        }
    }

    public static final String getPathFileName(String uploadDir,String fileName) throws IOException {
        /*int dirLastIndex = uploadDir.length() + 1;
        String currentDir = StringUtils.substring(uploadDir, dirLastIndex);*/
        String filestorePath = "/"+UdykUtil.getFilestorePath();
        String pathFileName = filestorePath + "/" + fileName;
        log.info("pathFileName:{}",pathFileName);
        return pathFileName;
    }

    public static final File getAbsoluteFile(String uploadDir, String fileName) throws IOException
    {
        File desc = new File(uploadDir + File.separator + fileName);

        if (!desc.exists())
        {
            if (!desc.getParentFile().exists())
            {
                desc.getParentFile().mkdirs();
            }
        }
        return desc;
    }

    /**
     * 获取文件名称 /profile/upload/2022/04/16/xxx.png -- xxx.png
     *
     * @param fileName 路径名称
     * @return 没有文件路径的名称
     */
    public static String getName(String fileName)
    {
        if (fileName == null)
        {
            return null;
        }
        int lastUnixPos = fileName.lastIndexOf('/');
        int lastWindowsPos = fileName.lastIndexOf('\\');
        int index = Math.max(lastUnixPos, lastWindowsPos);
        return fileName.substring(index + 1);
    }
}
