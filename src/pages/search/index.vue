<template>
  <transition name="search">
    <div class="search">
      <header class="g-header-container">
        <search-header @query="getQuery"/>
      </header>
      <div class="g-content-container">
      </div>
    </div>
  </transition>
</template>

<script>
import SearchHeader from './header'

export default {
  name: 'Search',
  components: {
    SearchHeader
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    getQuery (query) {
      this.query = query
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .search {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $search-z-index;
    background-color: $bgc-theme;
  }

  .search-enter-active,
  .search-leave-active {
    transition: all 0.3s;
  }

  .search-enter,
  .search-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
