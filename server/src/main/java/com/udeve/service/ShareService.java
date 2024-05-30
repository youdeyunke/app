package com.udeve.service;
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

import com.udeve.entity.Share;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.udeve.repository.ShareRepository;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
public class ShareService {
    @Autowired
    ShareRepository shareRepository;


    @Autowired
    SysMessageService sysMessageService;

    public JsonResponse createShares(String uid, String shareCompletePath, String scoreConfigKey, String title){
        //查重
        Optional<Share> shareOptional = shareRepository.findByUidAndTarget(uid, shareCompletePath);
        if (shareOptional.isPresent()) {
            log.info("现有记录，不添加重复项：{}---{}",uid,shareCompletePath);
            return JsonResponse.ok(shareOptional.get().getId());
        }
        //构建，入库
        Share share = new Share();
        share.setUid(uid);
        share.setTarget(shareCompletePath);
        share.setScoreConfigKey(scoreConfigKey);
        share.setCreatedAt(LocalDateTime.now());
        share.setUpdatedAt(LocalDateTime.now());
        share.setTitle(title);
        Share saved = shareRepository.saveAndFlush(share);
        return JsonResponse.ok(saved.getId());
    }
}

