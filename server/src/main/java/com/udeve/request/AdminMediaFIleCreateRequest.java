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

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class AdminMediaFIleCreateRequest implements Serializable {
    @NotBlank(message = "文件名不能为空")
    @Schema(description = "文件名", example = "文件名")
    public String filename;
    @NotBlank(message = "文件类型不能为空")
    @Schema(description = "文件类型", example = "image")
    public String filetype;

    @Schema(description = "文件父级id", example = "1")
    public Integer parentId;
    @NotNull(message = "文件大小不能为空")
    @Schema(description = "文件大小", example = "1256")
    public Integer size;
//    @NotBlank(message = "文件地址不能为空")
    @Schema(description = "文件地址", example = "http://www.baidu.com")
    public String url;
}
