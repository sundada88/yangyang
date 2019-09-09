<template>
  <div class="city_body">
    <div class="city_list">
      <loading v-if="isloading"></loading>
      <Scroller
        v-else
        ref="scroller"
      >
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li
                v-for="(item, index) in hotCity"
                :key="index"
                @tap="changeCity(item)"
              >{{item.nm}}</li>
            </ul>
          </div>
          <div
            class="city_sort"
            ref='city_sort'
          >
            <div
              v-for="(items, index) in cityList"
              :key="index"
            >
              <h2>{{items.index}}</h2>
              <ul>
                <li
                  v-for="item in items.list"
                  :key="item.nm"
                  @tap="changeCity(item)"
                >{{item.nm}}</li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>

    </div>

    <div class="city_index">
      <ul>
        <li
          v-for="(items, index) in cityList"
          :key="index"
          @touchstart="handleIndex(index)"
        >{{items.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'city',
  data () {
    return {
      cityList: [],
      hotCity: [],
      isloading: true
    }
  },
  methods: {
    // 改变城市
    changeCity (city) {
      this.$store.commit('city/CITY_INFO', city)
      this.$router.push('movie/nowplaying')
      window.localStorage.setItem('cityName', city.nm)
      window.localStorage.setItem('cityId', city.id)
    },
    //  判断是否已经在城市列表中
    isHere (firstLetter, list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].index === firstLetter) {
          return false
        }
      }
      return true
    },
    // 获取城市列表
    getCities (cities) {
      const cityList = []
      // 热门城市列表
      const hotCity = []
      cities.forEach(city => {
        if (city.isHot === 1) {
          hotCity.push(city)
        }
        if (this.isHere(city.py.slice(0, 1).toUpperCase(), cityList)) {
          cityList.push({
            index: city.py.slice(0, 1).toUpperCase(),
            list: [{ ...city }]
          })
        } else {
          cityList.forEach(item => {
            if (item.index === city.py.slice(0, 1).toUpperCase()) {
              item.list.push(city)
            }
          })
        }
      })
      cityList.sort((item1, item2) => {
        if (item1.index < item2.index) {
          return -1
        }
      })
      return {
        hotCity,
        cityList
      }
    },
    // 根据索引跳转
    handleIndex (index) {
      let h2 = this.$refs.city_sort.getElementsByTagName('h2')
      // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
      this.$refs.scroller.toScrollTop(-h2[index].offsetTop)
    }
  },
  mounted () {
    if (window.localStorage.getItem('cityList') && window.localStorage.getItem('hotCity')) {
      this.cityList = JSON.parse(window.localStorage.getItem('cityList'))
      this.hotCity = JSON.parse(window.localStorage.getItem('hotCity'))
      this.isloading = false
    } else {
      this.$axios.get('/api/cityList').then(res => {
        const { data: { msg } } = res
        if (msg === 'ok') {
          this.isloading = false
          const { data: { data: { cities } } } = res
          // 城市列表
          this.cityList = this.getCities(cities).cityList
          // 热门城市
          this.hotCity = this.getCities(cities).hotCity
          window.localStorage.setItem('cityList', JSON.stringify(this.cityList))
          window.localStorage.setItem('hotCity', JSON.stringify(this.hotCity))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#content {
  .city_body {
    margin-top: 45px;
    display: flex;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    .city_list {
      flex: 1;
      overflow: auto;
      background: #fff5f0;
      &::-webkit-scrollbar {
        background-color: transparent;
        width: 0;
      }
    }
    .city_hot {
      margin-top: 20px;
      h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #f0f0f0;
        font-weight: normal;
      }
      ul li {
        float: left;
        background: #fff;
        width: 29%;
        height: 33px;
        margin-top: 15px;
        margin-left: 3%;
        padding: 0 4px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
        box-sizing: border-box;
      }
    }
    .city_sort {
      div {
        margin-top: 20px;
      }
      h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #f0f0f0;
        font-weight: normal;
      }
      ul {
        padding-left: 10px;
        margin-top: 10px;
        li {
          line-height: 30px;
          line-height: 30px;
        }
      }
    }
    .city_index {
      width: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      border-left: 1px #e6e6e6 solid;
      font-size: 12px;
    }
  }
}
</style>
