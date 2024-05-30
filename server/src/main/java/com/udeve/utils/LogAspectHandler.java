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
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.util.ObjectUtil;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;

@Aspect
@Component
@Slf4j
public class LogAspectHandler {

    /**
     * 1、execution(): 表达式主体，可以扫描控制层的接口、某个注解、或者其他需要扫描的类。
     *
     *  2、第一个*号：表示返回类型，*号表示所有的类型，比如public,protect,private等。
     *
     *  3、包名：表示需要拦截的包名，后面的两个句点表示当前包和当前包的所有子包，com.demo.service.impl包、子孙包下所有类的方法。
     *
     * 4、第二个*号：表示子包名，*号表示所有子包。
     *
     * 5、第三个*号：表示类名，*号表示所有子包下的类。
     *
     * 6、*(..):最后这个星号表示方法名，*号表示所有的方法，后面括弧里面表示方法的参数，两个句点表示任何参数。
     */

    // 所有请求
    @Pointcut("execution(* com.udeve.controllers.*.*.*(..))")
    public void allRequest(){}

    // 所有的Get请求
    @Pointcut("!@annotation(org.springframework.web.bind.annotation.GetMapping)")
    public void allGetRequest(){}

    // 不经过AOP拦截的接口，可以在接口上添加@ignoringIdentity注解
    @Pointcut("!@annotation(com.udeve.utils.annotation.IgnoringIdentity)")
    public void ignoringIdentity(){}

    //拦截demo角色，提示无法进行操作
    @Around("allRequest() && allGetRequest() && ignoringIdentity()")
    public Object doBeforeDemoPointCut(ProceedingJoinPoint joinPoint) throws Throwable {
        //未登录跳过
        if (!StpUtil.isLogin()){
            log.info("未登录不拦截");
            return joinPoint.proceed();
        }
        // 获取签名
        Signature signature = joinPoint.getSignature();
        // 获取切入的包名
        String declaringTypeName = signature.getDeclaringTypeName();
        // 获取即将执行的方法名
        String funcName = signature.getName();
        log.info("即将执行方法为: {}，属于{}包", funcName, declaringTypeName);

        Object userType = StpUtil.getExtra("user_type");
        if (!ObjectUtil.equal(userType, null)) {
            String userTypeStr = userType.toString();
            String[] array = userTypeStr.split(",");
            List<String> roleList = Arrays.asList(array);
            if (roleList.contains("demo")) {
                return JsonResponse.error("演示模式，无法进行操作 参考 https://www.youdeyunke.com/ 教程 5分钟搭建本地环境！");
            }
        }
        return joinPoint.proceed();
    }


    //以下是拦截所有请求的AOP，用于打印：请求方法（全限定名）、请求参数、请求耗时（纳秒、毫秒）

    @Pointcut("execution(* com.udeve.controllers.*.*.*(..))")
    private void pointCutMethodController() {}
    @Around("pointCutMethodController()")
    public Object doAroundService(ProceedingJoinPoint pjp) throws Throwable {

        long begin = System.nanoTime();

        Object obj = pjp.proceed();

        long end = System.nanoTime();

        log.info("Controller method：【{}】 \n prams：【{}】 \n cost time：【{}】 ns \n cost：【{}】 ms",

                pjp.getSignature().toString(), Arrays.toString(pjp.getArgs()), (end - begin), (end - begin) / 1000000);

        return obj;
    }
}
