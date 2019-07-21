<template>
  <div class="home">
    <header class="g-header-container">
      <home-header></home-header>
    </header>
    <me-scroll :data="recommends"
               pullDown
               pullUp
               @pull-down="pullToRefresh"
               @pull-up="pullToLoadMore"
    >
      <home-slider ref="slider"></home-slider>
      <home-nav></home-nav>
      <home-recommend @loading="getRecommends" ref="recommend"></home-recommend>
    </me-scroll>
    <div class="g-backtop-container"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import MeScroll from 'base/scroll'
import HomeHeader from './header'
import HomeSlider from './slider'
import HomeNav from './nav'
import HomeRecommend from './recommend'

export default {
  name: 'Home',
  components: {
    MeScroll,
    HomeHeader,
    HomeSlider,
    HomeNav,
    HomeRecommend
  },
  data () {
    return {
      recommends: []
    }
  },
  methods: {
    getRecommends (recommends) {
      this.recommends = recommends
    },
    pullToRefresh (end) {
      this.$refs.slider.update().then(end)
    },
    pullToLoadMore (end) {
      this.$refs.recommend.update().then(end).catch(err => {
        if (err) {
          console.log(err)
        }
        end()
      })
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
