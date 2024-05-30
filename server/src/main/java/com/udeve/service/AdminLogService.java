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

import cn.hutool.core.util.ObjectUtil;
import com.alibaba.excel.EasyExcel;
import com.alibaba.fastjson.JSONObject;
import com.udeve.entity.AdminUser;
import com.udeve.repository.AdminUserRepository;
import com.udeve.request.AdminLogQueryRequest;
import com.udeve.utils.ip.IpUtils;
import com.udeve.utils.ip2region.Ip2regionUtils;
import com.udeve.vo.AdminLogExcelVo;
import com.udeve.vo.AdminLogListVoSimple;
import com.udeve.vo.PageableInfoVo;
import com.udeve.entity.AdminLog;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import com.udeve.repository.AdminLogRepository;

import javax.persistence.criteria.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AdminLogService {

    @Autowired
    private AdminLogRepository adminLogRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AdminUserRepository adminUserRepository;


    /**
     * 创建管理员操作日志
     * @param adminUserId 管理员id
     * @param type 操作类型
     * @param operation 操作内容
     * @return
     */

    public JsonResponse createAdminLog(Integer adminUserId, String type, String operation){
        AdminLog adminLog = new AdminLog();
        adminLog.setAdminUserId(adminUserId);
        adminLog.setOperationType(type);
        adminLog.setOperation(operation);
        adminLog.setIsDelete(false);
        adminLog.setIp(IpUtils.getIpAddr());
        adminLog.setIpRegion(Ip2regionUtils.getRegion(adminLog.getIp()));
        adminLog.setCreatedAt(LocalDateTime.now());
        adminLog.setUpdatedAt(LocalDateTime.now());
        if(adminUserId==null && "账号登录".equals(type)){
            adminLog.setAdmin(operation.split("：")[1]);
        }else if (adminUserId!=null){
            Optional<AdminUser> adminUserOptional = adminUserRepository.findById(adminUserId);
            if (adminUserOptional.isPresent()) {
                adminLog.setAdmin(adminUserOptional.get().getEmail());
            }else{
                //只有在B用户登录时，A把B 删掉后，才可能触发此处代码
                log.error("User exception:【用户ID：{}，操作类型：{}，操作内容：{}】",adminUserId,type,operation);
                adminLog.setAdmin("异常用户:"+adminUserId);
            }
        }

        adminLogRepository.saveAndFlush(adminLog);
        return JsonResponse.ok("创建成功");
    }

    public Page<AdminLog> getListing(AdminLogQueryRequest query){
        Specification<AdminLog> specification = (Specification<AdminLog>)(Root<AdminLog> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            //增加一个id大于0的默认条件
            predicates.add(criteriaBuilder.greaterThan(root.get("id"), 0));

            if (query.getDateRange() != null && query.getDateRange() != "") {
                List<LocalDateTime> dates = query.getDates();
                predicates.add(criteriaBuilder.between(root.get("createdAt"), dates.get(0), dates.get(1).plusDays(1)));
            }

            if(!ObjectUtil.equals(query.getKw(), null) && !("").equals(query.getKw())){
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(root.get("ip"), "%" + query.getKw() + "%"),
                        criteriaBuilder.like(root.get("operationType"), "%" + query.getKw() + "%"),
                        criteriaBuilder.like(root.get("operation"), "%" + query.getKw() + "%"),
                        criteriaBuilder.like(root.get("admin"), "%" + query.getKw() + "%"),
                        criteriaBuilder.like(root.get("ipRegion"), "%" + query.getKw() + "%")
                ));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(query.getPage()-1,query.getPerPage(), sort);
        Page<AdminLog> logs = adminLogRepository.findAll(specification, pageable);
        return logs;

    }

    public JsonResponse getLogs(AdminLogQueryRequest query){
        JSONObject data = new JSONObject();
        Page<AdminLog> listing = getListing(query);
        PageableInfoVo page = new PageableInfoVo(listing.getPageable(),  listing.getTotalPages(), listing.getTotalElements());
        List<AdminLogListVoSimple> list = listing.getContent().stream().map(log -> {
            AdminLogListVoSimple logDto = modelMapper.map(log, AdminLogListVoSimple.class);
            return logDto;
        }).collect(Collectors.toList());


        data.put("result", list);
        data.put("page", page);
        return JsonResponse.ok(data);
    }

    public void exportLogs(AdminLogQueryRequest adminLogQueryRequest, HttpServletResponse response){
        adminLogQueryRequest.setPerPage(99999);
        Page<AdminLog> listing = getListing(adminLogQueryRequest);
        List<AdminLog> content = listing.getContent();
        List<AdminLogExcelVo> excelVos = content.stream().map(adminLog -> {
            return modelMapper.map(adminLog, AdminLogExcelVo.class);
        }).collect(Collectors.toList());

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setCharacterEncoding("utf-8");
        // 这里URLEncoder.encode可以防止中文乱码 当然和easyexcel没有关系
        String fileName = "operationLogs";
        response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");

        try {
            EasyExcel.write(response.getOutputStream(), AdminLogExcelVo.class).sheet("操作日志").doWrite(excelVos);
        } catch (IOException e) {
            throw new RuntimeException("导出失败");
        }
    }
}
