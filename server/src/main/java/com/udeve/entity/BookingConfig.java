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
import com.udeve.utils.text.StringUtils;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity(name = BookingConfig.TABLE_NAME)
public class BookingConfig {

    public static final String TABLE_NAME = "booking_configs";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(name = "post_id")
    public Integer postId;

    @Column(name = "`week`")
    public Integer week;

    @Column(name = "hours")
    public String hours;

    @Column(name = "status")
    public Boolean status = true;

    @Column(name = "remark")
    public String remark;

    @Column(nullable = false,name = "created_at")
    public LocalDateTime createdAt;

    @Column(nullable = false,name = "updated_at")
    public LocalDateTime updatedAt;

    public void setHours(List<String> hours) {
        this.hours = String.join(",", hours);
    }
}
