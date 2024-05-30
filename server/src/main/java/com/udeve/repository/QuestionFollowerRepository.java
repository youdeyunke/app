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
import com.udeve.entity.QuestionFollower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionFollowerRepository extends JpaRepository<QuestionFollower, Integer> {

    Boolean existsByUserIdAndQuestionId(Integer userId, Integer questionId);

    Integer countByQuestionId(Integer questionId);

    void deleteByQuestionIdAndUserId(Integer questionId, Integer userId);
}
