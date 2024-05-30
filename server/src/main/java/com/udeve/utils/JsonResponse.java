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
import lombok.AllArgsConstructor;
import lombok.Data;
import java.io.Serializable;

/**
 * 统一返回结果的封装类
 */


@AllArgsConstructor
@Data
public class JsonResponse<T> implements Serializable {
    private Integer code = 0;
    private String message = "";
    private T data = null;
    private Integer status = 0;

    public JsonResponse() {
    }

    public Integer getStatus() {
        return code;
    }

    // 成功返回数据，但是弹出信息提示
    public static JsonResponse warning(Object data, String message) {
        return ok(data, message);
    }

    public static JsonResponse ok() {
        return ok(null);
    }

    public static JsonResponse ok(Object data) {
        return ok(data, "操作成功");
    }

    public static JsonResponse ok(Object data, String message) {
        return ok(0,data,message);
    }

    public static JsonResponse ok(Integer code, Object data, String message) {
        JsonResponse json = new JsonResponse();
        json.code = code;
        json.data = data;
        json.message = message;
        return json;
    }

    public static JsonResponse error() {
        return JsonResponse.error(1, "操作失败！");
    }

    public static JsonResponse error(String error) {
        return JsonResponse.error(1, error);
    }

    public static JsonResponse error(Integer errorCode, String error) {
        JsonResponse json = new JsonResponse();
        json.code = errorCode;
        json.data = null;
        json.message = error;
        return json;
    }
    public static JsonResponse notFound(){
        return JsonResponse.error(404, "资源不存在");
    }


    public static JsonResponse success(Object data) {
        return JsonResponse.ok(data);
    }

    public static JsonResponse loginRequired() {
        JsonResponse json = new JsonResponse();
        json.code = 2000;
        json.message = "请先登录";
        json.data = null;
        return json;
    }

    public static JsonResponse unauthorized() {
        return JsonResponse.error(2000, "请先登录");
    }

    public static JsonResponse unauthorized(String message) {
        return JsonResponse.error(2000, message);
    }

    public JsonResponse ban() {
        return JsonResponse.error(444, "禁止访问");
    }

}
