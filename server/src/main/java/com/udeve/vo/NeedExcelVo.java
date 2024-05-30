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

@Data
public class NeedExcelVo {
    @ExcelProperty("编号")
    public Integer id;
    @ExcelProperty("客户姓名")
    public String name;
    @ExcelProperty("手机号")
    public String mobile;
    @ExcelProperty("意向区域")
    public String position;
    @ExcelProperty("购房目的")
    public String points;
    @ExcelProperty("意向面积")
    public String area;
    @ExcelProperty("意向户型")
    public String housetype;
    @ExcelProperty("城市")
    public String cityName;
    @ExcelProperty("预算(万)")
    public String minMax;
}
