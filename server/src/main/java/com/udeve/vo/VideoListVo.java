package com.udeve.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class VideoListVo implements Serializable {

    public Integer id;

    public String title;

    public String url;

    public Boolean isWxvideo;

    public String wxauthorId;

    public String authorName;

    public String wxvideoId;

    public String authorAvatar;

    public Boolean isPublic;

    public Integer viewNums;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime updatedAt;

    public String cover;
}
