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
import java.io.Serializable;
import java.util.List;

@Data
public class AdminAlbumCreateRequest implements Serializable {
    @NotBlank(message = "分类名称不能为空")
    @Schema(description = "分类名称", example = "分类名称")
    public String name;
    @Schema(description = "分类封面", example = "封面")
    public String cover;
    @Schema(description = "分类cat", example = "cat")
    public String cat;
    @NotBlank(message = "转发分享文案不能为空")
    @Schema(description = "转发分享文案", example = "文案")
    public String title;
    @Schema(description = "分类描述", example = "描述")
    public String desc;
    @Schema(description = "分类详细信息", example = "详细信息")
    public String content;
    @Schema(description = "分类下楼盘id", example = "[1,2,3]")
    public List<Integer> postIds;

}
