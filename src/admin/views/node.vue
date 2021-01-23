<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://localhost:3000/uploadImg"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <!-- <img src="http://localhost:3000/upload//bP1emzrqg3gldUilcAU24mm-.jpg" alt=""> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [
       
      ]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>