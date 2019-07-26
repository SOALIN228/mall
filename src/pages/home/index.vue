<template>
  <div class="home">
    <header class="g-header-container">
      <home-header :class="{'header-transition': isHeaderTransition}" ref="header"></home-header>
    </header>
    <me-scroll :data="recommends"
               :scrollbar="false"
               pullDown
               pullUp
               @pull-down="pullToRefresh"
               @pull-up="pullToLoadMore"
               @scroll-end="scrollEnd"
               @scroll="scroll"
               @pull-down-transition-end="pullDownTransitionEnd"
               ref="scroll"
    >
      <home-slider ref="slider"></home-slider>
      <home-nav></home-nav>
      <home-recommend @loading="getRecommends" ref="recommend"></home-recommend>
    </me-scroll>
    <div class="g-backtop-container">
      <me-backtop :visible="isBacktopVisible" @backtop="backToTop"/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import MeScroll from 'base/scroll'
import MeBacktop from 'base/backtop'
import HomeHeader from './header'
import HomeSlider from './slider'
import HomeNav from './nav'
import HomeRecommend from './recommend'
import {HEADER_TRANSITION_HEIGHT} from './config'

export default {
  name: 'Home',
  components: {
    MeScroll,
    MeBacktop,
    HomeHeader,
    HomeSlider,
    HomeNav,
    HomeRecommend
  },
  data () {
    return {
      recommends: [],
      isBacktopVisible: false,
      isHeaderTransition: false
    }
  },
  methods: {
    getRecommends (recommends) {
      this.recommends = recommends
    },
    pullToRefresh (end) { // 更新轮播
      this.$refs.slider.update().then(end)
    },
    pullToLoadMore (end) { // 加载更多
      this.$refs.recommend.update().then(end).catch(err => {
        if (err) {
          console.log(err)
        }
        end()
      })
    },
    scrollEnd (translate, scroll, pulling) { // 是否显示header颜色
      if (!pulling) {
        this.changeHeaderStatus(translate)
      }
      this.isBacktopVisible = translate < 0 && -translate > scroll.height
    },
    scroll (translate) {
      this.changeHeaderStatus(translate)
    },
    backToTop () {
      this.$refs.scroll && this.$refs.scroll.scrollToTop()
    },
    pullDownTransitionEnd () { // 刷新结束显示header
      this.$refs.header.show()
    },
    changeHeaderStatus (translate) { // 控制滚动时header状态
      if (translate > 0) { // 上拉
        this.$refs.header.hide()
        return
      }

      this.$refs.header.show()
      this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .home {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }
</style>
