<template>
  <div>
    网上办公1
    <div>{{name}}</div>
  </div>
</template>

<script>
  export default {
    name: 'internetOa',
    data() {
      return {
        name: 'internetOa'
      }
    },
    created() {
      this.thisName()
    },
    methods: {
      thisName() {
        console.log('来自网上办公的打印')
      }
    }
  }
</script>

<style scoped>

</style>
