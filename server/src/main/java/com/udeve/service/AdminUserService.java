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

import cn.dev33.satoken.stp.SaLoginConfig;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.util.ObjectUtil;
import com.udeve.entity.Role;
import com.udeve.repository.*;
import com.udeve.request.AdminUserCreateRequest;
import com.udeve.utils.text.StringUtils;
import com.udeve.vo.AdminUserVo;
import com.udeve.vo.AdminUserListVo;
import com.udeve.request.AdminUserUpdateRequest;
import com.udeve.entity.AdminUser;
import com.udeve.entity.AdminUserRole;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AdminUserService {
    @Autowired
    private AdminUserRepository adminUserEntityRepository;
    @Autowired
    private AdminUserRoleRepository adminUserRoleRepository;
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    MyconfigService myconfigService;
    @Autowired
    AdminLogService adminLogService;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    RolePermissionItemRepository rolePermissionItemRepository;
    @Autowired
    PermissionItemRepository permissionItemRepository;
    @Autowired
    ModelMapper modelMapper;

    /**
     * 检车账号状态是否正常
     * @param user
     * @return
     */
    private JsonResponse checkAccountStatus(AdminUser user) {
        if (user.getIsDelete()) {
            return JsonResponse.error("账号已停用");
        }
        // 判断账号是否可用
        Boolean isForever = user.getIsForever();
        if (isForever == null || !isForever) {
            LocalDate expiredAt = user.getExpiredAt();
            if (expiredAt == null) {
                return JsonResponse.error("账号状态异常");
            }
            if (expiredAt.isBefore(LocalDate.now())) {
                return JsonResponse.error("账号已过期");
            }
        }
        return JsonResponse.ok();
    }

    public JsonResponse login(String email, String password) {
        Optional<AdminUser> byEmailAndIsDelete = adminUserEntityRepository.findFirstByEmailAndIsDeleteFalseOrderByIdDesc(email);
        if (byEmailAndIsDelete.isEmpty()) {
            adminLogService.createAdminLog(null, "账号登录", "账号错误,账号：" + email);
            return JsonResponse.error("用户名或密码错误");
        }
        AdminUser adminUser = byEmailAndIsDelete.get();
        JsonResponse checkRes = checkAccountStatus(adminUser);
        if (checkRes.getCode() != 0) {
            return checkRes;
        }

        Boolean checked = BCrypt.checkpw(password, adminUser.getEncryptedPassword());
        if (!checked) {
            adminLogService.createAdminLog(adminUser.getId(), "账号登录", "密码错误,账号：" + adminUser.getEmail());
            return JsonResponse.error("用户名或密码错误");
        }

        HashMap<String, Object> uData = new HashMap<>();
        uData.put("user_id", adminUser.getId());
        List<String> names = adminUser.getRoles().stream().map(Role::getName).toList();
        //检查names中是否含有“demo”或含有“演示”，含有的话，给与权限demo，没有的话，给与admin身份
        if (names.size() == 1 && (names.contains("demo") || names.contains("演示"))) {
            uData.put("user_type", "demo");
        } else if (names.contains("demo") || names.contains("演示")) {
            uData.put("user_type", "admin,demo");
        } else {
            uData.put("user_type", "admin");
        }
        uData.put("user_name", ObjectUtil.isNotEmpty(adminUser.getName()) ? adminUser.getName() : adminUser.getEmail());
        StpUtil.login(adminUser.getId(), SaLoginConfig.setExtraData(uData));

        adminLogService.createAdminLog(adminUser.getId(), "账号登录", "账号登陆成功，进入管理后台,账号登陆方式：用户名登陆");

        String tokenValue = StpUtil.getTokenValue();
        return JsonResponse.ok(tokenValue);
    }

    public JsonResponse adminUserGetInfo(Integer id) {
        Optional<AdminUser> adminUserOptional = adminUserEntityRepository.findById(id);
        if (adminUserOptional.isEmpty()) {
            return JsonResponse.error("管理员不存在");
        }
        AdminUser adminUser = adminUserOptional.get();
        AdminUserVo userDto = modelMapper.map(adminUser, AdminUserVo.class);
        return JsonResponse.ok(userDto);
    }

    public JsonResponse getAdminUserList() {
        //查询所有管理员（没过期并且未删除）
        List<AdminUser> all = adminUserEntityRepository.findAllByIsDeleteFalse();
        List<AdminUser> allList = all.stream().map(adminUser -> {
            if (!adminUser.getIsForever() && adminUser.getExpiredAt() != null && adminUser.getExpiredAt().isBefore(LocalDate.now())){
                return null;
            }
            return adminUser;
        }).filter(Objects::nonNull).toList();

        ///将查询出来的结果设置 isLast 的值
        List<AdminUserListVo> list = allList.stream().map(adminUser -> {
            // 将AdminUser映射到AdminUserListVo
            AdminUserListVo adminUserListVo = modelMapper.map(adminUser, AdminUserListVo.class);
            // 如果是唯一用户，设置isLast为true
            if (allList.size()==1){
                adminUserListVo.setIsLast(true);
            }
            return adminUserListVo;
            // 过滤掉null值，即过期的用户
        }).filter(Objects::nonNull).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

    @Transactional
    public JsonResponse updateAdminUser(Integer id, AdminUserUpdateRequest updateDto, Integer userId) {
        // 先根据 ID 获取要更新的管理员用户
        AdminUser adminUserToUpdate = adminUserEntityRepository.findById(id).orElse(null);
        if (adminUserToUpdate == null) {
            return JsonResponse.error("管理员不存在");
        }

        // 检查是否允许修改邮箱（只有当邮箱不变或当前用户拥有该邮箱时才允许更新）
        if (adminUserToUpdate.getEmail() != null && !adminUserToUpdate.getEmail().equals(updateDto.getEmail())) {
            return JsonResponse.error("不允许修改账号邮箱");
        }

        //如果取消勾选了账号永久有效，则判断选择的账号到期时间是否是今天之前
        if (!updateDto.getIsForever()) {
            if (updateDto.getExpiredAt().isBefore(LocalDate.now())) {
                return JsonResponse.error("账号到期时间不能选择之前的日期");
            }
        }

        // 将 DTO 中的数据映射到实体类上
        modelMapper.map(updateDto, adminUserToUpdate);

        // 删除原有角色关联信息
        adminUserRoleRepository.deleteAllByAdminUserId(id);

        // 更新角色关联信息
        updateDto.getRoleIds().forEach(roleId -> {
            AdminUserRole adminUserRole = new AdminUserRole();
            adminUserRole.setAdminUserId(adminUserToUpdate.getId());
            adminUserRole.setRoleId(roleId);
            adminUserRole.setUpdatedAt(LocalDateTime.now());
            adminUserRole.setCreatedAt(LocalDateTime.now());
            adminUserRoleRepository.saveAndFlush(adminUserRole);
        });

        // 保存更新后的管理员用户信息
        adminUserEntityRepository.saveAndFlush(adminUserToUpdate);

        // 记录日志
        adminLogService.createAdminLog(userId, "管理员账号管理", "更新管理员账号" + adminUserToUpdate.getEmail() + "，ID：" + adminUserToUpdate.getId());

        return JsonResponse.ok("更新成功");
    }


    @Transactional
    public JsonResponse createAdminUser(AdminUserCreateRequest updateDto, Integer userId) {
        Optional<AdminUser> byEmailAndIsDelete = adminUserEntityRepository.findFirstByEmailAndIsDeleteFalseOrderByIdDesc(updateDto.getEmail());
        if (byEmailAndIsDelete.isPresent()) {
            return JsonResponse.error("管理员：" + updateDto.getEmail() + "已存在");
        }
        AdminUser adminUser = new AdminUser();
        modelMapper.map(updateDto, adminUser);
        adminUser.setEncryptedPassword(passwordEncoder.encode("88888888"));
        adminUser.setCreatedAt(LocalDateTime.now());
        adminUser.setUpdatedAt(LocalDateTime.now());
        adminUser.setApiKey(StringUtils.generateApiKeyForAdminUser());


        //如果取消勾选了账号永久有效，则判断选择的账号到期时间是否是今天之前
        if (!updateDto.getIsForever()) {
            if (updateDto.getExpiredAt().isBefore(LocalDate.now())) {
                return JsonResponse.error("账号到期时间不能选择之前的日期");
            }
        }


        adminUserEntityRepository.saveAndFlush(adminUser);
        updateDto.getRoleIds().forEach(roleId -> {
            AdminUserRole adminUserRole = new AdminUserRole();
            adminUserRole.setAdminUserId(adminUser.getId());
            adminUserRole.setRoleId(roleId);
            adminUserRole.setUpdatedAt(LocalDateTime.now());
            adminUserRole.setCreatedAt(LocalDateTime.now());
            adminUserRoleRepository.saveAndFlush(adminUserRole);
        });
        adminLogService.createAdminLog(userId, "管理员账号管理", "创建管理员账号" + adminUser.getEmail() + "，ID：" + adminUser.getId());
        return JsonResponse.ok("创建成功");
    }

    @Transactional
    public JsonResponse deleteAdminUser(Integer id, Integer userId) {
        Optional<AdminUser> adminUserOptional = adminUserEntityRepository.findById(id);
        if (adminUserOptional.isEmpty()) {
            return JsonResponse.error("管理员不存在！");
        }
        List<AdminUser> all = adminUserEntityRepository.findAllByIsDeleteFalse();
        List<AdminUser> list = all.stream().map(adminUser -> {
            // 如果用户已过期，则不包含在返回列表中
            if (!adminUser.getIsForever() && adminUser.getExpiredAt() != null && adminUser.getExpiredAt().isBefore(LocalDate.now())){
                return null;
            }
            return adminUser;
            // 过滤掉null值，即过期的用户
        }).filter(Objects::nonNull).toList();
        // 当管理员只剩一个的时候，不能删除
        if (list.size() == 1) {
            return JsonResponse.error("管理员至少需要保留一个账号！");
        }
        AdminUser adminUser = adminUserOptional.get();
        adminUser.setIsDelete(true);
        adminUserEntityRepository.saveAndFlush(adminUser);
        adminLogService.createAdminLog(userId, "管理员账号管理", "删除管理员账号" + adminUser.getEmail() + "，ID：" + adminUser.getId());
        return JsonResponse.ok("删除成功");
    }

    @Transactional
    public JsonResponse changePassword(Integer id, String oldPassword, String newPassword, Integer userId) {
        AdminUser adminUser = adminUserEntityRepository.findById(id).get();
        Boolean checked = BCrypt.checkpw(oldPassword, adminUser.encryptedPassword);
        if (!checked) {
            return JsonResponse.error("旧密码错误");
        }
        adminUser.setEncryptedPassword(passwordEncoder.encode(newPassword));
        adminUserEntityRepository.saveAndFlush(adminUser);
        adminLogService.createAdminLog(userId, "管理员账号管理", "修改管理员账号" + adminUser.getEmail() + "密码，ID：" + adminUser.getId());
        return JsonResponse.ok("修改成功");
    }

    public List<String> getRolesByUserId(Integer id) {
        List<AdminUserRole> adminUserRoles = adminUserRoleRepository.findAllByAdminUserId(id);
        List<String> roles = adminUserRoles.stream().map(adminUserRole -> {
            return roleRepository.findById(adminUserRole.getRoleId()).get().getKey();
        }).collect(Collectors.toList());
        return roles;
    }

    public List<String> getPermissionsByUserId(Integer id) {
        List<AdminUserRole> adminUserRoles = adminUserRoleRepository.findAllByAdminUserId(id);
        List<String> roles = adminUserRoles.stream().map(adminUserRole -> {
            List<Integer> permissionIds = rolePermissionItemRepository.findAllByRoleId(adminUserRole.getRoleId()).stream().map(rolePermissionItem -> {
                return rolePermissionItem.getPermissionItemId();
            }).collect(Collectors.toList());
            List<String> permissions = permissionItemRepository.findAllByIdInAndCatAndEnableTrue(permissionIds, "button").stream().map(permissionItem -> {
                return permissionItem.getKey();
            }).collect(Collectors.toList());
            return permissions;
        }).flatMap(List::stream).collect(Collectors.toList());
        return roles;
    }

    public JsonResponse resetApiKey(Integer adminUserId) {
        adminUserEntityRepository.findById(adminUserId).ifPresent(adminUser -> {
            adminUser.setApiKey(StringUtils.generateApiKeyForAdminUser());
            adminUser.setUpdatedAt(LocalDateTime.now());
            adminUserEntityRepository.saveAndFlush(adminUser);
            adminLogService.createAdminLog(adminUser.getId(), "管理员重置秘钥", "管理员" + adminUser.getEmail() + "：重置了apikey，ID：" + adminUser.getId());
        });

        return JsonResponse.ok();
    }

}
