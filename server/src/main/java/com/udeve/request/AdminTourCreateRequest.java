package com.udeve.request;
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
import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class AdminTourCreateRequest implements Serializable {

    public String cat;

    @NotBlank(message = "封面不能为空")
    public String cover;

    @NotNull(message = "结束时间不能为空")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime endsAt;

    public Boolean isTop;

    public String joinBtn = "立即参加";

    @NotBlank(message = "主办方不能为空")
    public String master;

    @NotBlank(message = "活动绑定楼盘不能为空")
    public String postIds;

    public Boolean isPublic;

    @NotNull(message = "开始时间不能为空")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime startsAt;

    @NotBlank(message = "标题不能为空")
    public String title;

    public String weappId;
    public String weappPath;
}
