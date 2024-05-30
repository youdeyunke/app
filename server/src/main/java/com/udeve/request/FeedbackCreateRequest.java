package com.udeve.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
public class FeedbackCreateRequest implements Serializable {

    public String uid;

    @NotBlank(message = "反馈类型不能为空")
    public String feedbackType;

    @NotBlank(message = "问题描述不能为空")
    public String content;

    public String images;

    public String contact;

}
