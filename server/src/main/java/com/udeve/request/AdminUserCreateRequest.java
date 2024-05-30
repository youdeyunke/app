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
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Data
public class AdminUserCreateRequest implements Serializable {
    @Schema(description = "头像", example = "https://cdn.udeve.cc/xxx.png")
    public String avatar;
    @Email
    @NotBlank(message = "邮箱不能为空")
    @Schema(description = "邮箱", example = "111111@ud.com")
    public String email;
    @JsonFormat(pattern = "yyyy-M-d")
    @Schema(description = "账号到期时间", example = "2020-01-01")
    public LocalDate expiredAt;
    @NotNull(message = "是否永久有效不能为空")
    @Schema(description = "账号是否永久有效", example = "true")
    public Boolean isForever;
    @Schema(description = "账号手机号", example = "13000000000")
    public String mobile;
    @NotBlank(message = "姓名不能为空")
    @Schema(description = "账号名称", example = "账号名称")
    public String name;
    @NotNull(message = "账号角色不能为空")
    @Size(min = 1, message = "账号角色不能为空")
    @Schema(description = "账号角色id", example = "[1,2]")
    public List<Integer> roleIds;
}
