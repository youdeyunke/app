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

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class AdminBrokerProfileUpdateRequest implements Serializable {

    @NotBlank(message = "头像不能为空")
    @Schema(description = "头像", example = "http://www.baidu.com")
    public String avatar;

    @Length(max = 20, message = "姓名长度不能超过20个字符")
    @NotBlank
    @Schema(description = "姓名", example = "张三")
    public String name;

    @Schema(description = "性别", example = "1")
    public Integer sex;

    @Schema(description = "置业顾问微信号", example = "1300000000")
    public String wechat;

    @Schema(description = "置业顾问微信二维码", example = "http://www.baidu.com")
    public String wechatQr;

    @Schema(description = "置业顾问名片", example = "http://www.baidu.com")
    public String namecard;

    @Schema(description = "详情", example = "详情")
    public String desc;
    @NotNull(message = "主营楼盘不能为空")
    @Schema(description = "主营楼盘ID", example = "1")
    public Integer postId;

    @Schema(description = "置业顾问等级", example = "1")
    public Integer level;
    @Schema(description = "置业顾问审核状态", example = "1")
    public Integer status;
    @Schema(description = "置业顾问点赞数", example = "11")
    public Integer likeNums;
    @Schema(description = "置业顾问浏览数", example = "11")
    public Integer viewNums;

    @Schema(description = "置业顾问被拒原因", example = "置业顾问被拒原因")
    public String rejectReason;
    @Schema(description = "置业顾问标签", example = "置业顾问标签")
    public String tags;
}
