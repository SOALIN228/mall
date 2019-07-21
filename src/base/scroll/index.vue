<template>
  <swiper :options="swiperOption" ref='swiper'>
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <me-loading :text="pullDownText" inline ref="pullDownLoading"></me-loading>
    </div>
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import MeLoading from 'base/loading'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import {
  PULL_DOWN_HEIGHT,
  PULL_DOWN_TEXT_INIT,
  PULL_DOWN_TEXT_START,
  PULL_DOWN_TEXT_ING,
  PULL_DOWN_TEXT_END
} from './config'

export default {
  name: 'MeScroll',
  components: {
    swiper,
    swiperSlide,
    MeLoading
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
      pulling: false,
      pullDownText: PULL_DOWN_TEXT_INIT,
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
  },
  methods: {
    update () {
      this.$refs.swiper && this.$refs.swiper.swiper.update()
    },
    scroll () {
      if (this.pulling) {
        return
      }

      const swiper = this.$refs.swiper.swiper

      if (swiper.translate > 0) { // 下拉
        if (!this.pullDown) {
          return
        }
        if (swiper.translate > PULL_DOWN_HEIGHT) {
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START)
        } else {
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT)
        }
      }
    },
    touchEnd () {
      if (this.pulling) {
        return
      }

      const swiper = this.$refs.swiper.swiper

      if (swiper.translate > 0) {
        if (!this.pullDown) {
          return
        }

        this.pulling = true
        swiper.allowTouchMove = false// 禁止触摸
        swiper.setTransition(swiper.params.speed) // 设置速度
        swiper.setTranslate(PULL_DOWN_HEIGHT) // 回到设定的高度
        swiper.params.virtualTranslate = true // 定住不给回弹
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING)
        this.$emit('pull-down', this.pullDownEnd)// 触发一个事件
      }
    },
    pullDownEnd () { // 下拉结束还原设置
      const swiper = this.$refs.swiper.swiper

      this.pulling = false
      this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END)
      swiper.params.virtualTranslate = false
      swiper.allowTouchMove = true
      swiper.setTransition(swiper.params.speed)
      swiper.setTranslate(0)
    }
  },
  watch: {
    data () {
      this.update()
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

  .mine-scroll-pull-down {
    position: absolute;
    left: 0;
    bottom: 100%;
    width: 100%;
    height: 80px;
  }
</style>
