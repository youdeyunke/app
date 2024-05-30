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
import com.alibaba.excel.annotation.ExcelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AdminLogExcelVo {
    @ExcelProperty("管理员Id")
    public Integer adminUserId;

    @ExcelProperty("管理员账号")
    public String admin;

    @ExcelProperty("操作类型")
    public String operationType;

    @ExcelProperty("操作内容")
    public String operation;

    @ExcelProperty("创建时间")
    public LocalDateTime createdAt;

    @ExcelProperty("修改时间")
    public LocalDateTime updatedAt;

    @ExcelProperty("IP地址")
    public String ip;

    @ExcelProperty("IP归属地")
    public String ipRegion;
}
