package com.udeve.repository;
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

import com.udeve.entity.AdminUserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface AdminUserRoleRepository extends JpaRepository<AdminUserRole, Integer> {
    @Transactional
    void deleteAllByAdminUserId(Integer adminUserId);

    @Query("SELECT rpi.permissionItemId FROM AdminUserRole aur JOIN RolePermissionItem rpi ON aur.roleId = rpi.roleId WHERE aur.adminUserId = :adminUserId")
    List<Integer> findPermissionItemIdsByAdminUserId(@Param("adminUserId") Integer adminUserId);

    Integer countByRoleId(Integer roleId);

    List<AdminUserRole> findAllByAdminUserId(Integer adminUserId);

}