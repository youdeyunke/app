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


import com.udeve.repository.RoleRepository;
import com.udeve.request.AdminPermissionCreateRequest;
import com.udeve.vo.AdminPermissionListVo;
import com.udeve.request.AdminPermissionUpdateRequest;
import com.udeve.entity.PermissionItem;
import com.udeve.repository.AdminUserRoleRepository;
import com.udeve.repository.RolePermissionItemRepository;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import com.alibaba.fastjson.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.udeve.repository.PermissionItemRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PermissionItemService {

    @Autowired
    private PermissionItemRepository permissionItemRepository;
    @Autowired
    AdminUserRoleRepository adminUserRoleRepository;
    @Autowired
    RolePermissionItemRepository rolePermissionItemRepository;

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    AdminLogService adminLogService;

    public JsonResponse getPermissionList(){
        List<PermissionItem> all = permissionItemRepository.findAll();
        List<AdminPermissionListVo> list = all.stream().map(permissionItem -> {
            AdminPermissionListVo vo = modelMapper.map(permissionItem, AdminPermissionListVo.class);
            return vo;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

    public JsonResponse updatePermissionItem(Integer id, AdminPermissionUpdateRequest permissionItem){
        PermissionItem map = permissionItemRepository.findById(id).get();
        map.setUpdatedAt(LocalDateTime.now());
        modelMapper.map(permissionItem, map);
        permissionItemRepository.saveAndFlush(map);
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse createPermissionItem(AdminPermissionCreateRequest permissionItem){
        String title = permissionItem.getTitle();
        String cat = permissionItem.getCat();
        if(("dir").equals(cat)){
            if (permissionItemRepository.findByTitleAndCat(title, cat).isPresent()) {
                return JsonResponse.error("目录已存在，请勿重复创建");
            }
        } else if (("menu").equals(cat)) {
            if (permissionItemRepository.findByTitleAndCatAndComponentPath(title,cat,permissionItem.getComponentPath()).isPresent()) {
                return JsonResponse.error("菜单已存在，请勿重复创建");
            }
        } else if (("button").equals(cat)) {
            if (permissionItemRepository.findByTitleAndCatAndKey(title,cat,permissionItem.getKey()).isPresent()) {
                return JsonResponse.error("按钮已存在，请勿重复创建");
            }
        }
        PermissionItem map = modelMapper.map(permissionItem, PermissionItem.class);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        permissionItemRepository.saveAndFlush(map);
        return JsonResponse.ok("新建成功");
    }

    @Transactional
    public JsonResponse deletePermissionItem(Integer id){
        //删除本菜单的权限
        rolePermissionItemRepository.deleteAllByPermissionItemId(id);
        //删除本菜单
        permissionItemRepository.deleteById(id);

        //删除本菜单下的子菜单
        List<PermissionItem> byFatherId = permissionItemRepository.findByFatherId(id);
        if (!byFatherId.isEmpty()) {
            for (PermissionItem permissionItem : byFatherId) {
                rolePermissionItemRepository.deleteAllByPermissionItemId(permissionItem.getId());
                permissionItemRepository.deleteById(permissionItem.getId());
            }
        }

        return JsonResponse.ok("删除成功");
    }

    public JsonResponse getPermissionTree() {

        List<PermissionItem> list = permissionItemRepository.findByCatOrderByOrderAsc("dir");


        List<JSONObject> res = list.stream().map(permissionItem -> {
            JSONObject fanhuiDir = new JSONObject();
            fanhuiDir.put("disabled",false);
            fanhuiDir.put("id", permissionItem.getId());
            fanhuiDir.put("key", permissionItem.getKey());
            fanhuiDir.put("label", permissionItem.getTitle());

            List<JSONObject> cres = getPermissionChild(permissionItem);

            fanhuiDir.put("children", cres);
            return fanhuiDir;
        }).collect(Collectors.toList());

        return JsonResponse.ok(res);
    }
    public List<JSONObject> getPermissionChild(PermissionItem permissionItem){
        List<PermissionItem> childList = permissionItemRepository.findByFatherIdOrderByOrderAsc(permissionItem.getId());
        List<JSONObject> res = childList.stream().map(child -> {
            JSONObject fanhuiChild = new JSONObject();
            fanhuiChild.put("disabled",false);
            fanhuiChild.put("id",child.getId());
            fanhuiChild.put("key",child.getKey());
            fanhuiChild.put("label",child.getTitle());
            List<JSONObject> cres = getPermissionChild(child);
            fanhuiChild.put("children",cres);
            return fanhuiChild;
        }).collect(Collectors.toList());
        return res;
    }

    public JsonResponse getMenus( Integer userid ){

        // 获取该用户所拥有角色的所有权限id
        List<Integer> permissionItemIds = adminUserRoleRepository.findPermissionItemIdsByAdminUserId(userid);

        List<PermissionItem> list = permissionItemRepository.findByCatAndEnableTrueAndIdInOrderByOrderAsc("dir",permissionItemIds);

        List<JSONObject> res = list.stream().map(permissionItem -> {
            JSONObject fanhuiDir = new JSONObject();
            fanhuiDir.put("component", "Layout");
            fanhuiDir.put("hidden", permissionItem.getHidden());
            fanhuiDir.put("path", permissionItem.getPath());
            fanhuiDir.put("redirect", permissionItem.getRedirect());
            JSONObject meta = new JSONObject();
            meta.put("title",permissionItem.getTitle());
            meta.put("icon",permissionItem.getIcon());
            fanhuiDir.put("meta", meta);

            List<JSONObject> cres = getMenuChild(permissionItem, permissionItemIds);

            fanhuiDir.put("children", cres);
            return fanhuiDir;
        }).collect(Collectors.toList());

        return JsonResponse.ok(res);
    }

    public List<JSONObject> getMenuChild(PermissionItem permissionItem, List<Integer> permissionItemIds){
        List<PermissionItem> childList = permissionItemRepository.findByFatherIdAndEnableTrueAndIdInOrderByOrderAsc(permissionItem.getId(),permissionItemIds);

        List<JSONObject> res = childList.stream().map( child -> {
            JSONObject fanhuiChild = new JSONObject();
            String name = child.getComponentName()==null || ("").equals(child.getComponentName()) ? "menu"+child.getId() : child.getComponentName();
            fanhuiChild.put("name", name);
            fanhuiChild.put("component", child.getComponentPath());
            fanhuiChild.put("hidden", child.getHidden());
            fanhuiChild.put("path", child.getPath());
            JSONObject meta = new JSONObject();
            meta.put("title",child.getTitle());
            meta.put("icon",child.getIcon());
            fanhuiChild.put("meta", meta);
            JSONObject menuBtns = getMenuBtns(child, permissionItemIds);
            fanhuiChild.put("props",menuBtns);

            return fanhuiChild;
        }).collect(Collectors.toList());

        return res;
    }

    public JSONObject getMenuBtns(PermissionItem permissionItem, List<Integer> permissionItemIds){
        List<PermissionItem> childList = permissionItemRepository.findByFatherIdAndEnableTrueAndIdInOrderByOrderAsc(permissionItem.getId(),permissionItemIds);
        JSONObject menuBtns = new JSONObject();

        for (PermissionItem child : childList) {
            if(child.getKey() == null){
                continue;
            }
            JSONObject btn = new JSONObject();
            btn.put("label", child.getTitle());
            btn.put("value", child.getKey());
            btn.put("id", child.getId());

            menuBtns.put(child.getKey(), btn);
        }

        JSONObject Btns = new JSONObject();
        Btns.put("btns",menuBtns);
        return Btns;
    }


}
