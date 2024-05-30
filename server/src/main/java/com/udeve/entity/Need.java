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

import com.alibaba.excel.annotation.ExcelProperty;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name=Need.TABLE_NAME)
@Entity
@Data
public class Need {
    public static final String TABLE_NAME = "needs";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    public String name;
    public String mobile;
    public Integer cityId;
    public String position;
    public String points;
    public Integer budgetMin;
    public Integer budgetMax;
    public String area;
    public String housetype;
    public String cityName;

    @Column(nullable = false)
    public LocalDateTime createdAt;
    @Column(nullable = false)
    public LocalDateTime updatedAt;

}
