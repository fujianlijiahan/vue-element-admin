<template>
  <div style="padding-left: 50px;width: 60%;">
    <el-form ref="form" :model="form" label-width="250px">
      <el-form-item label="首页显示条数">
        <el-input v-model="form.recordCount"></el-input>
      </el-form-item>
      <el-form-item label="公文公开类型">
        <el-select v-model="form.isArchives" placeholder="请选择">
          <el-option label="不公开" value="0"></el-option>
          <el-option label="完全公开" value="1"></el-option>
          <el-option label="仅公开标题" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <small>不公开：只有经手人可查看。<br>
          完全公开：单位所有成员查看。<br>
          仅公开标题：未经手人员只能查看文件标题。
        </small>
      </el-form-item>

      <el-form-item label="首页是否显示数量为0的栏目">
        <el-switch v-model="form.isShowZero"></el-switch>
        <small></small>
      </el-form-item>
      <el-form-item label="是否公开开发文档案">
        <el-switch v-model="form.isPublic"></el-switch>
        <small></small>
      </el-form-item>
      <el-form-item label="是否允许分发">
        <el-switch v-model="form.isAllowFF"></el-switch>
        <small></small>
      </el-form-item>
      <el-form-item label="默认显示签批意见">
        <el-switch v-model="form.defaultShowSign"></el-switch>
        <small></small>
      </el-form-item>


      <el-form-item label="首页列表排序">
        <el-radio-group v-model="form.topPageListOrderBy">
          <el-radio label="0">按时间顺序</el-radio>
          <el-radio label="1">按时间倒序</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { get, post, del, put } from '@/utils/requestOfSystemManager'

  export default {
    name: 'systemSet',
    data() {
      return {
        form: {
          id: '',
          recordCount: '',
          isArchives: '0',
          isShowZero: true,
          isPublic: true,
          isAllowFF: true,
          defaultShowSign: true,
          topPageListOrderBy: '1'
        }
      }
    },
    created() {
      this.getConfig()
    },
    methods: {
      getConfig() {
        get('/InterfaceConfig/GetInterfaceConfig', {
          DeptId: localStorage.getItem('deptId')
        }).then(response => {
          console.log(response)
          this.form = response.data.data
        }).catch(err => {
          console.log(err)
        })
      },
      onSubmit() {
        console.log('submit!')
        console.log(this.form)
        this.form.deptId = localStorage.getItem('deptId')
        put('/InterfaceConfig/SaveInterfaceConfig', this.form).then(response => {
          console.log(response)
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
