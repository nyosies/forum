<template>
  <div>
    <header>
      <h3>发布文章</h3>
    </header>
    <el-divider>
      <i class="el-icon-mobile-phone"></i>
    </el-divider>
    <main>
      <el-form :model="ruleForm" label-width="80px">
        <el-form-item label="标题">
          <el-row>
            <el-col :span="6">
              <el-input v-model="ruleForm.title" placeholder="请选择文章标题" maxlength="24"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="作者">
          <el-row>
            <el-col :span="6">
              <el-input v-model="ruleForm.author" placeholder="请输入作者" maxlength="24"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="分类" prop="region">
          <el-select v-model="ruleForm.category_id" placeholder="请选择文章类型">
            <el-option label="vue" value="2"></el-option>
            <el-option label="css" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面图片">
          <el-row :gutter="20">
            <!-- <el-col :span="6">
              <el-input v-model="ruleForm.name" placeholder="建议使用网络图片" maxlength="24"></el-input>
            </el-col>-->
            <el-col :span="6">
              <!-- 图片上传 -->
              <el-upload
                class="upload-demo"
                action="http://localhost:3000/uploadImg"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture"
                :on-success="uploadSuccess"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- markdown编辑器 -->
        <el-form-item label="文章内容">
          <mavon-editor class="editor" style="height: 100%" v-model="ruleForm.content"></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :disabled="isbut">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>
<script>
import fun from "../../fun/fun.js";
export default {
  data() {
    return {
      ruleForm: {
        title: "",
        author: "",
        pic: "",
        category_id: "",
        content: ""
      },
      isbut: false,
      fileList: [],
      baseUrl: "http://localhost:3000/"
    };
  },
  created() {
    this.getLocalstoreUser()
  },
  methods: {
    //获取本地的数据
    getLocalstoreUser() {
      let user = localStorage.getItem("user");
      if (user) {
        let localData = JSON.parse(user);
        this.ruleForm.author = localData.account
          ? localData.account
          : "获取用户名失败请手动输入";
        this.ruleForm.uid = localData.uid ? localData.uid : "用户名出错";
      }
    },
    onSubmit() {
      this.isbut = true;
      this.addArticle();
    },
    addArticle() {
      this.$req.admin.publishArticle({
        data: this.ruleForm,
        success: res => {
          this.isbut = false;
          //弹窗提示
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
          //清空表单
         // http://localhost:3000/uploadI/qbuhpkHMGScNl_CpjsNF6Fq.jpg
          this.ruleForm = {
            title: "",
            pic: "",
            category_id: "",
            content: ""
          };
          //获取一下本地数据
          this.getLocalstoreUser()
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    /**
     *  文件上传成功后
     *  response 接口响应数据
     * file 文件信息
     */
    uploadSuccess(response, file, fileList) {
      console.log(111, response);
      if (response.code == 200) {
        //拼接图片url
        this.ruleForm.pic = this.baseUrl + response.data.path;
      }
    }
  }
};
</script>
<style scoped>
</style>