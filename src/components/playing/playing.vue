<!--  -->
<template>
  <div class="wrapper">
    <div id="nowplaying">
      <h2 class="title">正在热映</h2>
      <ul class="list clearfix">
        <li class="list-item fl" v-for="(item, index) in playingList" :key="index">
          <div class="poster">
            <img :src="item.poster"/>
          </div>
          <div class="list-title">{{item.title}}</div>
          <div class="list-rate">
            <template v-if="item.score !== 0">
              <el-rate
                :value="(item.score / 2).toFixed(1)"
                disabled
                show-score
                text-color="#ff9900"
                >
              </el-rate>
            </template>
            <template v-else><p class="noscore">暂无评分</p></template>       
          </div> 
          <div class="ticket">
            <a class="ticket-btn" @click.self.stop="buy">选座购票</a>
          </div> 
        </li>
      </ul>
    </div>
  </div>
</template>

<script >
import {playingMovie} from '../../api/index'
export default {
  data () {
     return {
       playingList: [],
     }
  },

  created() {
    this.getPlayingMovies()
  },
  methods: {
    getPlayingMovies() {
      playingMovie().then(r => {
        console.log(r)
        this.playingList = r.data.movies
      })
    },
    buy() {
      this.$notify({
        title: '成功',
        message: '恭喜您，购票成功',
        type: 'success'
      })
    },
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
  width: 200px;
  margin:0 0 25px 25px;
}
.list-item .poster img{
  width: 200px;
  height: 280px;
}
.list-title{
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  height: 24px;
  margin-top: 5px;
  line-height: 24px;  
}
.list-rate{
  text-align: center;
  padding: 5px 0;
  height: 30px;
  box-sizing: border-box;
  position: relative;
}
.list-rate p.noscore{
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
.ticket{
  text-align: center;
  margin-top: 10px;
}
.ticket-btn{
  display: inline-block;
  height: 40px; 
  line-height: 40px;
  width: 150px; 
  background: green; 
	box-shadow: 0 0 10px gray;
	cursor: pointer;
	transition: all .3s;
  border-radius: 50px;
  color: rgba(255,255,255,0.8);
  
}
.ticket-btn:visited{
  box-shadow: 0 0 0px gray; transform: scale(0.99)
}
</style>