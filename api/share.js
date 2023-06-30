let request = require('../utils/request.js');
/**
 * 转发分享接口
 */


// 分享一个楼盘 
export function  createSharePost(title, target){
    return _createShare(title, "share_post", target);
}

// 分享一个二手房
export function  createShareErshou(title, target){
    return _createShare(title, "share_house", target);
}

// 分享一篇文章
export function  createShareNews(title, target){
    return _createShare(title, "share_news", target);
}

// 分享小程序首页
export function  createShareHomepage(title){
    return _createShare(title, "share_home", "homepage");
}

// 分享一个视频
export function  createShareVideo(title, target){
    return _createShare(title, "share_video", target);
}

// 创建一个分享记录，注意，此接口必须要登录后调用，如果没有登录，那么返回的id为0
// 此接口
function _createShare(title, key, target){
    if(key == null){
        console.error("分享的key不能为空");
        return;
    }
    return request.post("/api/v6/shares", {title: title, score_config_key: key, target:target});
}


// 如果用户浏览了别人分享过来的内容，那么需要调用此接口，记录浏览记录
export function markShareVisitor(options){
    // 这里要处理多种情况，防止拼写错误
    var shareId = options.share_id || options.shareid || options.shareId;

    if(!shareId){
        // shareid不存在，不需要记录
        return;
    }
    console.log("当前点击了来自分享的链接 share id :", shareId)
    return request.post("/api/v6/share/" + shareId + "/visitors", {});
}