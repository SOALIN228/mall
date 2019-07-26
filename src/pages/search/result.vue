<template>
  <div class="result">
    <div class="loading-container" v-show="loading">
      <me-loading></me-loading>
    </div>
    <ul class="g-list" v-show="!loading && results.length">
      <li class="g-list-item"
          v-for="(item, index) in results"
          :key="index"
          @click="$_search_selectItem(item[0])"
      >
        <span class="g-list-text">{{item[0]}}</span>
      </li>
    </ul>
    <div class="no-result" v-show="!loading && !results.length">没有结果</div>
  </div>
</template>

<script>
import MeLoading from 'base/loading'
import {getSearchResult} from 'api/search'
import {searchMixin} from 'assets/js/mixins'

export default {
  name: 'SearchResult',
  components: {
    MeLoading
  },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      results: [],
      loading: true
    }
  },
  mixins: [searchMixin],
  methods: {
    getResults (keyword) {
      if (!keyword) {
        return
      }

      this.loading = true
      getSearchResult(keyword).then(data => {
        if (data) {
          this.results = data
          this.loading = false
        }
      })
    }
  },
  watch: {
    query (query) {
      this.getResults(query)
    }
  }
}
</script>

<style lang="scss" scoped>
  .result {
    background-color: #fff;
  }

  .loading-container {
    height: 100px;
  }

  .no-result {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
