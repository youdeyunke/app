package com.udeve.vo;
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
import com.udeve.entity.Answer;
import com.udeve.entity.User;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class PostQasListingVo implements Serializable {
    public Integer id;

    public User user;

    public String content;

    public String answer;

    public LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime updatedAt;

    public Boolean isPublic;

    public Integer likeNumsBase;

    public Integer likeNums;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime sendMessageAt;

    public String targetType;

    public Integer targetId;

    public Integer userId;

    public List<Answer> answers;
}
