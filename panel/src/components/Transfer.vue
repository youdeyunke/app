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
  <div class="transfer udeve-transfer">
    <div class="left-window window" :style="{height:height + 'px'}">
      <div class="window-title" :style="{height:windowTitleHeight,  'margin-bottom': windowTitleHeightMarginBottom }">{{leftWindowTitle}}({{leftItems.length}})</div>
      <div class="search-box">
          <input v-model="keyword" placeholder="输入关键词搜索"></input>
          <div class="footer">
          <svg v-if="!keyword"  t="1590252681988" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4967" width="21" height="14"><path d="M908.6 883.1l-155-155c28.1-30.9 50.5-66 66.8-104.4 19.3-45.6 29-94 29-143.9 0-49.9-9.8-98.3-29-143.9-18.6-44-45.3-83.5-79.2-117.5-33.9-33.9-73.5-60.6-117.5-79.2-45.6-19.3-94-29-143.9-29-49.9 0-98.3 9.8-143.9 29-44 18.6-83.5 45.3-117.5 79.2s-60.6 73.5-79.2 117.5c-19.3 45.6-29 94-29 143.9 0 49.9 9.8 98.3 29 143.9 18.6 44 45.3 83.5 79.2 117.5s73.5 60.6 117.5 79.2c45.6 19.3 94 29 143.9 29 49.9 0 98.3-9.8 143.9-29 38.5-16.3 73.6-38.7 104.4-66.8l155 155c3.5 3.5 8.1 5.3 12.7 5.3s9.2-1.8 12.7-5.3c7.1-7.1 7.1-18.5 0.1-25.5z m-428.8-69.7c-184 0-333.6-149.7-333.6-333.6 0-184 149.7-333.6 333.6-333.6 184 0 333.6 149.7 333.6 333.6 0 184-149.6 333.6-333.6 333.6z" p-id="4968" fill="#999999"></path></svg>
          <svg v-else @click.stop="keyword=null" t="1590252723626" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6177" width="14" height="14"><path d="M558.235532 512.696872 558.235532 512.696872l-23.118534-23.118534L558.235532 512.696872 558.235532 512.696872zM511.999488 64.823378c-246.986207 0-447.189925 200.177112-447.189925 447.163319s200.203718 447.189925 447.189925 447.189925c246.986207 0 447.189925-200.204741 447.189925-447.189925S758.985696 64.823378 511.999488 64.823378L511.999488 64.823378zM743.09989 697.560206l-46.208415 46.237067L512.027118 558.905286 327.13513 743.797273l-46.209438-46.237067 184.891987-184.863335L280.925692 327.83149l46.209438-46.238091 207.982892 207.983915-23.089881-23.090904 184.863335-184.893011 46.208415 46.238091L558.235532 512.696872 743.09989 697.560206 743.09989 697.560206zM743.09989 697.560206" p-id="6178" fill="#999999"></path></svg>
          </div>
      </div>
      <ul :style="{height: leftListHeight}">
        <li
          @click.stop="selectHandle(index)"
          v-for="left,index in leftItems"
          v-if="left"
        >{{left.label}}</li>
      </ul>
    </div>
    <div class="middle">
      <svg t="1590252614894" class="icon" viewBox="0 0 1117 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4141" width="20" height="20"><path d="M970.28276331 465.43862766L553.28060931 55.61135266a45.816565 45.816565 0 0 0-63.815133 0 43.897313 43.897313 0 0 0 0 62.822031l388.079471 381.239346-388.079471 381.373246a43.741094 43.741094 0 0 0 0 62.68813 45.649188 45.649188 0 0 0 63.815133 0l417.035629-409.693374c9.719003-9.462359 13.590983-22.015607 12.82105-34.368002a43.294757 43.294757 0 0 0-12.854525-34.234102M656.15029031 499.67272966a43.038113 43.038113 0 0 0-12.653674-34.211785L226.50562131 55.61135266a46.017417 46.017417 0 0 0-63.993667 0 44.053531 44.053531 0 0 0 0 62.822031l388.391907 381.239346L162.51195431 881.04597566a43.863837 43.863837 0 0 0 0 62.68813 45.861199 45.861199 0 0 0 63.993667 0l417.024471-409.693374a43.328232 43.328232 0 0 0 12.620198-34.368002" p-id="4142"></path></svg>
    </div>
    <div class="right-window window" :style="{height: height + 'px'}">
      <div class="window-title" :style="{height:windowTitleHeight,  'margin-bottom': windowTitleHeightMarginBottom }">{{rightWindowTitle}}({{rightItems.length}})</div>
      <div class="empty" v-if="rightItems.length == 0">左侧列表中点击添加</div>
      <ul :style="{height: rightListHeight}">
      <draggable v-model="rightItems" draggable=".right-item" @end="dragEndHandle">
        <li v-for="right,index in rightItems" v-if="right" class="right-item">
          <div class="label">{{right.label}}</div>
          <div class="tools">
            <div
            alt="向上移动"
              v-if="right.canMoveUp"
              class="tool-item tool-item-up"
              @click.stop="moveHandle(index, -1)"
            >
              <svg t="1590251737089" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2274" ><path d="M855.936 433.4976c-9.9584 9.9584-26.2528 9.9584-36.1984 0L537.6 151.36 537.6 934.4c0 14.08-11.52 25.6-25.6 25.6-14.08 0-25.6-11.52-25.6-25.6L486.4 151.36 204.2624 433.4976c-9.9584 9.9584-26.2528 9.9584-36.1984 0-9.9584-9.9584-9.9584-26.2528 0-36.1984L493.9008 71.4496c2.3936-2.3936 5.1712-4.1856 8.1152-5.4272 0.0128-0.0128 0.0256-0.0128 0.0512-0.0256 1.2544-0.5248 2.5472-0.8832 3.8528-1.2032 0.3456-0.0896 0.6656-0.2304 1.024-0.3072 3.3408-0.6656 6.784-0.6656 10.112 0 0.3584 0.0768 0.6784 0.2176 1.024 0.3072 1.3056 0.32 2.5984 0.6784 3.8528 1.2032 0.0128 0 0.0128 0.0128 0.0256 0.0128 2.9568 1.2416 5.7344 3.0336 8.1408 5.4272L855.936 397.2864C865.8944 407.2448 865.8944 423.5392 855.936 433.4976z" p-id="2275"></path></svg>
            </div>
            <div
            alt="向下移动"
              v-if="right.canMoveDown"
              class="tool-item tool-item-down"
              @click.stop="moveHandle(index, 1)"
            >
              <svg t="1590251737089" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2274" ><path d="M855.936 433.4976c-9.9584 9.9584-26.2528 9.9584-36.1984 0L537.6 151.36 537.6 934.4c0 14.08-11.52 25.6-25.6 25.6-14.08 0-25.6-11.52-25.6-25.6L486.4 151.36 204.2624 433.4976c-9.9584 9.9584-26.2528 9.9584-36.1984 0-9.9584-9.9584-9.9584-26.2528 0-36.1984L493.9008 71.4496c2.3936-2.3936 5.1712-4.1856 8.1152-5.4272 0.0128-0.0128 0.0256-0.0128 0.0512-0.0256 1.2544-0.5248 2.5472-0.8832 3.8528-1.2032 0.3456-0.0896 0.6656-0.2304 1.024-0.3072 3.3408-0.6656 6.784-0.6656 10.112 0 0.3584 0.0768 0.6784 0.2176 1.024 0.3072 1.3056 0.32 2.5984 0.6784 3.8528 1.2032 0.0128 0 0.0128 0.0128 0.0256 0.0128 2.9568 1.2416 5.7344 3.0336 8.1408 5.4272L855.936 397.2864C865.8944 407.2448 865.8944 423.5392 855.936 433.4976z" p-id="2275"></path></svg>
            </div>
            <div class="tool-item tool-item-delete" @click.stop="deleteHandle(index)"
            alt="取消选择"
            >
              <svg t="1590252441370" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3280" width="200" height="200"><path d="M807.127074 186.990435c-7.695491 0-15.390982 2.898302-21.187585 8.794847L195.085692 786.539137c-11.693149 11.693149-11.693149 30.682022 0 42.375171 5.896545 5.896545 13.492094 8.794847 21.187585 8.794847 7.695491 0 15.390982-2.898302 21.187586-8.794847l590.753855-590.753855c11.693149-11.693149 11.693149-30.682022 0-42.375171-5.796604-5.896545-13.492094-8.794847-21.087644-8.794847z" fill="#ff0000" p-id="3281"></path><path d="M216.872926 186.490728c-7.695491 0-15.390982 2.898302-21.187585 8.794847-11.693149 11.693149-11.693149 30.682022 0 42.375171l590.653913 590.653913c5.896545 5.896545 13.492094 8.794847 21.187586 8.794847s15.390982-2.898302 21.187585-8.794847c11.693149-11.693149 11.693149-30.682022 0-42.37517l-590.653914-590.653914c-5.796604-5.896545-13.492094-8.794847-21.187585-8.794847z" fill="#ff0000" p-id="3282"></path></svg>
            </div>
          </div>
        </li>
      </draggable>
      </ul>
    </div>
  </div>
