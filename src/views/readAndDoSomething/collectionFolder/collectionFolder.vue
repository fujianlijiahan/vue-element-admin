<template>
  <div>
    <el-select v-model="value" placeholder="请选择" @change="getValue">
      <!--<el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>-->
      <el-option label="不公开" value="0">不公开</el-option>
      <el-option label="完全公开" value="1">完全公开</el-option>
      <el-option label="仅公开标题" value="2">仅公开标题</el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: "collectionFolder",
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods: {
      getValue() {
        console.log(this.value)
      }
    }
  }
</script>

<style scoped>

</style>
