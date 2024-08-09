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

import com.udeve.request.AdminRoleCreateRequest;
import com.udeve.vo.AdminRoleListVo;
import com.udeve.request.AdminRoleUpdateRequest;
import com.udeve.entity.Role;
import com.udeve.entity.RolePermissionItem;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.udeve.repository.AdminUserRoleRepository;
import com.udeve.repository.RolePermissionItemRepository;
import com.udeve.repository.RoleRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AdminRoleService {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private RolePermissionItemRepository rolePermissionItemRepository;
    @Autowired
    private AdminUserRoleRepository adminUserRoleRepository;
    @Autowired
    AdminLogService adminLogService;
    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getRoleList(){
        List<Role> all = roleRepository.findAll();
        List<AdminRoleListVo> list = all.stream().map(role -> {
            AdminRoleListVo vo = modelMapper.map(role, AdminRoleListVo.class);
            return vo;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

    @Transactional
    public JsonResponse updateRole(Integer id, AdminRoleUpdateRequest updateDto, Integer userId){
        Role role = roleRepository.findById(id).orElse(null);
        if (role == null){
            return JsonResponse.error("角色不存在");
        }
        modelMapper.map(updateDto, role);
        if (updateDto.getPermissionItemIds() != null){
            rolePermissionItemRepository.deleteAllByRoleId(role.getId());
            updateDto.getPermissionItemIds().forEach(permissionItemId -> {
                RolePermissionItem rolePermissionItem = new RolePermissionItem();
                rolePermissionItem.setRoleId(role.getId());
                rolePermissionItem.setPermissionItemId(permissionItemId);
                rolePermissionItem.setUpdatedAt(LocalDateTime.now());
                rolePermissionItem.setCreatedAt(LocalDateTime.now());
                rolePermissionItemRepository.saveAndFlush(rolePermissionItem);
            });
        }
        roleRepository.saveAndFlush(role);
        adminLogService.createAdminLog(userId,"角色管理","更新角色" + role.getName() + "，ID：" + role.getId());
        return JsonResponse.ok("更新成功");
    }

    @Transactional
    public JsonResponse createRole(AdminRoleCreateRequest updateDto, Integer userId){
        Role role = new Role();
        modelMapper.map(updateDto, role);
        role.setCreatedAt(LocalDateTime.now());
        role.setUpdatedAt(LocalDateTime.now());
        roleRepository.saveAndFlush(role);
        adminLogService.createAdminLog(userId,"角色管理","创建角色" + role.getName() + "，ID：" + role.getId());
        return JsonResponse.ok("创建成功");
    }

    @Transactional
    public JsonResponse deleteRole(Integer id, Integer userId){
        if (adminUserRoleRepository.countByRoleId(id) > 0){
            return JsonResponse.error("该角色下存在用户，无法删除");
        }

        roleRepository.deleteById(id);
        adminLogService.createAdminLog(userId,"角色管理","删除角色，ID：" + id);
        return JsonResponse.ok("删除成功");
    }


    public JsonResponse getTeamTree(){


        return JsonResponse.ok();
    }

}
