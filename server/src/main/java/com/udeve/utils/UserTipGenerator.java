package com.udeve.utils;
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
import com.fasterxml.jackson.databind.exc.InvalidFormatException;

import java.math.BigDecimal;
import java.math.BigInteger;

public class UserTipGenerator {

    public static String getUserMessage(InvalidFormatException rootCause) {
        // 目标类型
        Class<?> targetType = rootCause.getTargetType();
        // 目标类型提示信息
        String targetTypeNotification = "";
        if (targetType == BigInteger.class || targetType == Integer.class || targetType == Long.class
                || targetType == Short.class || targetType == Byte.class) {
            targetTypeNotification = "参数类型应为：整数；";
        } else if (targetType == BigDecimal.class || targetType == Double.class || targetType == Float.class) {
            targetTypeNotification = "参数类型应为：数值；";
        }
        Object value = rootCause.getValue();

        return String.format("参数格式错误！%s当前输入参数：[%s]", targetTypeNotification, value);
    }

}

