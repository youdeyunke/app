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

import io.swagger.annotations.ApiModel;
import lombok.Data;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;



@Data
@ApiModel(value = "分页信息")
public class PageableInfoVo implements Serializable {
    private Integer current = 1;
    private Integer totalPages = 1;
    private Long totalItems = 0L;
    private Integer size = 10;

    public void setCurrent(Integer value){
        this.current = value + 1;
    }

    public PageableInfoVo(Pageable pageable, Integer totalPages, Long totalItems) {
        this.setCurrent(pageable.getPageNumber());
        this.setSize(pageable.getPageSize());
        this.setTotalPages(totalPages);
        this.setTotalItems(totalItems);
    }
}
