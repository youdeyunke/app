package com.udeve.controllers.admin;
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
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import com.alibaba.excel.EasyExcel;
import com.alibaba.fastjson.JSONObject;
import com.udeve.request.CommonRequest;
import com.udeve.utils.annotation.IgnoringIdentity;
import com.udeve.vo.NeedExcelVo;
import com.udeve.entity.Need;
import com.udeve.repository.NeedRepository;
import com.udeve.service.NeedService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;




import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.udeve.BaseApiController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@SaCheckLogin
@Api(tags = "用户需求")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminNeedController extends BaseApiController {

    @Autowired
    NeedService needService;

    @Autowired
    NeedRepository needRepository;

    @Autowired
    ModelMapper modelMapper;

    @Operation(summary = "获取需求列表", description = "用于获取需求列表")
    @GetMapping(value = "/admin6/needs/")
    public JsonResponse getNeedList(@RequestParam Map<String, Object> query){
        JSONObject queryJson = new JSONObject(query);
        CommonRequest queryDto = JSONObject.parseObject(queryJson.toString(), CommonRequest.class);

        return needService.getNeedList(queryDto);
    }

    @Operation(summary = "导出需求列表", description = "用于导出需求列表")
    @PostMapping(value = "/admin6/needs/export")
    @SaCheckPermission("export_needs")
    @IgnoringIdentity("导出功能忽略身份")
    public void exportData(HttpServletResponse response) throws IOException {
        List<Need> all = needRepository.findAll();
        List<NeedExcelVo> list = all.stream().map(need -> {
            NeedExcelVo dto = modelMapper.map(need, NeedExcelVo.class);
            String minMax = "";
            if (need.getBudgetMin() != null || need.getBudgetMax() != null) {
                if (need.getBudgetMin() != null) {
                    minMax += need.getBudgetMin();
                }
                minMax += "-";
                if (need.getBudgetMax() != null) {
                    minMax += need.getBudgetMax();
                }
            }
            dto.setMinMax(minMax);
            return dto;
        }).collect(Collectors.toList());
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setCharacterEncoding("utf-8");
        // 这里URLEncoder.encode可以防止中文乱码 当然和easyexcel没有关系
        String fileName = "needs";
        response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");
        EasyExcel.write(response.getOutputStream(), NeedExcelVo.class).sheet("模板").doWrite(list);
    }
}
