package com.udeve.config;
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
import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.exception.NotPermissionException;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.udeve.utils.JsonResponse;
import com.udeve.utils.UserTipGenerator;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.MappingException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class ExceptionController {

    @ExceptionHandler(NotLoginException.class)
    public JsonResponse handlerException(NotLoginException e) {
        return JsonResponse.unauthorized("请先登录!");
    }


    @ExceptionHandler(NotPermissionException.class)
    public JsonResponse handlerException(NotPermissionException e){
        return JsonResponse.error("无此权限！");
    }

  // 捕捉其他所有异常
    @ExceptionHandler(Exception.class)
    //@ResponseStatus(HttpStatus.BAD_REQUEST)//此注解指定返回的错误的状态码，如果去掉，就是默认的200
    public JsonResponse globalException(Throwable ex) {
        log.error("发生异常：{}", ex.getMessage());
        return JsonResponse.error("系统出现错误，请稍后重试！");
    }

    @ExceptionHandler(RuntimeException.class)
    public JsonResponse runtimeException(RuntimeException ex) {
        if (ex instanceof NumberFormatException numberFormatException){
            numberFormatException.printStackTrace();
            log.error("类型转换异常：{}",numberFormatException.getMessage());
            return JsonResponse.error("类型转换异常！");
        }
        if (ex instanceof DataIntegrityViolationException dataIntegrityViolationException){
            dataIntegrityViolationException.printStackTrace();
            log.error("数据库字段类型不匹配：{}",dataIntegrityViolationException.getMessage());
            return JsonResponse.error("数据完整性违规！");
        }
        if (ex instanceof IllegalStateException illegalStateException){
            illegalStateException.printStackTrace();
            log.error("参数类型不匹配：{}",illegalStateException.getMessage());
            return JsonResponse.error("参数类型不匹配！");
        }

        log.warn("发生 runtime 异常：{}", ex.getMessage());
        return JsonResponse.error(ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public JsonResponse handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        log.error("方法参数类型不匹配：{}", ex.getMessage());
        return JsonResponse.error("方法参数类型不匹配");
    }

    @ExceptionHandler(MappingException.class)
    public JsonResponse handleMappingException(MappingException ex) {
        ex.printStackTrace();
        return JsonResponse.error("modelMapper 映射异常！");
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public JsonResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
        log.error("请求方法不支持：{}", ex.getMessage());
        return JsonResponse.error("请求方法不支持");
    }

    /**
     * Http消息不可读异常。
     * <p>
     * 报错原因包括（不完全的列举）：
     * <p>
     * （1）缺少请求体（RequestBody）异常;
     * <p>
     * （2）无效格式异常。比如：参数为数字，但是前端传递的是字符串且无法解析成数字。
     * <p>
     * （3）Json解析异常（非法Json格式）。传递的数据不是合法的Json格式。比如：key-value对中的value(值)为String类型，却没有用双引号括起来。
     * <p>
     * 举例：
     * （1）缺少请求体（RequestBody）异常。报错：
     * DefaultHandlerExceptionResolver : Resolved [org.springframework.http.converter.HttpMessageNotReadableException:
     * Required request body is missing:
     * public void com.example.web.user.controller.UserController.addUser(com.example.web.model.param.UserAddParam)]
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public JsonResponse handleBindException(HttpMessageNotReadableException e) {

        Throwable rootCause = e.getRootCause();

        // 无效格式异常处理。比如：目标格式为数值，输入为非数字的字符串（"80.5%"、"8.5.1"、"张三"）。
        if (rootCause instanceof InvalidFormatException) {
            String userMessage = UserTipGenerator.getUserMessage((InvalidFormatException) rootCause);
            String format = "HttpMessageNotReadableException-InvalidFormatException（Http消息不可读异常-无效格式异常）：%s";
            String errorMessage = String.format(format, e.getMessage());
            log.error(errorMessage);
            return JsonResponse.error(userMessage);
        }

        String userMessage = "Http消息不可读异常！请稍后重试，或联系业务人员处理。";
        String errorMessage = String.format("HttpMessageNotReadableException（Http消息不可读异常）：%s", e.getMessage());
        log.error(errorMessage);
        if (errorMessage.contains("out of range")){
            return JsonResponse.error("参数值超出范围！");
        }
        return JsonResponse.error(userMessage);
    }

    /**
     * 处理所有校验失败的异常（MethodArgumentNotValidException异常）
     * @param ex
     * @return
     */
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)//此注解指定返回的错误的状态码，如果去掉，就是默认的200
    public JsonResponse handleBindGetException(MethodArgumentNotValidException ex) {
        // 获取所有异常
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(x -> x.getDefaultMessage())
                .collect(Collectors.toList());
        return JsonResponse.error(String.join(",", errors));
    }

}
