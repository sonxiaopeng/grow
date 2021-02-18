<template>
  <div class="diaper">
    <van-nav-bar
      title="换尿布"

      fixed
>
       <template #left>
        <img class="m_icon" src="imgs/Recordimgs/dm1.png" alt="" @click="onClickLeft" />
      </template>
    </van-nav-bar>
    <van-cell is-link @click="showP=true" :value="dReplaceTime" title="更换时间"></van-cell>
    <div class="d_state_wrap">
      <div class="title">尿布状态</div>
      <ul>
        <li v-for="d_state,i of d_states" :key="i" @click="showDState(i)" :class="{stateActive:diaperState==i}">
          <p >{{d_state}}</p>
        </li>
      </ul>
    </div>
    <div class="bg">
        <div class="u_color_wrap" v-show="diaperState==0||diaperState==2">
        <div class="title">嘘嘘颜色</div>
        <ul >
          <li :id="i" v-for="item,i of u_colors" :key="i">
            <div :style="item[0]" @click="showUColor(i)" :class="{stateActive:urineColor==i}"></div>
            <p @click="showUColor(i)" :class="{stateActive:urineColor==i}">{{item[1]}}</p>
          </li>
        </ul>
      </div >     
      <div class="e_state_wrap" v-show="diaperState==1||diaperState==2">
        <div class="title">便便性状颜色</div>
        <ul>
          <li v-for="e_state,i of e_states" @click="showEState(i)" :class="{stateActive:excrementState==i}">
            <p >{{e_state}}</p>
          </li>
        </ul>
        <ul class="e_color_wrap">
          <li :id="i" v-for=" e_color,i of e_colors" :key="i">
            <div :style=" e_color[0]" @click="showEColor(i)" :class="{stateActive:excrementColor==i}"></div>
            <p  @click="showEColor(i)" :class="{stateActive:excrementColor==i}">{{ e_color[1]}}</p>
          </li>
        </ul>
      </div>
      <div class="note_wrap" v-show="diaperState!=3">
        <div class="title">添加备注</div>
        <textarea cols="3" type="text" :placeholder="noteText" maxlength="250" v-model="noteval"></textarea>
      </div>
      <div class="loader_wrap" v-show="diaperState!=3">
        <van-uploader v-model="fileList" :after-read='onRead' multiple :max-count="9" />
      </div>
      <div class="footer">
        <van-button round @click="saveDiaper">保存</van-button>
      </div>
    </div>
    <van-popup v-model="showP" position="bottom" >
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择时间"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showP=false" @confirm="saverptime"
      />
    </van-popup>
  </div>
