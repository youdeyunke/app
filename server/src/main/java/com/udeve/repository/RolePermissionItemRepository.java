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

import com.udeve.entity.RolePermissionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface RolePermissionItemRepository extends JpaRepository<RolePermissionItem, Integer> {

    void deleteAllByRoleId(Integer roleId);

    @Transactional
    void deleteAllByPermissionItemId(Integer id);


    List<RolePermissionItem> findAllByRoleId(Integer roleId);


    Optional<RolePermissionItem> findFirstByRoleIdAndPermissionItemId(Integer roleId, Integer PermissionItemId);
}
