<template>
  <me-nav-bar class="header" v-show="visible">
    <i class="iconfont" slot="left">&#xe609;</i>
    <div slot="center">搜索框</div>
    <i class="iconfont" slot="right">&#xe603;</i>
  </me-nav-bar>
</template>

<script>
import MeNavBar from 'base/navbar'

export default {
  name: 'HomeHeader',
  components: {
    MeNavBar
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .header {
    &.mine-navbar {
      background-color: transparent;
      transition: background-color 0.5s;
    }

    &.header-transition {
      background-color: $header-bgc-translucent;
    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>
