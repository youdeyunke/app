package com.udeve.vo;

import com.alibaba.excel.annotation.ExcelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserProfileExcelVo {

    @ExcelProperty("#")
    public Integer id;

    @ExcelProperty("账号(手机号)")
    public String mobile;

    @ExcelProperty("注册时间")
    public LocalDateTime createdAt;

    @ExcelProperty("IP")
    public String ip;

    @ExcelProperty("IP归属地")
    public String ipRegion;

}
