<!--
+----------------------------------------------------------------------
| 友得云客  - 开启房产营销新纪元
+----------------------------------------------------------------------
| Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
+----------------------------------------------------------------------
| Licensed 友得云客不是自由软件 未经允许不可移除相关版权
+----------------------------------------------------------------------
| Author: www.youdeyunke.com
+----------------------------------------------------------------------
-->
<template>
  <div class="app-container" v-cloak v-loading="loading">
    <ud-card>
      <div class="tools">
        <el-input
          size="small"
          style="width: 180px"
          placeholder="搜索关键词"
          round
          v-model="filterText"
          @input="searchTreeHandle"
        />

        <div class="blank"></div>

        <el-button
          v-if="btns.create_permission_item"
          size="small"
          icon="el-icon-plus"
          type="primary"
          @click="createHandle"
          >添加菜单</el-button
        >
        
      </div>

      <el-tree
        :data="treeData"
        ref="tree"
        :default-expand-all="true"
        :filter-node-method="filterNode"
        :highlight-current="true"
        :indent="24"
      >
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <div class="name">
            <span> {{ data.label }} </span>
          </div>

          <div class="key">
            {{ data.key }}
          </div>

          <div class="btns">
            <el-link
              v-if="btns.update_permission_item"
              icon="el-icon-edit"
              type="primary"
              @click="() => treeItemClick('edit', node.data)"
            >
              编辑
            </el-link>
            &nbsp;&nbsp;

            <el-link
              v-if="btns.delete_permission_item"
              icon="el-icon-delete"
              type="danger"
              @click="() => treeItemClick('delete', node.data)"
            >
              删除
            </el-link>
          </div>
        </div>
      </el-tree>
    </ud-card>

    <el-dialog
      :visible.sync="showForm"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      v-loading="loading"
      title="菜单设置"
      width="400px"
      :with-header="false"
      v-if="showForm"
    >
      <el-form size="small" label-position="left" label-width="100px" v-if="currentItem">
        <el-form-item label="菜单类型">
          <el-radio-group v-model="currentItem.cat" :disabled="!isNew">
            <el-radio-button v-for="(cat, i) in cats" :label="cat.value" :key="i">{{
              cat.name
            }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <dir-form :item="currentItem" v-if="currentItem.cat === 'dir'" />
        <menu-form :item="currentItem" v-if="currentItem.cat === 'menu'" />
        <button-form :item="currentItem" v-if="currentItem.cat === 'button'" />

        <el-form-item label="是否激活" required>
          <el-switch v-model="currentItem.enable" />
        </el-form-item>

        <el-form-item label="排序" required>
          <el-input v-model="currentItem.order" type="number" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="() => (showForm = false)" icon="el-icon-close">取消</el-button>
        <el-button :disabled="!canSave" size="mini" type="primary" @click="submitHandle" icon="el-icon-check"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UdCard from "@/components/UdCard";
import Vue from "vue";
import ButtonForm from "./ButtonForm";
import DirForm from "./DirForm";
import MenuForm from "./MenuForm";
import {
  getPermissionTree,
  getPermissionItems,
  createPermissionItem,
  deletePermissionItem,
  updatePermissionItem,
} from "@/api/permission";

export default {
  name: "menus",
  components: { ButtonForm, DirForm, MenuForm, UdCard },
  data() {
    return {
      cats: [
        { name: "主模块", value: "dir" },
        { name: "菜单", value: "menu" },
        { name: "按钮", value: "button" },
      ],
      items: [],
      filterText: "",
      treeData: [],
      showForm: false,
      currentItem: null,
      loading: false,
    };
  },

  props: {
    btns: { type: Object, default: null },
  },

  watch: {
    showForm: function (v) {},
  },

  created: function () {
    this.loadData();
  },

  computed: {
    headers: function () {
      return { Authorization: `Bearer ${this.$store.state.user.token}` };
    },
    canSave: function () {
      var d = this.currentItem;
      if (!d) {
        return false;
      }
      if (d.id && d.father_id === d.id) {
        return false;
      }
      if (!d.title) {
        return false;
      }
      return true;
    },
    isNew: function () {
      return !this.currentItem.id;
    },
    dirItems: function () {
      return this.items.filter((item, i) => {
        return item.cat === "dir";
      });
    },
    menuItems: function () {
      return this.items.filter((item, i) => {
        return item.cat === "menu";
      });
    },
    buttonItems: function () {
      return this.items.filter((item, i) => {
        return item.cat === "button";
      });
    },
  },

  methods: {
    importHandle: function(){
      this.$message.success('导入成功！')
      this.loadData()
    }, 

    searchTreeHandle: function (val) {
      this.$refs.tree.filter(val);
    },
    filterNode(value, data) {
      if (!value) return true;
      var v1 = data.label.indexOf(value) !== -1;
      var v2 = false;
      if (data.key) {
        var v2 = data.key.indexOf(value) !== -1;
      }

      return v1 || v2;
    },

    treeItemClick: function (action, node) {
      console.log("action", action, node.id, "fucknode", node);
      var res = this.items.filter((item2, i) => {
        return item2.id === node.id;
      });

      var item = res[0];
      if (action == "edit") {
        return this.editHandle(item);
      }
      if (action == "delete") {
        return this.deleteHandle(item);
      }
    },

    loadData: function () {
      this.loading = true;
      getPermissionTree().then((res) => {
        this.treeData = res.data;
        getPermissionItems().then((res2) => {
          this.items = res2.data;
          this.loading = false;
        });
      });
    },

    editHandle: function (item) {
      this.currentItem = item;
      this.showForm = true;
    },

    deleteHandle: function (item) {
      this.$confirm("确定要删除这个菜单项？").then(() => {
        deletePermissionItem(item.id).then((res) => {
          this.loadData();
        });
      });
    },

    validate: function (data) {
      return true;
    },

    submitHandle: function () {
      var data = this.currentItem;
      var isok = this.validate(data);
      if (!isok) {
        return;
      }
      if (data.id) {
        updatePermissionItem(data).then((resp) => {
          this.saveCallback(resp);
        });
        return;
      }
      createPermissionItem(data).then((resp) => {
        this.saveCallback(resp);
      });
    },

    saveCallback: function (resp) {
      this.loadData();
      if (resp.status != 0) {
        return false;
      }
      this.showForm = false;
      this.$message.success("保存成功");
      this.$store.dispatch("permission/getMenus");
    },
    createHandle: function () {
      var item = {
        cat: "dir",
        title: "",
        icon: "",
        component_path: "",
        component_name: "",
        order: 0,
        enable: true,
        hidden: false,
        father_id: null,
        path: "",
      };
      Vue.set(this, "currentItem", item);
      this.showForm = true;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.tools {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}

.tools .blank{
  width:10px;
}

.custom-tree-node {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.custom-tree-node .name {
  width: 300px;
}

.custom-tree-node .key {
  width: 100px;
}

.custom-tree-node .btns {
  display: flex;
  justify-content: flex-end;
  width: 200px;
}
</style>
