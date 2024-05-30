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

import com.udeve.entity.PermissionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface PermissionItemRepository extends JpaRepository<PermissionItem, Integer> {

    List<PermissionItem> findByCatOrderByOrderAsc(String cat);

    List<PermissionItem> findByCatAndEnableTrueAndIdInOrderByOrderAsc(String cat, List<Integer> permissionIds);

    List<PermissionItem> findByFatherIdOrderByOrderAsc(Integer id);

    List<PermissionItem> findByFatherIdAndEnableTrueAndIdInOrderByOrderAsc(Integer id, List<Integer> permissionIds);

    List<PermissionItem> findAllByIdInAndCatAndEnableTrue(List<Integer> permissionIds, String cat);

    PermissionItem findByComponentPath(String s);

    @Query(value = "select * from permission_items where father_id = ?1",nativeQuery = true)
    List<PermissionItem> findByFatherId(Integer id);

    Optional<PermissionItem> findByTitleAndCat(String title,String cat);

    Optional<PermissionItem> findByTitleAndCatAndComponentPath(String title,String cat, String componentPath);

    Optional<PermissionItem> findByTitleAndCatAndKey(String title,String cat,String key);

}
