package com.udeve.repository;
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
import com.udeve.entity.SysMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SysMessageRepository extends JpaRepository<SysMessage,Integer> {

    List<SysMessage> findByReceiver(String receiver);

    @Query(value = "select count(1) from sys_messages where receiver = ?1 and unread = true",nativeQuery = true)
    Integer getSysMessageCount(String receiver);

    @Query(value = "SELECT * FROM sys_messages WHERE receiver =?1 and updated_at >= DATE_SUB(NOW(), INTERVAL 3 MONTH) order by unread desc,updated_at desc,`id` desc limit ?2,?3",nativeQuery = true)
    List<SysMessage> findLastThreeMonthByReceiver(String receiver,Integer page,Integer size);
}
