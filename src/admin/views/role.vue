<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 添加用户和搜索 -->
      <el-form label-width="100px" class="demo-ruleForm">
        <el-input placeholder="请输入要搜索的用户名" v-model="newsData.query"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="userSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-circle-plus" @click="dialogVisible=true">添加</el-button>
      </el-form>
      <el-table stripe style="width: 100%" :data="userData" border>
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="username" label="用户名" width="120"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="120"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="switchBut(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 文字提示 -->
            <el-tooltip content="编辑用户" placement="top">
              <el-button
                type="primary"
                icon="el-icon-setting"
                size="mini"
                @click="userEdit(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除用户" placement="top">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="userDel(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="分配角色" placement="top">
              <el-button
                type="info"
                icon="el-icon-s-help"
                size="mini"
                @click="distributionRoles(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页 -->
      <el-pagination
        :page-size="newsData.pagesize"
        :current-page="newsData.pagesize"
        layout="prev, pager, next"
        :page-count="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" @close="closeAdduser">
      <!-- 内容区域 -->
      <el-form :model="formDialog" ref="formDialogRef" label-width="auto" :rules="rules">
        <el-form-item label="用户名" prop="username" style="margin-left='20px">
          <el-input v-model="formDialog.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formDialog.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model.number="formDialog.mobile" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formDialog.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUser">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog title="编辑用户" :visible.sync="userEditDialog" width="50%">
      <!-- 内容 -->
      <el-form ref="editDataRef" :model="editData" label-width="80px" :rules="editRules">
        <el-form-item label="用户名">
          <el-input v-model="editData.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editData.email"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer">
        <el-button @click="addEditUser">确 定</el-button>
        <el-button type="primary" @click="userEditDialog = false">取 消</el-button>
      </span>
    </el-dialog>

    <!--------- 分配角色 -------------->
    <el-dialog title="分配角色" :visible.sync="distribution" width="50%" @close='closeAll'>
      <!-- 内容 -->
      <el-form
        ref="distributionDataRef"
        :model="distributionData"
        label-width="80px"
      >
        <el-form-item label="用户名">
          <el-input v-model="distributionData.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="distributionData.role_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="新角色">
          <!-- 选择器 -->
          <el-select v-model="rolevalueID" clearable placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer">
        <el-button @click="distributionRolesBut">确 定</el-button>
        <el-button type="primary" @click="distribution = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    //自定义验证规则
    let mobileNuber = (rule, value, callback) => {
      const reg = /^[0-1][0-9]{10}$/
      if (reg.test(value)) {
        callback()
      }
      callback(new Error('不合法的电话'))
    }
    return {
      //修改用户数据,验证规则
      editRules: {
        mobile: [{ validator: mobileNuber, trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      },
      //分配角色
      distributionData: {},
      distribution: false,
      rolevalueID:'',
      roleList:[],
      //修改用户数据
      editData: {},

      formDialog: {
        username: '',
        mobile: '',
        password: '',
        email: ''
      },
      //验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用密码', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
        ],
        mobile: [{ validator: mobileNuber, trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      },
      userEditDialog: false,
      dialogVisible: false,
      newsData: {
        // 查询参数
        query: '',
        //当前页数
        pagenum: 1,
        //页面显示内容数
        pagesize: 5
      },
      userData: [],
      total: 0
    }
  },
  created() {
    this.news()
  },
  methods: {
    //日期格式化 需要在node 里安装引用插件require("date-utils");才能解决1970日期不对问题
    timer(v) {
      v.forEach(element => {
        var date = new Date(element.create_time)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        var d = date.getDate()
        var h = date.getHours()
        var mi = date.getMinutes()
        m = m > 9 ? m : '0' + m
        mi = mi > 9 ? mi : '0' + mi
        element.create_time = y + '-' + m + '-' + d + ' ' + h + ':' + mi
        return element.create_time
      })
    },
    //添加用户
    addUser() {
      this.$refs.formDialogRef.validate(async v => {
        //判断验证是否通过
        if (!v) return
        const { data } = await this.$http.post('users', this.formDialog)
        // console.log(data);
        if (data.meta.status !== 201) {
          this.$message.error(data.meta.msg)
        }
        this.$message.success(data.meta.msg)
        this.news()
        this.dialogVisible = false
        this.$refs.formDialogRef.resetFields()
      })
    },
    //取消按钮清空数据
    cancel() {
      this.$refs.formDialogRef.resetFields()
      //  this.formDialog.username='';
      //  this.formDialog.mobile='';
      //  this.formDialog.password='';
      //  this.formDialog.email='';
      this.dialogVisible = false
    },
    //关闭添加Dialog对话框，清空form里的数据
    closeAdduser() {
      this.$refs.formDialogRef.resetFields()
    },
    //分页，让newData当前页等于value（跳转的当前页）,发异步
    handleCurrentChange(value) {
      this.newsData.pagenum = value
      this.news()
    },
    userSearch() {
      this.news()
    },
    //显示旧数据在表单里
    async userEdit(val) {
      const { data: res } = await this.$http.get(`users/${val.id}`, {
        id: val.id
      })
      this.editData = res.data
      this.userEditDialog = true
    },
    //编辑数据
    addEditUser() {
      this.$refs.editDataRef.validate(async v => {
        if (!v) return
        console.log(this.editData.id)

        const { data: res } = await this.$http.put(
          `users/${this.editData.id}`,
          {
            id: this.editData.id,
            email: this.editData.email,
            mobile: this.editData.mobile
          }
        )
        console.log(res)

        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.news()
        this.userEditDialog = false
      })
    },
    //删除功能
    userDel(v) {
      console.log(v.id)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await this.$http.delete(`users/${v.id}`, {
            id: v.id
          })
          if (data.meta.status !== 200)
            return this.$message.error(data.meta.msg)
          this.$message.success(data.meta.msg)
          this.news()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    //分配角色
   async distributionRoles(item) {
      this.distributionData = item
      this.distribution = true
   const {data:res} =  await this.$http.get('roles')
      this.roleList=res.data
    },
   async distributionRolesBut(){
         if(!this.rolevalueID)return this.$message.warning('请选择要更改的角色')
       const {data:res} =  await this.$http.put(`users/${this.distributionData.id}/role`,
       {rid:this.rolevalueID})
       this.distribution=false
       this.news()
       
    },
    //清空选中的角色分配
    closeAll(){
      this.rolevalueID=''
    },

    async switchBut(val) {
      // 文档请求路径为：users/:uId/state/:type，用书面语解决变量,put请求修改数据
      const { data } = await this.$http.put(
        `users/${val.id}/state/${val.mg_state}`,
        {
          params: {
            uId: val.id,
            type: val.mg_state
          }
        }
      )
      if (data.meta.status !== 200) return this.$message.error(data.meta.msg)
      this.news()
      this.$message({ message: data.meta.msg, type: 'success', offset: 100 })
    },
    //获取用户
    async news() {
      const { data: res } = await this.$http.get('users', {
        params: this.newsData
      })
      //判断状态
      if (res.meta.status !== 200) return this.$message.error(data.meta.msg)
      this.userData = res.data.users
      console.log(res)

      //显示总页数
      this.total = Math.ceil(res.data.total / this.newsData.pagesize)
      this.timer(res.data.users)
    }
  }
}
</script>
<style scoped>
.el-form-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-input {
  width: 350px;
  margin: 20px 10px;
}
.el-pagination {
  margin-top: 15px;
}
</style>