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
import com.udeve.utils.converter.BookIngLogStatusConverter;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingLogsExcelVo {
    @ExcelProperty("#")
    public Integer id;

    @ExcelProperty("楼盘标题")
    public String postTitle;

    @ExcelProperty("客户姓名")
    public String name;

    @ExcelProperty("手机号")
    public String mobile;

    @ExcelProperty("预约日期")
    public LocalDate date;

    @ExcelProperty("预约时间")
    public String time;

    @ExcelProperty(value = "预约状态", converter = BookIngLogStatusConverter.class)
    public Integer status;

    @ExcelProperty("备注")
    public String remark;

}
