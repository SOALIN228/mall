<template>
  <swiper :options="swiperOption" ref='swiper'>
<!--    <div class="mine-scroll-pull-down" v-if="pullDown">-->
<!--      <me-loading :text="pullDownText" inline ref="pullDownLoading"></me-loading>-->
<!--    </div>-->
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import MeLoading from 'base/loading'

export default {
  name: 'MeScroll',
  components: {
    swiper,
    swiperSlide
    // MeLoading
  },
  props: {
    scrollbar: {
      type: Boolean,
      default: true
    },
    data: {
      type: [Array, Object]
    },
    pullDown: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // pulling: false,
      // pullDownText: PULL_DOWN_TEXT_INIT,
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 'auto', // 一页显示的图片
        freeMode: true, // 自由模式，随便滚，不用一页一页的
        setWrapperSize: true, // 将高度添加到标签上
        scrollbar: {
          el: this.scrollbar ? '.swiper-scrollbar' : null,
          hide: true // 自动隐藏
        },
        on: {
          sliderMove: this.scroll,
          touchEnd: this.touchEnd
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .swiper-container {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    height: auto;
  }
</style>
