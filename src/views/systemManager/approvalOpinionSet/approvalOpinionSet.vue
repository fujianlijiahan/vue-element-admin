<template>
  <div>
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-radio-group v-model="radio" size="small" @change="getList()">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="收文">收文</el-radio-button>
            <el-radio-button label="发文">发文</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="8" align="right">
          <el-button type="primary" size="small" @click="addOrEdit()">新增</el-button>
          <el-button size="small" @click="deleteList()">删除</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="mindType"
        label="类别"
        width="120">
      </el-table-column>
      <el-table-column
        prop="menuName"
        label="预设审批意见"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="orderId"
        label="排序号"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        show-overflow-tooltip
        width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="addOrEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="margin-top: 10px;" align="right" v-show="total">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--新增编辑-->
    <el-dialog :title="theTitle" :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
      <el-form :model="myForm"
               ref="myForm"
               label-position="left"
               label-width="120px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="审批意见"
                      prop="menuName"
                      :rules="{ required: true, message: '请输入', trigger: 'blur' }">
          <el-input v-model="myForm.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="类别"-->
        <!--prop="mindType"-->
        <!--:rules="{ required: true, message: '请输入', trigger: 'blur' }">-->
        <!--<el-input v-model="myForm.mindType" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="类别"
                      prop="mindType"
                      :rules="{ required: true }">
          <el-select v-model="myForm.mindType" placeholder="请选择" style="width: 100%">
            <el-option label="发文" value="发文"></el-option>
            <el-option label="收文" value="收文"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序号"
                      prop="orderId"
                      :rules="[
                      { type: 'number', message: '必须输入数字'}]">
          <el-input v-model.number="myForm.orderId" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('myForm')" :disabled="saveDisabled">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { get, post, del, put } from '@/utils/requestOfSystemManager'

  export default {
    name: 'approvalOpinionSet',
    data() {
      return {
        saveDisabled: false,
        loading: true,
        pageSize: Number(localStorage.getItem('pageSize')),
        dialogFormVisible: false,
        myForm: {
          id: '',
          deptId: localStorage.getItem('deptId'),
          menuName: '',
          mindType: '',
          deptUser: localStorage.getItem('personDeparts'),
          userId: localStorage.getItem('userId'),
          orderId: 10
        },
        formLabelWidth: '120px',
        theTitle: '新增',
        radio: '',
        tableData: [],
        total: null,
        currentPage: 1,
        multipleSelection: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val
        this.getList()
      },
      deleteList() {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del('/LeadMind/DeleteLeadMind', this.multipleSelection).then(response => {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(err => {
            console.log(err)
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        })
      },
      getList(page) {
        get('/LeadMind/GetLeadMindList', {
          PageSize: this.pageSize || 10,
          DeptUser: localStorage.getItem('personDeparts'),
          Page: page || 1,
          DeptId: localStorage.getItem('deptId')
        }).then(response => {
          console.log(response)
          this.tableData = response.data.data.dataList
          this.currentPage = response.data.data.pageIndex
          this.total = response.data.data.dataCount
          this.loading = false
        }).catch(err => {
          this.loading = false
          console.log(err)
        })
      },
      addOrEdit(row) {
        this.dialogFormVisible = true
        if (row) {
          this.theTitle = '编辑'
          this.myForm.id = row.id
          this.getMyForm()
        } else {
          this.theTitle = '新增'
          this.myForm = {
            deptId: localStorage.getItem('deptId'),
            menuName: '',
            mindType: '',
            deptUser: localStorage.getItem('personDeparts'),
            userId: localStorage.getItem('userId'),
            orderId: 10
          }
        }
      },
      getMyForm() {
        get('/LeadMind/GetLeadMind', {
          id: this.myForm.id
        }).then(response => {
          console.log(response)
          this.myForm.menuName = response.data.data.menuName
          this.myForm.mindType = response.data.data.mindType
        }).catch(err => {
          console.log(err)
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveDisabled = true
            // 需要验证的输入框验证通过后才能到这一步
            if (!this.myForm.id) {
              post('/LeadMind/AddLeadMind', this.myForm).then(response => {
                this.getList()
                this.$message({
                  type: 'success',
                  message: '新增成功!'
                })
                this.dialogFormVisible = false
                this.saveDisabled = false
              }).catch(err => {
                this.saveDisabled = false
                console.log(err)
              })
            } else {
              put('/LeadMind/EditLeadMind', this.myForm).then(response => {
                this.getList(this.currentPage)
                this.$message({
                  type: 'success',
                  message: '更新成功!'
                })
                this.dialogFormVisible = false
                this.saveDisabled = false
              }).catch(err => {
                this.saveDisabled = false
                console.log(err)
              })
            }
          }
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getList(val)
      },
      handleSelectionChange(val) {
        const valArr = []
        val.forEach(v => {
          valArr.push(v.id)
        })
        this.multipleSelection = valArr
      }
    }
  }
</script>

<style scoped>

</style>
