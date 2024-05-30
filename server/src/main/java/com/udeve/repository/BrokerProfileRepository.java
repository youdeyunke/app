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

import com.udeve.entity.BrokerProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrokerProfileRepository extends JpaRepository<BrokerProfile, Integer> {

    BrokerProfile findByMobile(String mobile);

    BrokerProfile findByUserId(Integer id);

    List<BrokerProfile> findFirst5ByPostIdAndStatus( Integer postId,Integer status);

    Page<BrokerProfile> findAll(Specification<BrokerProfile> specification, Pageable pageable);

    Boolean existsByUserIdAndStatus(Integer userId, Integer status);

    @Query(value = "select * from broker_profiles where user_id = ?1 and status = 2",nativeQuery = true)
    Optional<BrokerProfile> findByUserIdAndStatus(Integer userId);

    @Query(value = "SELECT * FROM broker_profiles where status =2 and id in ?1 order by field(id,?1)",nativeQuery = true)
    Page<BrokerProfile> findAllByOrderByIdList(Integer [] ids,Pageable pageable);

    @Query(value = "select count(*) from broker_profiles where status = ?1",nativeQuery = true)
    Integer getBrokerCountByStatus(Integer status);

}
