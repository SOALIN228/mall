# mall

## 学到的知识
1. 设置抛出异常

    ```javascript
    export const getHomeSlider = () => {
      return axios.get('http://www.imooc.com/api/home/slider', {
        timeout: 10000 // 设置超时
      }).then(res => {
        if (res.data.code === SUCC_CODE) {
          return res.data.slider
        }
        throw new Error('没有成功获取到数据!') // 抛出异常
      }).catch(err => { // 捕获异常
        if (err) {
          console.log(err)
        }
    
        return [{ // 返回404
          linkUrl: 'https://www.imooc.com',
          picUrl: require('assets/img/404.png')
        }]
      })
    }
    ```
2.使用 vue-lazyload 懒加载
```javascript
Vue.use(VueLazyload, {
  preLoad: 1, // 完全显示加载
  error: require('assets/img/error.png'), // 失败显示
  loading: require('assets/img/loading.gif'), // 成功显示
  attempt: 1 // 加载次数
})
```

3.使用 jonsp 跨域

4.@click.native="goToSearch"
 
    实现原生的click，而不是组件的click，方便监听
5.使用swiper制作下拉刷新和上拉加载更多
