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
import com.fasterxml.jackson.annotation.JsonProperty;
import com.udeve.entity.Answer;
import com.udeve.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AdminQuestionListVo implements Serializable {
    @Schema(description = "id", example = "1")
    public Integer id;
    @Schema(description = "用户", example = "用户")
    public User user;
    @Schema(description = "回答数量", example = "5")
    public Integer answersCount;
    @Schema(description = "问题内容", example = "问题内容")
    public String content;
    @Schema(description = "问题回答", example = "问题回答")
    public String answer;
    @Schema(description = "回答列表", example = "回答列表")
    public List<Answer> answers;


    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "创建时间", example = "2020-01-01 00:00:00")
    public LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "更新时间", example = "2020-01-01 00:00:00")
    public LocalDateTime updatedAt;

    @JsonProperty("public")
    @Schema(description = "是否公开", example = "true")
    public Boolean isPublic;

    @Schema(description = "点赞数量", example = "1")
    public Integer likeNumsBase;
    @Schema(description = "点赞数量", example = "1")
    public Integer likeNums;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "发送时间", example = "2020-01-01 00:00:00")
    public LocalDateTime sendMessageAt;
    @Schema(description = "问题类型", example = "问题类型")
    public String targetType;
    @Schema(description = "问题类型id", example = "问题类型id")
    public Integer targetId;
}
