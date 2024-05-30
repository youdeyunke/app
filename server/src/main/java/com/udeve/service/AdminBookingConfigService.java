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
import cn.hutool.core.util.ObjectUtil;
import com.udeve.entity.BookingConfig;
import com.udeve.repository.AdminBookingConfigRepository;
import com.udeve.request.BookingConfigUpdateRequest;
import com.udeve.request.CommonRequest;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.BookingConfigVo;
import com.udeve.vo.WeappBookingConfigVo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AdminBookingConfigService {

    @Autowired
    private AdminBookingConfigRepository bookingConfigRepository;

    @Autowired
    ModelMapper modelMapper;

    //jpa 动态查询
    public Page<BookingConfig> getListing(CommonRequest queryRequest){
        Specification<BookingConfig> specification = (Specification<BookingConfig>) (root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            //增加一个id大于0的默认条件
            predicates.add(criteriaBuilder.greaterThan(root.get("id"), 0));

            if(!ObjectUtil.equals(queryRequest.getKw(), null) && !("").equals(queryRequest.getKw())){
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(root.get("status"), "%" + queryRequest.getKw() + "%"),
                        criteriaBuilder.like(root.get("remark"), "%" + queryRequest.getKw() + "%")
                ));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
        Pageable pageable = PageRequest.of(queryRequest.getPage() - 1, queryRequest.getPerPage());
        return bookingConfigRepository.findAll(specification, pageable);
    }

    public JsonResponse getBookingConfigByPostId(Integer postId){
        List<BookingConfig> byPostId = bookingConfigRepository.findByPostId(postId);
        List<BookingConfigVo> collect = byPostId.stream().map(bookingConfig -> {
            return modelMapper.map(bookingConfig, BookingConfigVo.class);
        }).collect(Collectors.toList());
        return JsonResponse.ok(collect);
    }

    //小程序
    public JsonResponse getWeappBookingConfigByPostIdAndStatusTrue(Integer postId){
        List<BookingConfig> byPostId = bookingConfigRepository.findByPostIdAndStatusTrue(postId);
        List<WeappBookingConfigVo> collect = byPostId.stream().map(bookingConfig -> {
            return modelMapper.map(bookingConfig, WeappBookingConfigVo.class);
        }).collect(Collectors.toList());
        return JsonResponse.ok(collect);
    }

    @Transactional
    public JsonResponse updateBookingConfig(Integer postId, List<BookingConfigUpdateRequest> updateRequest){
        //删除旧的数据
        bookingConfigRepository.deleteByPostId(postId);


        //根据传来的新的List数组来插入新的楼盘预约时间设置的数据
        LocalDateTime now = LocalDateTime.now();
        ArrayList<BookingConfig> bookingConfigs = new ArrayList<>();
        updateRequest.forEach(bookingConfigUpdateRequest -> {
            BookingConfig bookingConfig = modelMapper.map(bookingConfigUpdateRequest, BookingConfig.class);
            bookingConfig.setPostId(postId);
            bookingConfig.setCreatedAt(now);
            bookingConfig.setUpdatedAt(now);
            bookingConfigs.add(bookingConfig);

        });

        //一次保存
        bookingConfigRepository.saveAllAndFlush(bookingConfigs);

        return JsonResponse.ok("设置成功");
    }
}
