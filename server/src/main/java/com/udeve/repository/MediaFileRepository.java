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

import com.udeve.entity.MediaFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaFileRepository extends JpaRepository<MediaFile, Integer>, JpaSpecificationExecutor<MediaFile> {

    Page<MediaFile> findByParentIdIsNullAndIsDeleteFalseOrderByFiletypeAscIdDesc(Pageable pageable);

    Page<MediaFile> findByParentIdAndIsDeleteFalseOrderByFiletypeAscIdDesc(Integer parentId ,Pageable pageable);

    List<MediaFile> findListByParentIdAndIsDeleteFalseOrderByFiletypeAscIdDesc(Integer id);
}