</template>
<script>
import moment from 'moment';
import { Toast } from 'vant';
export default{
  data(){
    return{
      drptimer:null,
      checktime:false,
      dReplaceTime:"",
      drptimes:0,
      dstate:"嘘嘘",
      niaoColor:"#fffbb4",
      bianState:"正常",
      bianColor:"#feb60c",
      dnotes:"",
      dpic:"",
      babyid:null,
      noteval:"",
      minDate: new Date(2020,0,1),
      maxDate: new Date(),
      currentDate: new Date(),
      d_states:['嘘嘘','便便','嘘嘘+便便','干爽'],
      diaperState:0,
      excrementState:0,
      urineColor:2,
      excrementColor:2,
      timeValue:"2021-01-12 21:21",
      u_colors:[
        [{background:"#fff"},"乳白色"],
        [{background:"#fee0e2"},"粉色"],
        [{background:"#fffbb4"},"正常"],
        [{background:"#feb60c"},"黄色"],
        [{background:"#836300"},"浓茶色"],
        [{background:"#ff6c6c"},"红色"]
        ],
      e_states:['正常','水样','很稀','粘稠','较干','干硬'],
      e_colors:[
        [{background:"#d9d9d9"},"灰白"],
        [{background:"#437407"},"绿色"],
        [{background:"#feb60c"},"黄色"],
        [{background:"#836201"},"褐色"],
        [{background:"#000"},"黑色"],
        [{background:"#ff6c6c"},"红色"]
        ],
      showP:false,
      noteText:"记录下嘘嘘的颜色等...",
      fileList:[],
      formData:{}
    }
  },
  mounted(){
    //获取bid
    if(this.$store.state.bid){
      this.babyid=this.$store.state.bid;
    }
    //加载更换时间
    this.drptimes=parseInt(new Date().getTime()/1000/60)*60000;
    this.dReplaceTime=moment(this.drptimes).format('YYYY-MM-DD HH:mm');
    //更新时间选择器的最大时间选择项
    this.drptimer=setInterval(()=>{
      this.maxDate=new Date()
    },3000) 
  },
  methods:{
    //保存更换时间
    saverptime(val){
      this.showP=false;
      this.dReplaceTime=moment(val).format("YYYY-MM-DD HH:mm");
      this.drptimes=val.getTime();
    },
    //文件上传完毕后会触发 after-read 回调函数，获取到对应的 file 对象。
    onRead(file){
      this.formData = new FormData();
      if(Array.isArray(file)){//判断是否多张图片,多张的file是[{},{}],单张{}
        file.forEach(item=>{
          let picture=item.file;
          this.formData.append('uploadFile', picture)
        })     
      }else{//单文件
        this.formData.append('uploadFile', file.file);
      }
    },
    onClickLeft(){
      //返回关闭更换定时器，并退回记录页面
      clearInterval(this.drptimer)
      this.$router.push("/record")
    },
    //尿布状态显示
    showDState(i){
      this.diaperState=i;
      //更改备注placeholder
      if(i==0){
        this.noteText="记录下嘘嘘的颜色等...";
      }else if(i==1){
        this.noteText="记录下便便的性状和颜色等...";
      }else if(i==2){
        this.noteText="记录下嘘嘘和便便的性状和颜色等...";
      };
      //记录数据库数据
      this.dstate=this.d_states[i];
    },
    //嘘嘘颜色显示
    showUColor(i){
      this.urineColor=i;
      this.niaoColor=this.u_colors[i][0].background;
    },
    //便便状态显示
    showEState(i){
      this.excrementState=i;
      this.bianState=this.e_states[i];
    },
    //便便颜色显示
    showEColor(i){
      this.excrementColor=i;
      this.bianColor=this.e_colors[i][0].background;
    },
    //保存按钮
    saveDiaper(){
      //根据状态来清空不需要的数据
      if(this.dstate=="嘘嘘"){
        this.bianState="";
        this.bianColor="";
      }else if(this.dstate=="便便"){
        this.niaoColor="";
      }else if(this.dstate=="干爽"){
        this.niaoColor="";
        this.bianState="";
        this.bianColor="";
      }
      this.dnotes=this.noteval;
      let ddate=this.dReplaceTime.slice(0,10);

      let dval=`dReplaceTime=${this.drptimes}&dstate=${this.dstate}&niaoColor=${this.niaoColor}&bianState=${this.bianState}&bianColor=${this.bianColor}&dnotes=${this.dnotes}&babyid=${this.babyid}&ddate=${ddate}`;
      //发送请求
      if(this.fileList.length>0){//有图片需要发送图片请求
        new Promise(resolve=>{
          //上传图片
          this.axios.post('/dupload', this.formData).then(res => {
            //上传其他数据
            this.axios.post('/dsave', dval).then(res => {
              if(res.data==1){
                this.$router.push('/record');
              }else{
                Toast.fail('保存失败');
              }
            })
          });
        })
      }else{//没有图片，修改其他数据
        this.axios.post('/dsave', dval).then(res => {
          if(res.data==1){
            this.$router.push('/record');
          }else{
            Toast.fail('保存失败');
          }
        })
      }  
    }
  }
}
</script>
<style>
  *{
    box-sizing: border-box;
  }
  .diaper{
    height: 100vh;
    padding-top:46px;
    background: rgb(236, 227, 227);
    height:100vh;
    text-align: center;
  }
  .diaper .bg,
  .diaper .d_state_wrap,
  .diaper .loader_wrap{
    background-color: #fff;
  }
  .diaper .van-cell__title{
    text-align: left;
    font-size:16px; 
  }
  .diaper .van-cell__value>span{
    font-size:16px;
    color: #597FA4;
    font-weight:bold;
  }
  .diaper .d_state_wrap,
  .diaper .u_color_wrap{
    margin-top:3px;
  }
  .diaper .d_state_wrap,
  .diaper .u_color_wrap,
  .diaper .e_state_wrap,
  .diaper .note_wrap{
    padding:15px 16px; 
  }
  .diaper .loader_wrap{
     position: relative;
     padding:7px 16px;
     text-align: left;
  }
  .diaper .d_state_wrap p{
    font-size:14px;
    color:#565656;
  }
  .diaper .d_state_wrap li,
  .diaper .e_state_wrap ul:nth-child(2)>li{
    line-height:28px;
    width: 80px;height: 28px;
    background: rgb(192, 189, 189);
    border-radius:5px;
  }
  .diaper .e_state_wrap ul:nth-child(2)>li{
    width: 50px;
  }
  .diaper .u_color_wrap p,
  .diaper .e_state_wrap p,
  .diaper .note_wrap{
    font-size:12px;
    color:#565656;
  }
  .diaper .e_color_wrap{
    margin-top:20px;
  }
  .diaper .title{
    margin-bottom:15px;
    text-align:left;
    color: black;
  }
  .diaper ul:not([class='van-picker-column__wrapper']){
    display: flex;
    justify-content:space-between;
  }
  .diaper .u_color_wrap li>div,
  .diaper .e_color_wrap li>div{
    height: 15px;width: 15px;
    border-radius: 50%;
    margin: 0 auto 14px;
  }
  .diaper .u_color_wrap li:first-child>div{
    border:1px solid #ddd;
  }
  .diaper .note_wrap textarea{
    width: 100%;
    border: 0;
    outline: 0;
  }
  .diaper .d_state_wrap li.stateActive,
  .diaper .e_state_wrap ul:nth-child(2)>li.stateActive{
    background-color: rgba(255,87, 94, 0.3); 
  }
  .diaper .d_state_wrap li.stateActive>p,
  .diaper .e_state_wrap ul:nth-child(2)>li.stateActive>p{
     color:rgba(255,87, 94, 1) !important;
  }
  .diaper .u_color_wrap li>div.stateActive,
  .diaper .e_color_wrap li>div.stateActive{
    transform: scale(1.5);
    margin-bottom:12px;
  }
  .diaper .u_color_wrap li>p.stateActive,
  .diaper .e_color_wrap li>p.stateActive{
    font-size: 14px;
    font-weight: 600;
  }
  .diaper .footer{
    position: fixed;
    bottom:0;
    width: 100%;
    height: 50px;
    border-top: 2px solid #D6D6D6;
    padding:1% 3%;
    background: #fff
  }
  .diaper .footer>button{
    width: 100%;
    height: 40px;
    border-radius: 115px;
    color: #fff;
    background-color:#dc4248 ;
  }
  .diaper .van-picker-column__item{
    display:block;
  }
</style>