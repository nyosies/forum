<template>
  <div class="comment">
    <div class="comment_list">
      <el-row :gutter="4">
        <el-col :span="16">
          <div class="input-user">
            <el-input v-model="bindUserName" placeholder="请输入留言名"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="4">
        <el-col :span="16">
          <el-input placeholder="欢迎添加留言信息" v-model="bindContent"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="launchClick">留言</el-button>
        </el-col>
      </el-row>
      <ul v-if="dataList">
        <li v-for="item in dataList" :key="item">
          <b>{{userName?userName:'游客'+item}}:</b>
          <p>{{item}}</p>
        </li>
      </ul>
      <ul v-show="!dataList==false">
        <li>
          <b>暂无留言，欢迎留言</b>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => []
    },
    userName: {
      type: String,
      default: "张三"
    }
  },
  data() {
    return {
      bindUserName: "",
      bindContent: ""
    };
  },
  created() {
    // console.log(this.dataList)
  },
  methods: {
    launchClick() {
      let _opt = {
        bindUserName: this.bindUserName,
        bindContent: this.bindContent
      };
      this.$emit("handlerClick", _opt);
    }
  }
};
</script>
<style lang="less" scoped>
.comment {
  margin-top: 9px;
  .comment_list {
    ul {
      list-style: none;
      li {
        display: flex;
        padding: 6px;
        margin: 6px 0;
        border-bottom: #a4b0be 1px solid;
        &:nth-child(odd) {
          border-bottom: #57606f 1px solid;
        }
        &:last-child {
          border-bottom: none;
        }
        p {
          margin-left: 5.3px;
        }
      }
    }

    .input-user {
      margin-bottom: 6px;
    }
  }
}
</style>