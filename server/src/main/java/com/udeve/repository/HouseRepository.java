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

import com.udeve.entity.House;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HouseRepository extends JpaRepository<House, Integer> {


    @Query(value = "select * from houses where is_delete = 0 and is_public = 1 and id in ?1",nativeQuery = true)
    List<House> findByIds(List<Integer> ids,Pageable pageable);

    List<House> findAllByIsDeleteFalseAndIsPublicTrue();

    Page<House> findAll(Specification<House> specification, Pageable pageable);

    Integer countByCity_IdAndIsPublicTrueAndIsDeleteFalse(Integer cityId);
    House findFirstByCity_IdAndIsPublicTrueAndIsDeleteFalse(Integer cityId);

    Integer countByDistrict_IdAndIsPublicTrueAndIsDeleteFalse(Integer districtId);
    House findFirstByDistrict_IdAndIsPublicTrueAndIsDeleteFalse(Integer districtId);
}