</template>

<script>

import draggable from 'vuedraggable'
export default {
    components: {
        draggable,
    },
  data() {
    return {
        size: {
            windowTitle: {height: 32, marginBottom: 10},
            searchBox: {height: 30, marginBottom: 0},
        },
      keyword: null,
    };
  },
  props: {
    titles: {type: Array, default: function(){return ["待选", "已选"]}},
    filterable: {type: Boolean, default: true},
    height: {
      type: Number,
      default: 300
    },
    props: {
      type: Object,
      default: function() {
        return { key: "key", label: "label" };
      }
    },
    data: { type: Array, default: [] },
    value: {
      type: Array,
      default: function(){ return [] }
    }
  },

  computed: {
      leftWindowTitle: function(){
          return this.titles[0] || '待选'
      },
      rightWindowTitle: function(){
          if(this.titles.length < 2){
              return '已选'
          }
          return this.titles[1] || '已选'
      },
      windowTitleHeight: function(){
        return  this.size.windowTitle.height + 'px'
      },
      windowTitleHeightMarginBottom: function(){
        return  this.size.windowTitle.marginBottom + 'px'
      },
      leftListHeight: function(){
          // 计算左侧列表高度
        var height = this.height - this.size.windowTitle.height - this.size.windowTitle.marginBottom - 20
        if(this.filterable){
            height -=  this.size.searchBox.height 
            height -= this.size.searchBox.marginBottom
        }
        return height + 'px'
      },
      rightListHeight: function(){
          // 计算左侧列表高度
        var height = this.height - this.size.windowTitle.height - this.size.windowTitle.marginBottom - 20
        return height + 'px'
      },
    keys: {
      get() {
        const v = this.value;
        return JSON.parse(JSON.stringify(v));
      },
      set(val) {
        console.log("keys 发生变化", val);
        this.$emit("input", val);
        this.$emit("change", val);
      }
    },
    leftItems: {
      // 左侧待选列表
      get() {
        var key = this.props.key;
        var label = this.props.label;
        var _items = []
        this.data.forEach((item, i) => {
          if (!this.keys.includes(item[key]) && item) {
            var _item = { label: item[label] || '' + item[key], key: item[key] }
              if(!this.keyword || _item.label.includes(this.keyword)){
                  _items.push(_item)
              }
          }
        });
        return _items;
      },
      set(val) {}
    },
    rightItems: {
      get() {
        var key = this.props.key;
        var label = this.props.label;
        var _items = [];
        var _this = this;
        this.value.forEach((keyItem, i) => {
          this.data.forEach((item, j) => {
            if (item[key] == keyItem) {
              var canMoveUp = i > 0 ? true : false;
              var canMoveDown = i == _this.value.length - 1 ? false : true;
              var _item = {
                label: item[label],
                key: item[key],
                canMoveUp: canMoveUp,
                canMoveDown: canMoveDown
              };
              _items.push(_item);
            }
          });
        });
        return _items;
      },
      set(val) {
        console.log('set right items', val)
        // 拖动方式移动，会改变数组结构
        var keys = val.map((item,i) => {
            return item['key']
        })
        console.log('keys', keys)
        this.$emit('input', keys)
        this.$emit('change', keys)
        return [];
      }
    }
  },

  methods: {
    dragEndHandle: function(){
        // 停止拖动
        console.log('darg end event')
    },
    moveHandle: function(index, val) {
      var keys = this.keys;
      var i = index;
      var j = index + val;
      // 检查是否超出了边界
      if (j < 0) {
        return false;
      }

      if (j > keys.length - 1) {
        return false;
      }

      var tmp = keys[i];
      keys[i] = keys[j];
      keys[j] = tmp;
      //this.keys = [];
      this.keys = keys;
    },
    deleteHandle: function(index) {
      // 从列表中删除
      var keys = this.keys;
      keys.splice(index, 1);
      this.keys = keys;
    },
    selectHandle: function(index) {
      // 从右侧点击选择按钮
      var item = this.leftItems[index];
      if (!item) {
        return false;
      }
      // 追加到keys中
      var keys = this.keys;
      if (!item.key) {
        return false;
      }
      if (keys.includes(item.key)) {
        return false;
      }
      keys.push(item.key);
      this.keys = keys;
      // 修改keys会触发input
    }
  }
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0px;
}

