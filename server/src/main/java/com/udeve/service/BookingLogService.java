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

import com.alibaba.excel.EasyExcel;
import com.alibaba.fastjson.JSONObject;
import com.udeve.entity.*;
import com.udeve.repository.*;
import com.udeve.request.BookingLogsRequest;
import com.udeve.request.QueryBookingLogsDto;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.*;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import javax.naming.AuthenticationException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BookingLogService {

    @Autowired
    BookingLogRepository bookingLogRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserService userService;

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BrokerProfileRepository brokerProfileRepository;

    @Autowired
    SysMessageService sysMessageService;

    @Autowired
    AdminUserRepository adminUserRepository;


    public Page<BookingLog> getBookingLogs(QueryBookingLogsDto queryBookingLogsDto) {
        Specification<BookingLog> specification = (Root<BookingLog> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(criteriaBuilder.lessThan(root.get("status"), 3));
            if (queryBookingLogsDto.getKw() != null) {
                predicates.add(criteriaBuilder.or(criteriaBuilder.like(root.get("name"), "%" + queryBookingLogsDto.getKw() + "%"),
                        criteriaBuilder.like(root.get("mobile"), "%" + queryBookingLogsDto.getKw() + "%")));
            }

            if (queryBookingLogsDto.getPostId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("postId"), queryBookingLogsDto.getPostId()));
            }

            if (queryBookingLogsDto.getStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), queryBookingLogsDto.getStatus()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of((queryBookingLogsDto.getPage() - 1), queryBookingLogsDto.getPerPage(), sort);
        Page<BookingLog> pageResult = bookingLogRepository.findAll(specification, pageable);
        return pageResult;
    }


    public JsonResponse getAdminBookingLog(QueryBookingLogsDto queryBookingLogsDto) {
        Page<BookingLog> pageResult = getBookingLogs(queryBookingLogsDto);
        List<BookingLogsVo> result = pageResult.getContent().stream().map(bookingLog -> modelMapper.map(bookingLog, BookingLogsVo.class)).collect(Collectors.toList());
        PageableInfoVo page = new PageableInfoVo(pageResult.getPageable(), pageResult.getTotalPages(), pageResult.getTotalElements());
        JSONObject data = new JSONObject();
        data.put("result", result);
        data.put("page", page);
        return JsonResponse.ok(data);
    }


    /**
     * 删除预约记录
     * @param id
     * @return
     */
    public JsonResponse deleteBookingLogById(Integer id){
        bookingLogRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }

    public void exportBookingLogs(QueryBookingLogsDto dto, HttpServletResponse response){
        Page<BookingLog> bookingLogs = getBookingLogs(dto);
        List<BookingLogsExcelVo> collect = bookingLogs.getContent().stream().map(bookingLog -> {
            BookingLogsExcelVo map = modelMapper.map(bookingLog, BookingLogsExcelVo.class);
            String postTitle;
            Post post = bookingLog.getPost();
            if (post == null || post.getTitle() == null || post.getTitle().isEmpty()) {
                postTitle = "";
            } else {
                postTitle = post.getTitle();
            }
            map.setPostTitle(postTitle);
            if (map.getName()==null){
                map.setName("");
            }

            return map;
        }).collect(Collectors.toList());


        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setCharacterEncoding("utf-8");
        // 这里URLEncoder.encode可以防止中文乱码 当然和easyexcel没有关系
        String fileName = "bookinglogs";
        response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");

        try {
            EasyExcel.write(response.getOutputStream(), BookingLogsExcelVo.class).sheet("预约看房").doWrite(collect);
        } catch (IOException e) {
            throw new RuntimeException("导出失败");
        }


    }

    //添加客户预约楼盘信息
    public JsonResponse addBookingLog(BookingLogsRequest bookingLogsRequest) {
        Optional<Post> postById = postRepository.findById(bookingLogsRequest.getPostId());
        Optional<User> userByid = userRepository.findById(bookingLogsRequest.getUserId());
        BookingLog map = modelMapper.map(bookingLogsRequest, BookingLog.class);
        map.setUpdatedAt(LocalDateTime.now());
        map.setCreatedAt(LocalDateTime.now());
        map.setUserId(bookingLogsRequest.getUserId());
        map.setUser(userByid.get());
        map.setPost(postById.get());
        bookingLogRepository.saveAndFlush(map);
        return JsonResponse.ok("预约成功");
    }

    /**
     * 根据用户id和状态查询预约列表
     * @param userId
     * @param status
     * @return
     */
    public JsonResponse getBookingLogsList(Integer userId,Integer status){
        List<BookingLog> byUserIdAndStatus = bookingLogRepository.findByUserIdAndStatus(userId, status);
        List<BookingLogsListVo> bookingLogsListVos = byUserIdAndStatus.stream().map(bookingLog -> {
            BookingLogsListVo bookingLogsListVo = modelMapper.map(bookingLog, BookingLogsListVo.class);

            if(bookingLogsListVo.getStatus().equals(0)){
                bookingLogsListVo.setStatusName("已预约");
            }else if(bookingLogsListVo.getStatus().equals(1)){
                bookingLogsListVo.setStatusName("已带看");
            }else{
                bookingLogsListVo.setStatusName("已取消");
            }

            return bookingLogsListVo;
        }).collect(Collectors.toList());
        return JsonResponse.ok(bookingLogsListVos);

    }

    /**
     * 小程序用户更新预定状态接口
     * @param userId
     * @param bookingId
     * @param status
     * @return
     */
    public JsonResponse updateBookingStatus(Integer userId,Integer bookingId,Integer status){
        BookingLog byIdAndUserId = bookingLogRepository.findByIdAndUserId(bookingId, userId);
        if(byIdAndUserId==null){
            return JsonResponse.error("未预定");
        }
        if(byIdAndUserId.getStatus().equals(status)){
            return JsonResponse.error("未做出更改");
        }
        byIdAndUserId.setStatus(status);
        byIdAndUserId.setUpdatedAt(LocalDateTime.now());
        bookingLogRepository.saveAndFlush(byIdAndUserId);
        return JsonResponse.ok("更新预定状态成功");

    }
}
