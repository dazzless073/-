axios.defaults.baseURL = 'http://localhost:3000';
var app = new Vue({
    el: ".main",
    data: {
      // 查询关键字
      query: "",
      // 歌曲数组
      musicList: [],
      // 歌曲地址
      musicUrl: "",
      // 歌曲封面
      musicCover: "",
      // 歌曲评论
      hotComments: [],
      // 动画播放状态
      isPlaying: false,
      // 遮罩层的显示状态
      isShow: false,
      // mv地址
      mvUrl: "",
      //标记
      flag: true,
      //歌词
      lyric: "",
    },
    methods: {
      searchMusic: function() {
        this.isHot = false;
        var that = this;
        axios.get("/search?keywords=%20" + this.query +"&limit=20").then(
          function(response) {
            that.musicList = response.data.result.songs;
            console.log(response);
          },
          function(err) {}
        );
      },

      setSongId:function(index){
          return "play_btn"+index;  
      },

      isPlay:function(index){
            this.flag = !this.flag;
            var play = document.getElementById("play_btn"+index);
            if(flag == true){
                play.className="fa fa-play-circle";
            }else{
                play.className="fa fa-pause-circle";
            }
      },

      playMusic:function(musicId){
        var that = this;
        axios.get("/song/url?id="+musicId).then(
          function(response){
            console.log(response.data.data[0].url);
            that.musicUrl = response.data.data[0].url;
          },
          function(err){}
        );
      },

      getLyric:function(musicId){
        var that = this;
        var str = "";
        axios.get("/lyric?id="+musicId).then(
          function(response){
            console.log(response.data.lrc.lyric);
            str = response.data.lrc.lyric;
            str = str.replace(/]/g,"]&nbsp;");
            that.lyric = str.replace(/\n/g,"<br/><br/>");
          },
          function(err){}
        );
      },
    }
  });
  