.transfer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}

.transfer .window {
  border: 1px solid #e3e2e8;
  min-width: 188px;
  width: 40%;
}

.transfer .window .search-box{
    display: flex;
    height:30px;
    margin:0 10px;
    position: relative;
    font-size:12px;
}

.transfer .window .search-box input{
    height:100%;
    margin:0;
    position: absolute;
    left:0;
    top:0;
    padding:0 30px 0 10px;
    border-radius: 30px;
    width:100%;
    border: 1px solid #e3e2e8;
    outline: none;
}


.transfer .window  .search-box .footer{
    width:30px;
    height:30px;
    position: absolute;
    right:0;
    top:0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
}

.transfer .window .empty{
    user-select: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color:#999;
    font-size:12px;
}

.transfer .window-title {
  text-align: center;
  color: #333;
  background-color: rgb(245, 247, 250);
  font-size: 12px;
  font-weight: 500;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: centern;
}

.transfer .middle {
  width: 10%;
  font-size: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.transfer  ul {
  list-style: none;
  margin: 10px;
  padding:0;
  overflow-y: scroll;
  overflow-y: scroll;
}

.transfer ul li {
  padding: 0 5px;
  cursor: pointer;
  font-size: 13px;
  height:24px;
  line-height: 24px;
  user-select: none;
}

.transfer .left-window li:hover {
  background: #1989fa;
  color: #ffffff;
}

.transfer .right-window li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transfer .right-window .right-item:hover{
    background: #f4f4f4;
    cursor:move;
}

.transfer .right-window li .label,
.left-window li {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
}

.transfer .right-window li .tools {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
}

.transfer .right-window li .tools .tool-item {
  margin: 0 4px;
  cursor: pointer;
}

.transfer .right-window li .tool-item .icon{
    width: 12px;
    height:12px;
    margin:0;
    padding:0
}

.transfer .right-window .tools .tool-item-down .icon{
    transform: rotate(180deg);
}
</style>