<!--  -->
<template>
  <div class="wrapper">
    <div id="showing-soon">
      <h2 class="title">即将上映</h2>
      <ul class="list clearfix">
        <li class="fl list-item clearfix" v-for="(item, index) in comingList" :key="index">
          <div class="poster fl">
            <img :src="item.poster"/>            
          </div>
          <div class="fl intro">
            <h3>{{item.title}}</h3>
            <ul>
              <li v-for="(val, i) in item.pubdate" :key="i" v-if="val.country === '中国大陆'">
                {{val.date}}
              </li>
              <li>{{item.movieTypes | handelType}}</li>
              <li>{{item.country}}</li>
              <li class="last">{{item.wishCount}}人想看</l>
              <li>
                <a :href="item.trailerUrl" target="_blank">预告片<i class="el-icon-view view-icon"></i></a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {comingMovie} from '../../api/index'
export default {
  data () {
     return {
       comingList: []
     }
  },
  created() {
    this.getComingMovies()
  },
  filters: {
    handelType(val) {
      if (Array.isArray(val)) {
        return val.join('/')
      }
    }
  },
  methods: {
    getComingMovies() {
      comingMovie().then(r => {
        console.log(r)
        this.comingList = r.data.movies
      })
    }
  }
 }
</script>

<style scoped>
.title{
  height: 40px;
  border: 3px solid transparent;
  border-image: linear-gradient(45deg,red,blue) 10%;
  color: rgba(255,255,255,0.8);
  line-height: 40px;
  text-indent: 1em;
  font-size: 16px;
}
.list{
  padding: 20px 0;
}
.list-item{
  margin:0 0 25px 25px;
}
.list-item .poster img{
  width: 150px;
  height: 210px;
}
.intro{
  padding: 10px 0;
  width: 200px;
  margin-left: 20px;
  color: rgba(255,255,255,0.8);
  
}
.intro h3{
  font-size: 15px;
  height: 27px;
  line-height: 27px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: bold;
  margin-bottom: 10px;
}
.intro ul li{
  height: 20px;
  line-height: 20px;
  font-size: 14px;
}
.intro ul li.last{
  margin-bottom: 10px;
}
.view-icon{
  font-size: 24px;
  margin-left: 10px;
  transform: translateY(3px);
}
</style>