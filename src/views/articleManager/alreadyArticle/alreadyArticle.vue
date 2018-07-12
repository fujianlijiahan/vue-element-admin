<template>
  <div>
    <div class="filter-container">
      <el-row :gutter="20">
          <el-form inline style="margin-left: 10px;">
            <el-form-item>
              <el-select v-model="listQuery.DocTitle" placeholder="搜索类型" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输关键字" v-model="listQuery.DocNumber" size="small">
              </el-input>
            </el-form-item>
            <el-form-item>
              <div class="block">
                <el-date-picker
                  clear-icon="el-icon-circle-close"
                  size="small"
                  value-format="yyyy-MM-dd"
                  v-model="listQuery.BeginDate"
                  type="date"
                  placeholder="选择开始日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="block">
                <el-date-picker
                  clear-icon="el-icon-circle-close"
                  size="small"
                  value-format="yyyy-MM-dd"
                  v-model="listQuery.EndDate"
                  type="date"
                  placeholder="选择结束日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button size="small" @click="getList()">查询</el-button>
            </el-form-item>
          </el-form>
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
        prop="type"
        label="表单"
        width="120">
      </el-table-column>
      <el-table-column
        prop="dbTable"
        label="文件主题(点击可查看文件正文)"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="number"
        label="字号"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="orderId"
        label="当前状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="orderId"
        label="办理人"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="orderId"
        label="成文时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="orderId"
        label="审批记录"
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
        <el-form-item label="文号前缀"
                      prop="type"
                      :rules="{ required: true, message: '请输入', trigger: 'blur' }">
          <el-input v-model="myForm.type" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="公文类别"-->
        <!--prop="dbTable"-->
        <!--:rules="{ required: true, message: '请输入', trigger: 'blur' }">-->
        <!--<el-input v-model="myForm.dbTable" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="公文类别"
                      prop="dbTable"
                      :rules="{ required: true }">
          <el-select v-model="myForm.dbTable" placeholder="请选择" style="width: 100%">
            <el-option label="发文" value="发文"></el-option>
            <el-option label="收文" value="收文"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最新文号"
                      prop="number"
                      :rules="[{ required: true, message: '请输入', trigger: 'blur' },
                      { type: 'number', message: '必须输入数字'}]">
          <el-input v-model.number="myForm.number" auto-complete="off"></el-input>
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
        <el-button type="primary" @click="submitForm('myForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { get, post, del, put } from '@/utils/requestOfSystemManager'

  export default {
    name: 'alreadyArticle',
    data() {
      return {
        options: [
          {
            value: '1',
            label: '按标题'
          }, {
            value: '2',
            label: '按文号'
          }
        ],
        listQuery: {
          DocTitle: '', // 下拉框
          DocNumber: '', // 输入框
          BeginDate: '', // 开始时间
          EndDate: '', // 结束时间
          IntIsAdmin: 0, // 文书管理员1,其他0
          FullUserName: localStorage.getItem('personDeparts'), // 用户名全称
          Page: 1,
          DeptId: localStorage.getItem('deptId'),
          PageSize: Number(localStorage.getItem('pageSize')) || 10
        },
        loading: true,
        pageSize: Number(localStorage.getItem('pageSize')),
        dialogFormVisible: false,
        myForm: {
          deptId: localStorage.getItem('deptId'),
          id: '',
          dbTable: '',
          type: '',
          number: null,
          orderId: 10,
          userId: localStorage.getItem('userId')
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
          del('/FileGroup/DeleteFileGroup', this.multipleSelection).then(response => {
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
        this.listQuery.Page = page || 1
        get('/Doc/GetHaveSentDoc', this.listQuery).then(response => {
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
            dbTable: '',
            type: '',
            number: null,
            orderId: 10,
            userId: localStorage.getItem('userId')
          }
        }
      },
      getMyForm() {
        get('/FileGroup/GetFileGroup', {
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
            // 需要验证的输入框验证通过后才能到这一步
            if (!this.myForm.id) {
              post('/FileGroup/AddFileGroup', this.myForm).then(response => {
                this.getList()
                this.$message({
                  type: 'success',
                  message: '新增成功!'
                })
                this.dialogFormVisible = false
              }).catch(err => {
                console.log(err)
              })
            } else {
              put('/FileGroup/EditFileGroup', this.myForm).then(response => {
                this.getList(this.currentPage)
                this.$message({
                  type: 'success',
                  message: '更新成功!'
                })
                this.dialogFormVisible = false
              }).catch(err => {
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
