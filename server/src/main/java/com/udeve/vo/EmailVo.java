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
import lombok.Data;

import java.io.Serializable;

@Data
public class EmailVo implements Serializable {

    public String emailHost;//平台地址

    public Integer emailPort;//端口号

    public String emailProtocol;//发送邮件的协议

    public String emailUsername;//发送邮件的账号

    public String emailPassword;//发送邮件的授权码

    public String getEmailPassword() {
        if (emailPassword == null || emailPassword.isEmpty()){
            return null;
        }
        //将授权码中间几位替换为*
        StringBuilder sb = new StringBuilder(emailPassword);
        sb.replace(3,sb.length()-3,"******");
        return sb.toString();
    }
}
