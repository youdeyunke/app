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
import com.udeve.entity.MediaItem;
import lombok.Data;

import javax.persistence.Column;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class WeappPostXiangceVo implements Serializable {

    public Integer id;
    public String name;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime createdAt;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime updatedAt;

    public Integer number;
    public Integer coverId;
    public Integer itemsCount;
    public String targetType;
    public Integer targetId;
    public Boolean isSystem;

    public List<MediaItem> mediaItems;

}
