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
import com.udeve.entity.DynamicSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface DynamicSubscriptionRepository extends JpaRepository<DynamicSubscription,Integer> {

    Optional<DynamicSubscription> findFirstByUserIdAndTargetIdAndTargetType(Integer userId,Integer targetId,String targetType);

    List<DynamicSubscription> findByUserIdAndTargetType(Integer userId,String targetType);

    List<DynamicSubscription> findByTargetIdAndTargetType(Integer targetId,String targetType);

    @Transactional
    @Modifying
    @Query(value = "delete from dynamic_subscription where user_id = ?1 and target_type = ?2 and target_id = ?3",nativeQuery = true)
    void deleteByUserIdAndTargetIdAndTargetType(Integer userId, String targetType, Integer targetId);
}
