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


import com.udeve.entity.PermissionItem;
import com.udeve.entity.RolePermissionItem;
import com.udeve.repository.PermissionItemRepository;
import com.udeve.repository.RolePermissionItemRepository;
import com.udeve.repository.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class SeedService {
    @Autowired
    PermissionItemRepository permissionItemRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    RolePermissionItemRepository rolePermissionItemRepository;

    @PostConstruct
    private void init(){
        log.info("=================add all permission to super-admin start=========================");
        addAllPermissionsForSuperAdmin();
        log.info("=================add all permission to super-admin end=========================");

    }

    /**
     * 给超级管理员添加所有权限
     */
    private void addAllPermissionsForSuperAdmin(){
        //查找超级管理员,取id
        roleRepository.findFirstByNameContaining("超级管理员").ifPresent(role -> {
            Integer roleId = role.getId();
            //查所有菜单
            List<PermissionItem> permissionItems = permissionItemRepository.findAll();
            //循环菜单
            permissionItems.forEach(permissionItem -> {

                Integer permissionItemId = permissionItem.getId();
                //根据roleId和菜单id查询是否存在
                boolean present = rolePermissionItemRepository.findFirstByRoleIdAndPermissionItemId(roleId, permissionItemId).isPresent();
                //不存在则插入（添加菜单权限）
                if (!present) {
                    RolePermissionItem rolePermissionItem = new RolePermissionItem();
                    rolePermissionItem.setRoleId(roleId);
                    rolePermissionItem.setPermissionItemId(permissionItemId);
                    rolePermissionItem.setCreatedAt(LocalDateTime.now());
                    rolePermissionItem.setUpdatedAt(LocalDateTime.now());
                    rolePermissionItemRepository.saveAndFlush(rolePermissionItem);
                }
            });
        });
    }

}
