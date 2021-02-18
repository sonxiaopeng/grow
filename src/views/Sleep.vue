<template>
  <div class="sleep">
    <van-nav-bar
        title="睡眠"
        fixed>
       <template #left>
        <img class="m_icon" src="imgs/Recordimgs/dm1.png" alt="" @click="onClickLeft" />
      </template>
      </van-nav-bar>
    <!--计时器界面开始-->
    <div class="s_operation" v-show="visible==false" >
      <div class="z" :class="go">
        <p class="z1" :class="go">z</p>
        <p class="z2" :class="go">z</p>
        <p class="z3" :class="go">z</p>
      </div>
      <div class="t_icon" :class="go" @click="start">
        <!-- 颜色#FF575E  rgba(255,87, 94, 0.3)-->
        <img v-if="triangle" class="icon_in" src="/imgs/sleep/triangle.png">
        <img v-else class="icon_in" src="/imgs/sleep/rect.png">
      </div>
      <!-- 显示时间 -->
      <div class="t_show">{{time}}</div>
      <!-- 手动输入时间按钮 -->
      <span class="btn_manual" @click="showManual">手动输入时间</span>
      <div class="footer">
        <button class="btn_end" :class="go" :disabled="enddisable" @click="btnend">结束</button>
      </div>
    </div>
    <!-- 计时器界面结束 -->
    <transition name="van-slide-up">
      <div class="" v-show="visible==true" >
      <!-- 第一块记录面板 -->
        <div class="s_record1" v-show="recordshow==true">
        <!-- 开始时间1 开始 -->
          <van-cell is-link @click="showStart1=true" title="开始时间" :value="sstartTime1"></van-cell>
          <van-popup v-model="showStart1" position="bottom">
            <van-datetime-picker
              v-model="startCurrent1"
              type="datetime"
              title="选择时间"
              :min-date="startMin1"
              :max-date="startMax1"
              @cancel="showStart1=false" @confirm="saveStart1"
            />
          </van-popup>
          <!-- 开始时间1 结束 -->
          <!-- 结束时间1 开始-->
          <van-cell is-link @click="showEnd1=true" title="结束时间" :value="sendTime1"></van-cell>
          <van-popup v-model="showEnd1" position="bottom">
            <van-datetime-picker
              v-model="endCurrent1"
              type="datetime"
              title="选择时间"
              :min-date="endMin1"
              :max-date="endMax1"
              @cancel="showEnd1=false" @confirm="saveEnd1"
            />
          </van-popup>
          <!-- 结束时间1 结束-->
          <!-- 持续时间1 开始-->
          <van-cell is-link @click="showDuration1=true" title="睡眠时长" :value="sduration1"></van-cell>
          <van-popup v-model="showDuration1" position="bottom">
            <van-picker show-toolbar 
            title="选择时间" 
            :columns="columns" 
            @cancel="showDuration1=false" @confirm="saveDuration1"/>
          </van-popup>
          <!-- 持续时间1 结束-->
          <!-- 完成按钮1 -->
          <div class="footer">
            <van-button class="btn_save" round @click="btnsave(starts,ends,durations,babyid,sstartTime1)">完成</van-button>
          </div>
        </div>
        <!-- 记录面板2 -->
        <div class="s_record2" v-show="recordshow==false">
          <!-- 开始时间2 开始 -->
          <van-cell is-link @click="showStart2=true" title="开始时间" :value="sstartTime2"></van-cell>
          <van-popup v-model="showStart2" position="bottom">
            <van-datetime-picker
              v-model="startCurrent2"
              type="datetime"
              title="选择时间"
              :min-date="startMin1"
              :max-date="startMax2"
              @cancel="showStart2=false" @confirm="saveStart2"
            />
          </van-popup>
          <!-- 开始时间2 结束 -->
          <!-- 结束时间2 开始-->
          <van-cell is-link @click="showEnd2=true" title="结束时间" :value="sendTime2"></van-cell>
          <van-popup v-model="showEnd2" position="bottom">
            <van-datetime-picker
              v-model="endCurrent2"
              type="datetime"
              title="选择时间"
              :min-date="endMin1"
              :max-date="endMax2"
              @cancel="showEnd2=false" @confirm="saveEnd2"
            />
          </van-popup>
          <!-- 结束时间2 结束-->
          <!-- 持续时间2 开始-->
          <van-cell v-show="showD==true" is-link @click="showDuration2=true" title="睡眠时长" :value="sduration2" ></van-cell>
          <van-popup v-model="showDuration2" position="bottom">
            <van-picker show-toolbar 
            title="选择时间" 
            :columns="columns" 
            @cancel="showDuration2=false" @confirm="saveDuration2"/>
          </van-popup>
          <!-- 持续时间2 结束-->
          <!-- 完成按钮2 -->
          <div class="footer">
            <van-button class="btn_save" round @click="btnsave(starts2,ends2,durations2,babyid,sstartTime2,showD)" :disabled="!showD">完成</van-button>
          </div>
        </div>
      </div> 
    </transition>
  </div>
