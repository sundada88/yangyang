<template>
  <div
    class="movie_body"
    ref="movie_body"
  >
    <Scroller
      @handleToScroll="handleToScroll"
      @handleToScrollEnd="handleToScrollEnd"
    >
      <ul>
        <li class="pullDown">{{pullDownMsg}}</li>
        <transition-group
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
        >
          <li
            v-for="(item, index) in movieList"
            :key="index"
            :data-delay=index*50
            data-y="100%"
            hoverclass="hoverclass"
          >
            <div
              class="pic_show"
              @tap="handleToDetail(item.id)"
            >
              <img :src="item.img | setWH('128.180')">
            </div>
            <div class="info_list">
              <h2 @tap="handleToDetail(item.id)">{{item.nm}}
                <img
                  v-if="item.version"
                  src="@/assets/maxs.png"
                  alt=""
                ></h2>
              <p>观众评分：<span class="grade">{{item.sc}}</span></p>
              <p>主演：{{item.star}}</p>
              <p>{{item.showInfo}}</p>
            </div>
            <div class="btn_mall">
              购票
            </div>
          </li>
        </transition-group>
      </ul>
    </Scroller>
  </div>
</template>

<script>
// import Bscroll from 'better-scroll'
export default {
  name: 'nowplaying',
  data () {
    return {
      movieList: [],
      pullDownMsg: '',
      // isLoading: true,
      preCity: -1 // 用来判断是否在activted的时候记性再次axios请求
    }
  },
  methods: {
    beforeEnter (dom) {
      let { x = 0, y = 0, opacity = 0 } = dom.dataset
      dom.style.cssText = `
        transition: transform 300ms;opacity: ${opacity};transform: translate(${x}, ${y}) scale(1);
      `
    },
    enter (dom, done) {
      let { delay } = dom.dataset
      setTimeout(() => {
        dom.style.cssText = `
          transition: transfor, 300ms;opacity: 1;transform" translate(0, 0) scale(1);
        `
        let transition = window.ontransitionend ? 'transitionend' : 'webkitTransition'
        dom.addEventListener(transition, function onEnd () {
          dom.removeEventListener(transition, onEnd)
          done()
        })
      }, delay)
    },
    afterEnter (dom) {
      dom.style.cssText = ''
    },
    handleToDetail (movieId) {
      this.$router.push(`/movie/detail/1/${movieId}`)
    },
    handleToScroll (pos) {
      if (pos.y > 30) {
        this.pullDownMsg = '正在更新中'
      }
    },
    handleToScrollEnd (pos) {
      if (pos.y > 30) {
        this.$axios.get(`/api/movieOnInfoList?cityId=${this.$store.state.city.id}`).then(res => {
          var { msg } = res.data
          if (msg === 'ok') {
            this.pullDownMsg = '更新成功'
            setTimeout(() => {
              this.movieList = res.data.data.movieList
              this.pullDownMsg = ''
            }, 1000)
          }
        })
      }
    },
    getMovieList () {
      if (this.$store.state.city.id === this.preCity) { return }
      // this.isLoading = true
      this.$axios.get(`/api/movieOnInfoList?cityId=${this.$store.state.city.id}`).then(res => {
        const { msg } = res.data
        if (msg === 'ok') {
          this.movieList = res.data.data.movieList
          // this.isLoading = false
          this.preCity = this.$store.state.city.id
        }
      })
    }
  },
  activated () {
    if (this.preCity === -1) {
      return
    }
    this.getMovieList()
  },
  mounted () {
    // this.$axios.get('/nodeApi', (res) => {
    //   window.console.log(res)
    // })
    this.getMovieList()
  }
}
</script>

<style lang="scss" scoped>
#content {
  .movie_body {
    flex: 1;
    overflow: auto;
    ul {
      overflow: hidden;
      .hoverclass {
        background: rgba(106, 182, 252, 0.1) !important;
      }
      li {
        padding: 0 12px;
        padding-top: 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px #e6e6e6 solid;
        padding-bottom: 10px;
      }
    }
    .pic_show {
      width: 64px;
      height: 90px;
      img {
        width: 100%;
      }
    }
    .info_list {
      margin-left: 10px;
      flex: 1;
      position: relative;
      h2 {
        font-size: 17px;
        line-height: 24px;
        width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p {
        font-size: 13px;
        color: #666;
        line-height: 22px;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .grade {
        font-weight: 700;
        color: #faaf00;
        font-size: 15px;
      }
      img {
        width: 50px;
        position: absolute;
        right: 10px;
        top: 5px;
      }
    }
    .btn_mall,
    .btn_pre {
      width: 47px;
      height: 27px;
      line-height: 28px;
      text-align: center;
      background-color: #f03d37;
      color: #fff;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
    }
    .btn_pre {
      background-color: #3c9fe6;
    }
    .pullDown {
      margin: 0;
      padding: 0;
      border: none;
      text-align: center;
      display: block;
    }
  }
}
</style>
