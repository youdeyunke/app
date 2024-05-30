package com.udeve.utils.lbs;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/**
 *     腾讯地图webapi封装
 */

@Component
@Slf4j
public class LbsUtil {
    private String key =  "";
    private RestTemplate restTemplate ;

    public LbsUtil(){
    }

    public LbsUtil(String key){
        this.key = key;
        this.restTemplate = new RestTemplate();
    }

    public LbsPoiResponse poi(LbsPoiRequest params){
        String query = QueryParamsUtil.toQs(params);
        String url = "https://apis.map.qq.com/ws/place/v1/suggestion/?key="+ this.key + "&" +query;
        LbsPoiResponse res = restTemplate.getForObject(url,LbsPoiResponse.class);
        log.info("res is {}", res);
        return res;
    }

}