</template>
<script>
import moment from "moment"
export default{
  data(){
    return{
       columns: [
        // 第一列 
        {
          values: [],
          defaultIndex:0
        },
        // 第二列
        {
          values: [],
          defaultIndex:0
        },
      ],
      oldstart:0,
      oldend:0,
      sid:0,
      babyid:null,
      showD:false,//第二面板中时长的显示
      sleepTimes:0,
      timer:null,
      maxtimer:null,
      count:0,
      hour:0,
      min:0,
      second:0,
      visible:false,
      recordshow:true,  
      showStart1:false,
      showEnd1:false,
      showDuration1:false,
      sstartTime1:"",
      sendTime1:"",
      sduration1:"",
      startCurrent1:"",
      startMin1: new Date(2020,0,1),
      startMax1: new Date(),
      endCurrent1:new Date(),
      endMin1: new Date(2020,0,1),
      endMax1: new Date(),
      starts:"",
      ends:"",
      durations:"",

      showStart2:false,
      showEnd2:false,
      showDuration2:false,
      sstartTime2:"",
      sendTime2:"宝宝熟睡中",
      sduration2:"",
      startCurrent2:"",
      startMax2: new Date(),
      endCurrent2:new Date(),
      endMax2: new Date(),
      starts2:"",
      ends2:"",
      durations2:"",

      time:"00:00",
      enddisable:true,
      triangle:true,
      go:{
        run:false
      },
    }
  },
  mounted(){
    //获取bid
    if(this.$store.state.bid){
      this.babyid=this.$store.state.bid;
    }
    //修改数据
    this.sid=this.$route.params.sid;
    if(this.sid){
      this.axios.get(`/gets?sid=${this.sid}`).then(res=>{
        let sdata=res.data.data[0];
        let sstartTime=parseInt(sdata.sstartTime);
        let sendTime=parseInt(sdata.sendTime);
        let sduration=parseInt(sdata.sduration);
        this.visible=true;
        //显示记录的开始时间
        this.sstartTime1=moment(sstartTime).format('YYYY-MM-DD HH:mm');
        this.startCurrent1=new Date(sstartTime);
        this.starts=sstartTime;
        this.oldstart=sstartTime;
        //显示记录的结束时间
        this.sendTime1=moment(sendTime).format('YYYY-MM-DD HH:mm');
        this.endCurrent1=new Date(sendTime);
        this.ends=sendTime;
        this.oldend=sendTime;
        //显示记得时长
        this.durations=sduration;
        let h=parseInt(sduration/1000/3600);
        let m=sduration%(1000*3600)/(1000*60);
        this.columns[0].defaultIndex=h;
        this.columns[1].defaultIndex=m;
        if(h>0){
          this.sduration1=`${h} 小时 ${m} 分钟`;
        }else{
          this.sduration1=`${m} 分钟`;
        }
      })   
    }
   
    //初始化选择器的列值
    for(let i=0;i<=24;i++){
      this.columns[0].values.push(i)
    }
    for(let j=0;j<=59;j++){
      this.columns[1].values.push(j)
    }
  },
  methods:{
    //点击手动输入事件
    showManual(){
      //记录开始显示和current
      this.sstartTime2=moment().format('YYYY-MM-DD HH:mm');
      this.startCurrent2=new Date();
      //记录开始时间戳从1分钟00毫秒计算
      this.starts2=parseInt(new Date().getTime()/1000/60)*60000;
      this.ends2=parseInt(new Date().getTime()/1000/60)*60000;
      //记录结束的current
      this.endCurrent2=new Date();
      //打开数据面板中的手动模块
      this.visible=true;
      this.recordshow=false;
      //调用最大值更新函数5s
      this.maxchange();
    },
    //点击确定按钮，存开始2时间，
    saveStart2(val){
      this.showStart2=false;
      this.starts2=val.getTime();
      this.sstartTime2=moment(val).format("YYYY-MM-DD HH:mm");
      //当时长栏2显示，就调用时长函数计算时差
      if(this.showD){
        this.durationchange(this.starts2,this.ends2);
      }
    },
    saveEnd2(val){
      this.showEnd2=false;
      this.ends2=moment(val).unix()*1000;
      this.sendTime2=moment(val).format("YYYY-MM-DD HH:mm");
      this.durationchange(this.starts2,this.ends2);

      //显示时长栏
      this.showD=true;
    },
    saveDuration2(val){
      this.showDuration2=false;
      let h=val[0];
      let m=val[1];
      if(h>0){
        this.sduration2=`${h} 小时 ${m} 分钟`;
      }else{
        this.sduration2=`${m} 分钟`;
      }
      this.durations2=h*3600*1000+m*60*1000;
      //如果修改时长，就修改结束时间的默认和显示值
      if((this.starts2+this.durations2)<new Date().getTime()){
        this.ends2=this.starts2+this.durations2;
        this. endCurrent2=new Date(this.ends2)
        this.sendTime2=moment(this.ends2).format("YYYY-MM-DD HH:mm");
      }else{
        this.$toast('请选择正确的睡眠时长');
      }
    },
    //点击开始图标，点击数1计时，点击数2停止   
    start(){
      this.count++;
      if(this.count==1){
        //记录开始时间戳和显示时间值
        this.starts=parseInt(new Date().getTime()/1000/60)*60000;
        this.startCurrent1=new Date();
        this.sstartTime1=moment().format('YYYY-MM-DD HH:mm');
      }else if(this.count==2){
        //记录结束时间戳和显示时间值
        this.endchange();
        //半分钟更新开始和结束的最大值
        this.maxchange();
      }
      //调用计时函数计时
      this.starttimer();
      //如果再次点击，已经是计时的样式，就打开记录面板1
      if(this.go.run){
        this.visible=true;
        this.recordshow=true;
      }
      //第一次点击时，改变各种样式
      this.triangle=false;
      this.go.run=true; 
      this.enddisable=false;
    },
    onClickLeft(){
      //清除定时器
      clearInterval(this.timer);
      if(this.sid){
        this.$router.push('/record');
      }else if(this.visible){
        if(this.recordshow){
          //退出记录面板1出提示框
         this.$dialog.confirm({
            title: '标题',
            message: '退出后该条记录将无法保存',
            confirmButtonText:'退出',
            cancelButtonText:'继续编辑'
          })
            .then(() => {
              //确认退出
              this.$router.push('/record');
              // 退出on confirm
            })
            .catch(() => {
              //取消停留当前页面
              // on cancel 不能删除catch
            })
        }else{
          //清除定时器
          clearInterval(this.maxtimer);
          //返回关闭记录面板2
          this.visible=false;
        }
      }else{
        //计时器界面返回记录界面
        this.$router.push('/record');
      }
    },
    //点击结束按钮
    btnend(){
      this.count++;
      //调用计时器函数，进行停止计时
      this.starttimer()
      if(this.count==2){
        //记录停止的时间戳和显示值
        this.endchange();
        //半分钟更新开始和结束的最大值
        this.maxchange();
      }//打开记录面板1
      this.visible=true;
      this.recordshow=true;
    },
    //点击确定按钮，存开始时间，
    saveStart1(val){
      this.showStart1=false;
      this.starts=val.getTime();
      this.sstartTime1=moment(val).format("YYYY-MM-DD HH:mm");
      //如果修改开始，就修改时长的默认和显示值
      this.durationchange(this.starts,this.ends);

    },
    //点击确定按钮，存结束时间，
    saveEnd1(val){
      this.ends=val.getTime();
      //如果修改结束，就修改时长的默认和显示值
      this.durationchange(this.starts,this.ends);
      this.showEnd1=false;
      this.sendTime1=moment(val).format("YYYY-MM-DD HH:mm");
    },
    //点击确定按钮，存持续时间，
    saveDuration1(val){
      this.showDuration1=false;
      let h=val[0];
      let m=val[1];
      if(h>0){
        this.sduration1=`${h} 小时 ${m} 分钟`;
      }else{
        this.sduration1=`${m} 分钟`;
      }
      this.durations=h*3600*1000+m*60*1000;
      //如果修改时长，就修改结束时间的默认和显示值
      if((this.starts+this.durations)<new Date().getTime()){
        this.ends=this.starts+this.durations;
        this. endCurrent1=new Date(this.ends)
        this.sendTime1=moment(this.ends).format("YYYY-MM-DD HH:mm");
      }else{
        this.$toast('请选择正确的睡眠时长');
      }
    },
    btnsave(starts,ends,durations,babyid,sstartTime,showD){
      clearInterval(this.maxtimer);
      let dur=durations;
      if(ends<starts||(starts+durations)>new Date().getTime()){
        this.$toast('请选择正确的睡眠时长');
        return;
      }
      if(durations==0){
        dur=60000;
      }
      //存日期
      let sdate=sstartTime.slice(0,10); 
      //修改页面时判断，如果数据更改，就发送修改请求
      if(this.sid&&(this.oldstart!=starts||this.oldend!=ends)){
        let params1=`sstartTime=${starts}&sendTime=${ends}&sduration=${dur}&sdate=${sdate}&sid=${this.sid}`;
        this.axios.post('/upts',params1);
        //更新成功后，跳转到记录页面
        this.$router.push('/record');
      }else if(!this.sid){
        let params2=`sstartTime=${starts}&sendTime=${ends}&sduration=${dur}&babyid=${babyid}&sdate=${sdate}`;
        this.axios.post('/ssave',params2);
        this.$router.push('/record');
      }
    },
    //计时器3s：开始和结束的最大值更新
    maxchange(){
      if(this.recordshow){
        this.maxtimer=setInterval(()=>{
          this.startMax1=new Date();
          this.endMax1=new Date();
        },3000)
      }else{
        this.maxtimer=setInterval(()=>{
          this.startMax2=new Date();
          this.endMax2=new Date();
        },3000)
      } 
    },
    //更新结束时间，计算时长，并显示页面
    endchange(){
      this.ends=parseInt(new Date().getTime()/1000/60)*60000;
      this.sendTime1=moment().format('YYYY-MM-DD HH:mm');
      if(this.min<=0&&this.hour<=0){
        this.durations=0;
        this.min=1;
      }else{
         this.durations=this.hour*3600*1000+this.min*60*1000;
      }
      if(this.hour>0){
        this.sduration1=this.hour+' 小时'+this.min+' 分钟'
      }else{
        this.sduration1=this.min+' 分钟';
      }
    },
    //更改时长，修改对应的显示，选择器内时间，数据库存储时间
    durationchange(starts,ends){
      let durations;
      if((ends-starts)>=0){
        durations=ends-starts;
        let  m;
        let h=parseInt(durations/1000/60/60);
        if(durations<6000||durations==0){
          m=1;
        }else{
          m=parseInt(durations%(1000*60*60)/(1000*60));
        }
        //更新选时长择器时间
        this.columns[0].defaultIndex=h;
        this.columns[1].defaultIndex=m;
        //不同面板的时长显示
        if(this.recordshow){
          this.durations=durations;
          if(h<=0){
            this.sduration1=`${m} 分钟`;
          }else{
            this.sduration1=`${h} 小时 ${m} 分钟`;
          }
        }else{
          this.durations2=durations;
          if(h<=0){
            this.sduration2=`${m} 分钟`;
          }else{
            this.sduration2=`${h} 小时 ${m} 分钟`;
          }
        }
      }else{
        //结束时间小于开始时间，报错
        this.$toast('请选择正确的睡眠时长');
      }
    },
    //计时器函数
    starttimer(){
      let secondcopy;
      let mincopy
      let hourcopy;
      if(this.count%2==1){
        this.timer=setInterval((()=>{
          this.second++;
          if(this.second>59){
            this.second=0;
            secondcopy="00"
            this.min++;
          }else if(this.second>=10&&this.second<=59){
            secondcopy=this.second;
          }else if(this.min<10){
            secondcopy='0'+this.second;
          }
          if(this.min>59){
            this.min=0;
            mincopy='00';
            this.hour++;
          }else if(this.min>=10&&this.min<=59){
            mincopy=this.min;
          }else if(this.min<10){
            mincopy='0'+this.min;
          }
          if(this.hour<10&&this.hour>0){
            hourcopy='0'+this.hour;
          }
          if(this.hour==0){
            this.time=mincopy+':'+secondcopy
          }else{
            this.time=hourcopy+':'+mincopy+':'+secondcopy
          }
        }),1000);
      }else{
        clearInterval(this.timer);
      }
    }
  }
}
</script>
<style>
  .sleep{
    height: 100vh;
    text-align: center;
  }
  .sleep .s_operation{
    padding-top:46px;
  }
  .sleep .z{
    height: 90px;
    margin: 15% 0 4% 0;
    font-weight: bold;
    position: relative;
    -webkit-text-stroke:1px#D6D6D6;color: transparent;
  }
  .sleep .z>p:first-child{
    font-size:40px;
  }
  .sleep .z>p:nth-child(2){
    font-size:30px;
  }
  .sleep .z>p:nth-child(3){
    font-size:20px;
  }
  .sleep  .t_icon{
    width: 115px;height:115px;
    margin: 0 auto;
    border:2px dashed #D6D6D6;
    border-radius: 50%;
    line-height: 115px;
    background:rgba(216,216,216,.7);
    text-align: center;
  }
 .sleep .icon_in{
    width: 25px;height: 25px;
  }
  .sleep .t_show{
    font-size:25px;
    font-weight:bold;
    margin: 8% 0 8% 0;
  }
  .sleep .btn_manual{
    font-size: 12px;
    color: #597FA4;
    padding-right: 13px;
    background: url(/imgs/sleep/manual_bg.png) no-repeat right; 
  }
  .sleep .footer{
    position: fixed;
    bottom:0;
    width: 100%;
    height: 50px;
    border-top: 2px solid #D6D6D6;
    padding:1% 3%;
    background: #fff
  }
  .sleep .btn_end{
    outline: none;
    border: 0;
    color: #cccccc;
    background:rgba(216,216,216,.7);
    width: 100%;
    height: 40px;
    border-radius: 115px 
  }
  @keyframes sleeping{
    from{opacity:0;-webkit-text-stroke:1px#FF575E;color: rgba(255,87, 94, 0.1);}
    2%{opacity:0.2;font-size:20px;-webkit-text-stroke:1px#FF575E;color: rgba(255,87, 94, 0.1);}
    60%{opacity:0.5;color: rgba(255,87, 94, 0.15)}
    70%{opacity:0.7;color: rgba(255,87, 94, 0.18)}
    75%{opacity:0.9;}
    78%{opacity:0.6;}
    82%{opacity:0.5;}
    87%{opacity:0.3;}
    88%{opacity:0.2;font-size:35px;transform:translateY(-67px);-webkit-text-stroke:1px#FF575E;color: rgba(255,87, 94, 0.1);}
    90%{opacity:0}
		to{opacity:0;}
	}
  .sleep .t_icon.run{
    border:2px solid #FF575E;
    background: rgba(255,87, 94, 0.3);
  }
  .sleep .btn_end.run{
    color: #fff;
    background-color: #dc4248;
  }
  .sleep .z .run{
    opacity:0;
  }
  .sleep .z1.run{
    position: absolute;
    bottom: 0;
    left: 49%;
    animation:sleeping 3s 1s infinite;
  }
  .sleep .z2.run{
    position: absolute;
    bottom: 0;
    left: 49%;
    animation:sleeping 3s 1s infinite;
  }
  .sleep .z3.run{
    position: absolute;
    bottom: 0;
    left: 49%;
    animation:sleeping 3s 2s infinite;
  }
  .sleep .inputTime{
    position: absolute;
    height:100vh;
  }
  .sleep .van-cell__title{
    text-align: left;
    font-size:16px; 
  }
  .sleep .van-cell__value>span{
    font-size:16px;
    color: #597FA4;
    font-weight:bold;
  }
  .sleep .s_record1,
  .sleep .s_record2{
    height: 100vh;
    padding-top:46px;
  }
  .sleep .btn_save{
    width: 100%;
    height: 40px;
    border-radius: 115px;
    color: #fff;
    background-color:#dc4248
  }
</style>
