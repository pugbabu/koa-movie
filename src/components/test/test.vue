<!--  -->
<template>
  <div class="wrapper">
    <div id="home">
      <ul class="list clearfix">
        <li class="list-item fl" v-for="(item, index) in movieList" :key="index">
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
import {allMovies} from '../../api/index.js'
export default {
  data () {
     return {
       movieList: []
     }
  },
  created() {
    this.getMovie()
  },
  methods: {
    getMovie() {
      allMovies().then(r => {
        console.log(r)
        this.movieList = r.data.movies
      })
    }
  }
 }
</script>

<style scoped>

.list{
  padding: 20px 0;
}
.list-item{
  margin:0 0 25px 25px;
  color: rgba(255,255,255,0.8);
  /* box-shadow: 0 2px 2px #222222; */
  border: 2px solid transparent;
	border-radius: 5px;
	/* filter: brightness(.8); */
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