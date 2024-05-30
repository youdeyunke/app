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

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = MediaFile.TABLE_NAME)
@Data
public class MediaFile {
    public static final String TABLE_NAME = "media_files";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(nullable = false)
    public LocalDateTime createdAt;

    @Column(nullable = false)
    public LocalDateTime updatedAt;

    public Boolean isDelete;

    public String user;

    public Integer parentId;

    public String url;
    public String filetype;
    public Integer size;
    public String filename;

    public String platform;

    @ManyToOne
    @JoinColumn(name = "parentId",insertable = false, updatable = false, nullable = true)
    public MediaFile parent;


    public boolean isParentLevelValid() {
        return getParentLevel(this, 0) < 3;
    }

    private int getParentLevel(MediaFile mediaFile, int level) {
        if (mediaFile.parent == null) {
            return level;
        } else {
            return getParentLevel(mediaFile.parent, level + 1);
        }
    }
}
