package com.udeve.entity;
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

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = Question.TABLE_NAME)
public class Question {
    public static final String TABLE_NAME = "questions";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @ManyToOne
    @JoinColumn(name = "userId")
    public User user;

    public String content;
    public String answer;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(nullable = false)
    public LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(nullable = false)
    public LocalDateTime updatedAt;
    @Column(name = "`public`")
    public Boolean isPublic;
    public Integer likeNumsBase;
    public Integer likeNums;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime sendMessageAt;
    public String targetType;
    public Integer targetId;

    @Column(insertable = false,updatable = false)
    public Integer userId;

    // 以下两个属性用于jpa查询
    @OneToMany
    @JoinColumn(name = "questionId", referencedColumnName = "id")
    @JsonIgnore
    public List<QuestionFollower> questionFollowers;

    @OneToMany
    @JoinColumn(name = "questionId", referencedColumnName = "id")
    @JsonIgnore
    public List<Answer> answers;

}
