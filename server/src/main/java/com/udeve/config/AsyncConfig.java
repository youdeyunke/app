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
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.ThreadPoolExecutor;

@Configuration
@EnableAsync // 开启异步配置
public class AsyncConfig {

    @Bean(name = "customTaskExecutor")
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        //设置核心线程数
        executor.setCorePoolSize(5);
        //设置最大线程数
        executor.setMaxPoolSize(20);
        //缓冲队列200：用来缓冲执行任务的队列
        executor.setQueueCapacity(200);
        //线程活路时间 60 秒
        executor.setKeepAliveSeconds(60);
        //线程池名的前缀：设置好了之后可以方便我们定位处理任务所在的线程池
        executor.setThreadNamePrefix("udyk-task-");
        //设置拒绝策略
        /*
        * ThreadPoolExecutor.AbortPolicy:丢弃任务并抛出RejectedExecutionException异常
          ThreadPoolExecutor.DiscardPolicy：丢弃任务，但是不抛出异常
          ThreadPoolExecutor.DiscardOldestPolicy：丢弃队列最前面的任务，然后重新提交被拒绝的任务
          ThreadPoolExecutor.CallerRunsPolicy：由调用线程（提交任务的线程）处理该任务
        * */
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.setWaitForTasksToCompleteOnShutdown(true);
        return executor;
    }
}