<template>
  <div>
    <div v-show='empty==0' style="height:400px;background:#fff">
      <van-empty description="暂无数据 请填写后查看">
        <van-button round color="linear-gradient(to right, #ff6034, #ee0a24)" class="bottom-button" @click='toBaby'>{{btnmsg}}</van-button>
      </van-empty>
    </div>
    <div v-show='empty!=0' ref="chartColumn" style="width: 100%; height: 400px;background:#fff" id="canvas"></div>
    <div id='emp'></div>
    <van-field
      class='btncla'
      readonly
      clickable
      label="选择页数"
      :value="value"
      placeholder="点击选择页数"
      @click="showPick = true"
    />
    <van-popup v-model="showPick" round position="bottom">
      <van-picker
        title='请选择您想查看的页数'
        show-toolbar
        :default-index="defaultPick"
        :columns="columns"
        @cancel="showPick = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <div class='btn-mg'>
      <div>
        <van-button type="default" size='large' icon='arrow' icon-position='right' @click="toRec(0)">添加记录</van-button>
      </div> 
      <div>
        <van-button type="default" size='large' icon='arrow' icon-position='right' @click="toRec(1)">更多记录</van-button>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>
 
<script>
import echarts from "echarts";
import { Toast } from 'vant';
import moment from 'moment';
import { Empty } from 'vant';
import { Dialog } from 'vant';
export default {
  inject:['reload'],
  data() {
    return {
      btnmsg:'',
      empty:localStorage.getItem('babySelect')=='undefined'||!localStorage.getItem('babySelect')? 0 :JSON.parse(localStorage.getItem('babySelect')).bid ,
      key:[],
      //接收所有请求得到的数据
      keystature:[],//身高数据
      keyhdim:[],//头围数据
      keyweight:[],//体重数据
      keytime:[],//时间数据
      //选择器默认选项
      defaultPick:0,
      //表单选择后保存的值
      value: '',
      //选择器选项(第几周)
      columns: [],
      //弹出层(周数选择)布尔值变量
      showPick: false,
      //ecahrts组件
      chartColumn: null,
      option: {
        title: {//图标标题
          text: "宝宝成长记录",
          textStyle:{
            fontSize:15
          }
        },
        tooltip: {//随鼠标悬停或点击时的提示框
          trigger: "axis",
          formatter(params){
            let ad=[];

            for(let i in params){
              ad.push(params[i].name,params[i].seriesName,params[i].value)
            };
            //根据具体的折现数据返回相应的浮悬气泡
            for(let i in ad){
              if(ad[i]==undefined){
                ad.splice(i-2,3);
                for(let n in ad){
                  if(ad[n]==undefined){
                    ad.splice(n-2,3);
                  };
                };
              };
            };
            if(ad.length==9){
              return ad[0]+'<br>'+ad[1]+ad[2]+'cm'+'<br>'+ad[4]+ad[5]+'cm'+'<br>'+ad[7]+ad[8]+'kg';
            }else if(ad.length==6){
              if(ad[4]=='体重'){
                return ad[0]+'<br>'+ad[1]+ad[2]+'cm'+'<br>'+ad[4]+ad[5]+'kg';
              }else{
                return ad[0]+'<br>'+ad[1]+ad[2]+'cm'+'<br>'+ad[4]+ad[5]+'cm'
              }
            }else if(ad.length==3){
              if(ad[1]=="体重"){
                return ad[0]+'<br>'+ad[1]+ad[2]+'kg';
              }else{
                return ad[0]+'<br>'+ad[1]+ad[2]+'cm';
              }
            }else{
              return '该日无本项记录'
            };
          }
        },
        legend: {//可勾选的显示内容，与series中每个元素的name值保持一致
          data: ["身高","头围","体重"],
        },
        grid: {//图表样式
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {//右上角工具盒(默认显示)
          feature: {
            magicType: {//切换图表类型
              type: ['line', 'bar']//图表类型可选项
            },
            saveAsImage: {},//是否保存到本地png格式文件
          },
        },
        xAxis: {//x轴数据
          type: "category",
          boundaryGap: false,//折线两头是否留空
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [//各条折线所需的数据
          {
            name: "身高",
            type: "line",
            // stack: "总量",
            smooth: true,//弧度折线
            data: [],
          },
          {
            name: "头围",
            type: "line",
            // stack: "总量",
            smooth: true,
            data: [],
          },
          {
            name: "体重",
            type: "line",
            // stack: "总量",
            smooth: true,
            data: [],
          },
        ],
      },
    };
  },
  watch:{
    key(){
      if(this.key==null){
        this.empty=0;
        this.value=''
      }
    }
  },
  mounted() {
    if(!localStorage.getItem('userInfo')){
      this.btnmsg="登录后查看记录"
    }else if(localStorage.getItem('babyInfo')=='[]'){
      this.btnmsg='绑定宝宝信息'
    }else{
      this.btnmsg='前往添加数据'
    }
    // console.log(JSON.parse(localStorage.getItem('babySelect')).bid)
    //发送axios请求，获取宝宝成长数据
    if(localStorage.getItem('babySelect')=='undefined'||!localStorage.getItem('babySelect')){
      return
    }else{
      this.axios.get(`/GUchart?lid=${JSON.parse(localStorage.getItem('userInfo')).lid}&bid=${JSON.parse(localStorage.getItem('babySelect')).bid}`).then(res=>{
        this.key=res.data.data;
        //保存到vux中
        this.$store.commit('key',res.data.data);
        if(!this.key){//无数据时
          Toast('暂无数据,请填写后查看');
          let canvas=document.getElementById('canvas');
          canvas.onclick=()=>{
            this.toastMsg();
          };
        }else{
          //排序
          this.key.sort((a,b)=>{
            return a.write_time-b.write_time;
          })
          for(let i in this.key){//处理数据，把0转为null
            if(this.key[i].bstature==0)this.key[i].bstature=null;
            if(this.key[i].bhdim==0)this.key[i].bhdim=null;
            if(this.key[i].bweight==0)this.key[i].bweight=null;
          }

          this.key.forEach(item=>{//有数据时,包不同的数据保存到相应的变量中
            this.keystature.push(item.bstature);
            this.keyhdim.push(item.bhdim);
            this.keyweight.push(item.bweight);
            this.keytime.push(item.write_time);
          });
          //保存到本地会话储存
          sessionStorage.setItem('key',JSON.stringify(this.key));
          //页面初始化时，需要显示的三项数据
          let arr1=this.keystature.slice((Math.ceil(this.keystature.length/7)-1)*7,(Math.ceil(this.keystature.length/7)-1)*7+7);
          this.option.series[0].data=arr1;
          let arr2=this.keyhdim.slice((Math.ceil(this.keyhdim.length/7)-1)*7,(Math.ceil(this.keyhdim.length/7)-1)*7+7);
          this.option.series[1].data=arr2;
          let arr3=this.keyweight.slice((Math.ceil(this.keyweight.length/7)-1)*7,(Math.ceil(this.keyweight.length/7)-1)*7+7);
          this.option.series[2].data=arr3
          this.keytime.slice((Math.ceil(this.keytime.length/7)-1)*7,(Math.ceil(this.keytime.length/7)-1)*7+7).forEach(elem=>{
            this.option.xAxis.data.push(moment(Number(elem)).format('MM-DD'))
          });
        };
        this.value='第'+Math.ceil(this.keytime.length/7)+'页';//初始化时显示的周数
        this.defaultPick=Math.ceil(this.keytime.length/7);//初始化时选择器默认值，保持在最后记录数据时
        // this.initChart();//调用加载图表
        //选择器页数根据数组长度动态变化
        for(let i=1;i<=Math.ceil(this.keytime.length/7);i++){
          this.columns.push('第'+i+'页');
        };
        this.initChart();//加载图标
      });
    }
  },
  methods: {
    //前往绑定宝宝信息
    toBaby(){
      if(!localStorage.getItem('userInfo')){
        this.$router.push('/login')
      }else if(localStorage.getItem('babyInfo')=='[]'){
        this.$router.push('/mybaby');
      }else{
        this.$router.push('/rlist')
      }
    },
    //底部两按钮跳转并传参
    toRec(k){
      if(!localStorage.getItem('userInfo')){
        Dialog.confirm({
          title: '温馨提示',
          message: '请绑登录后查看',
          confirmButtonText:'前往登录',
          cancelButtonText:'留在本页'
        }).then(() => {
          this.$router.push('/login')
        }).catch(() => {
          /***/
        });
      }else if(localStorage.getItem('babyInfo')=='[]'){
        Dialog.confirm({
          title: '温馨提示',
          message: '请绑定宝宝信息后查看',
          confirmButtonText:'前往绑定',
          cancelButtonText:'留在本页'
        }).then(() => {
          this.$router.push('/mybaby')
        }).catch(() => {
          /***/
        });
      }else{
        this.$router.push({
          name:'rlist',
          params:{//跳转携带的参数
            tab:k,
          }
        });
      }
    },
    //无数据时点击canvas出提示
    toastMsg(){
      Toast('暂无数据,请填写后查看');
    },
    //canvas
    initChart() {
      this.chartColumn = echarts.init(this.$refs.chartColumn);
      this.chartColumn.setOption(this.option);
    },
    //弹出层按钮事件函数控制变量的布尔值以及保存相应的选取项
    onConfirm(value, index) {
      if(localStorage.getItem('babySelect')=='undefined'||!localStorage.getItem('babySelect')){
        this.showPick=false;
      }else{
        this.showPick = false;
        this.value = value;
        //获得选取的周数的下标，作为数据请求的参数
        let arr=[];
        for(let i in this.columns){
          if(this.value==this.columns[i]){
            //获得下标

            this.option.series[0].data=this.keystature.slice(i*7,i*7+7);
            this.option.series[1].data=this.keyhdim.slice(i*7,i*7+7);
            this.option.series[2].data=this.keyweight.slice(i*7,i*7+7);
            this.keytime.slice(i*7,i*7+7).forEach(elem=>{
              arr.push(moment(Number(elem)).format('MM-DD'));
            });
            this.option.xAxis.data=arr;
          };
        };
        //调用initChart重新加载canvas图表
        this.initChart()
      }
    },
  },
};
</script>

<style  scoped>
canvas{
  background: #fff;
}
#emp{
  width: 100%;
  height: 17px;
  background: #fff;
}
.btncla{
  box-shadow: 0 0 .7px 0;
}
.btn-mg{
  display: flex;
  justify-content: space-between;
}
.btn-mg>div{
  flex:0 0 50%;
}
</style>