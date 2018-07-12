<template>
  <div>
    <div style="margin-bottom: 50px;">
      <form-manager></form-manager>
    </div>

    <div>
      <flow-manager></flow-manager>
    </div>
  </div>
</template>

<script>
  import flowManager from '@/views/systemManager/flowManager/flowManager'
  import formManager from '@/views/systemManager/formManager/formManager'

  export default {
    name: 'flowAndFormManager',
    components: { flowManager, formManager }
  }
</script>

<style scoped>

</style>
