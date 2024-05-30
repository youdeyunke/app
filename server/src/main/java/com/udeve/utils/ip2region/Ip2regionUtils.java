package com.udeve.utils.ip2region;
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
import lombok.extern.slf4j.Slf4j;
import org.lionsoul.ip2region.xdb.Searcher;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Component
@Slf4j
public class Ip2regionUtils {
    private static Searcher searcher;

    /**
     * 根据 IP 地址从 ip2region.db 中获取地理位置
     * @param ip IP 地址
     * @return IP归属地
     */
    public static String getCityInfo(String ip) throws IOException {
        try {
            return searcher.search(ip);
        } catch (Exception e) {
            log.error("searcher fail!:{}",e.getMessage());
        }finally {
            searcher.close();
        }
        return null;
    }

    /**
     * 在服务启动时加载 ip2region.db 到内存中
     * 解决打包 jar 后找不到 ip2region.db 的问题
     * @throws Exception 出现异常应该直接抛出终止程序启动，避免后续 invoke 时出现更多错误
     */
    @PostConstruct
    private static void initIp2regionResource() {
        try {
            InputStream inputStream = new ClassPathResource("/ipdb/ip2region.xdb").getInputStream();
            byte[] dbBinStr = FileCopyUtils.copyToByteArray(inputStream);
            // 创建一个完全基于内存的查询对象
            searcher = Searcher.newWithBuffer(dbBinStr);
            log.info("ip2region.xdb load success!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 根据ip获取归属地
     *  //searchIpInfo 的数据格式： 国家|区域|省份|城市|ISP
     *  //192.168.31.160 0|0|0|内网IP|内网IP
     *  //47.52.236.180 中国|0|香港|0|阿里云
     *  //220.248.12.158 中国|0|上海|上海市|联通
     *  //164.114.53.60 美国|0|华盛顿|0|0  50.7.252.58
     * @param ip
     * @return 归属地
     */
    public static String getRegion(String ip){
        //使用 @PostConstruct 注解后不需要再调用
//        initIp2regionResource();
        try {
            String cityInfo = getCityInfo(ip);

            if(cityInfo==null) {
                log.error("cityInfo is null");
                return null;
            }
            String[] split = cityInfo.split("\\|");

            //--------------国内属地返回省份--------------
            if ("中国".equals(split[0])){
                if("0".equals(split[3])){
                    return split[0] + "-" + split[2];
                }
                return split[0] + "-" + split[2] + "-" + split[3];
            }
            //------------------内网 IP----------------
            if ("0".equals(split[0])){
                if ("内网IP".equals(split[3])){
                    return "内网IP";
                }
                else return null;
            }
            //--------------国外属地返回国家--------------
            else {
                return split[0] + "-" + split[2];
            }
        } catch (IOException e) {
            log.error("获取ip归属地异常:{}",e.getMessage());
            return null;
        }
    }

}
