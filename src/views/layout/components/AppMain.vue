<template>
  <section class="app-main" style="padding:10px 10px 0 10px;background-color: #f2f6f9;">
    <div style="background-color: #fff;padding: 10px;min-height: 650px; ">
      <transition name="fade" mode="out-in">
        <!-- <router-view :key="key"></router-view> -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>

      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
