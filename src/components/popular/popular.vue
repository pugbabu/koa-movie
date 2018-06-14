<!--  -->
<template>
  <div class="wrapper">
    <div id="popular">
      <h2 class="title">最新热门电影</h2>
      <ul class="list clearfix">
        <li class="list-item fl" v-for="(item, index) in popularList" :key="index">
          <div class="poster">
            <img :src="item.poster"/>                        
          </div>
          <div class="intro clearfix">
            <div class="name fl">{{item.title}}</div>
            <div class="score fr">{{item.score}}分</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {popularMovie} from '../../api/index'
export default {
  data () {
     return {
       popularList: []
     }
  },
  created() {
    this.getPopularMovies()
  },
  methods: {
    getPopularMovies() {
      popularMovie().then(r => {
        console.log(r)
        this.popularList = r.data.movies
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
  color: rgba(255,255,255,0.8);
  /* box-shadow: 0 2px 2px #222222; */
  border: 2px solid transparent;
	border-radius: 5px;
	filter: brightness(.8);
  transition: all .2s;
  cursor: pointer;    
  
  
}
.list-item:hover{
  box-shadow: 0 0 30px yellow;
	border: 2px solid yellow;
	transform: translate(0,-10%);
	filter: brightness(1);
}
.list-item .poster img{
  width: 180px;
  height: 252px;
}
.intro{
  height: 40px;
  line-height: 40px;
}
.intro .name{
  width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
}
.intro .score{
  color: #ff6428;
  font-size: 14px;
}
</style>