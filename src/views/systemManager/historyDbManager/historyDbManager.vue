<template>
  <div>
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="24" align="right">
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
        prop="dbName"
        label="数据库名称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="dbTitle"
        label="数据库描述"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="orderId"
        label="排序"
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
        <el-form-item label="数据库名称"
                      prop="dbName"
                      :rules="{ required: true, message: '请输入', trigger: 'blur' }">
          <el-input v-model="myForm.formName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序"
                      prop="orderId"
        >
          <el-input v-model="myForm.orderId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据库描述">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="myForm.dbTitle">
          </el-input>
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
    name: 'historyDbManager',
    data() {
      return {
        saveDisabled: false,
        loading: true,
        pageSize: Number(localStorage.getItem('pageSize')),
        dialogFormVisible: false,
        myForm: {
          deptId: localStorage.getItem('deptId'),
          id: '',
          dbName: '',
          dbTitle: '',
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
          del('/HistoryDb/DeleteHistoryDb', this.multipleSelection).then(response => {
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
        get('/HistoryDb/GetHistoryDbList', {
          userId: localStorage.getItem('userId'),
          PageSize: this.pageSize || 10,
          Page: page || 1,
          DeptId: localStorage.getItem('deptId')
        }).then(response => {
          console.log(response)
          this.tableData = response.data.data.dataList
          this.currentPage = response.data.data.pageIndex
          this.total = response.data.data.dataCount
          this.pageSize = response.data.data.pageSize
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
            id: '',
            dbName: '',
            dbTitle: '',
            userId: localStorage.getItem('userId'),
            orderId: 10
          }
        }
      },
      getMyForm() {
        get('/HistoryDb/GetHistoryDb', {
          id: this.myForm.id
        }).then(response => {
          this.myForm = response.data.data
          this.myForm.userId = localStorage.getItem('userId')
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
              post('/HistoryDb/AddHistoryDb', this.myForm).then(response => {
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
              put('/HistoryDb/EditHistoryDb', this.myForm).then(response => {
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
