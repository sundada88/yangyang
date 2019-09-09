<template>
  <div class="cinema_body">
    <loading v-if="isloading"></loading>
    <Scroller v-else>
      <ul>
        <li
          v-for="item in cinemas"
          :key="item.id"
        >
          <div>
            <span>{{item.nm}})</span>
            <span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
          </div>
          <div class="address">
            <span>{{item.addr}}</span>
            <span>{{item.distance}}</span>
          </div>
          <div class="card">
            <div
              v-for="(num, key) in item.tag"
              :key="key"
              v-if="num === 1"
              :class="key | classCard"
            >
              {{key | formatCard}}
            </div>
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: 'cilist',
  filters: {
    formatCard (key) {
      const card = [
        { key: 'allowRefund', value: '改签' },
        { key: 'endorse', value: '退' },
        { key: 'sell', value: '折扣卡' },
        { key: 'snack', value: '小吃' }
      ]
      for (let i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value
        }
      }
      return ''
    },
    classCard (key) {
      const card = [
        { key: 'allowRefund', value: 'bl' },
        { key: 'endorse', value: 'bl' },
        { key: 'sell', value: 'or' },
        { key: 'snack', value: 'or' }
      ]
      for (let i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value
        }
      }
      return ''
    }
  },
  data () {
    return {
      cinemas: [],
      isloading: true,
      preCity: -1
    }
  },
  methods: {
    getCinemas () {
      if (this.$store.state.city.id === this.preCity) {
        return
      }
      this.isloading = true
      this.$axios.get(`/api/cinemaList?cityId=${this.$store.state.city.id}`).then(res => {
        window.console.log(res)
        const { msg, data: { cinemas } } = res.data
        if (msg === 'ok' && cinemas) {
          this.cinemas = cinemas
          this.isloading = false
          this.preCity = this.$store.state.city.id
        }
      })
    }
  },
  activated () {
    if (this.preCity === -1) {
      return
    }
    this.getCinemas()
  },
  mounted () {
    this.getCinemas()
  }
}
</script>

<style lang="scss" scoped>
.cinema_body {
  flex: 1;
  overflow: auto;
  ul {
    padding: 20px;
    li {
      border-bottom: 1px solid #e6e6e6;
      margin-bottom: 20px;
    }
  }
  div {
    margin-bottom: 10px;
  }
  .q {
    font-size: 11px;
    color: #f03d37;
  }

  .price {
    font-size: 18px;
  }
  .address {
    font-size: 13px;
    color: #666;
    span:nth-of-type(2) {
      float: right;
    }
  }
  .card {
    display: flex;
    div {
      padding: 0 3px;
      height: 15px;
      line-height: 15px;
      border-radius: 2px;
      color: #f90;
      border: 1px solid #f90;
      font-size: 13px;
      margin-right: 5px;
      &.or {
        color: #f90;
        border: 1px solid #f90;
      }
      &.bl {
        color: #589daf;
        border: 1px solid #589daf;
      }
    }
  }
}
</style>
