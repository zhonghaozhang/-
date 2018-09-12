//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    count:[],
    count2:[],
    flag:'',
    total:'',
    isa:1
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 选择数字
  addNum: function(e){
    if (this.data.total!==''){ // 判断已经计算过 全部清空 重新计算
      this.setData({
        count : [],
        count2 : [],
        flag : '',
        total : ''
      })
    
    }
    if (this.data.isa == 1) { // 判断是计算符号前 还是计算后 数值增加 
      console.log(e.currentTarget.dataset.num)//打印传递的参数
      console.log(this.data)
      console.log(this.data.count)
      var length = this.data.count.length
      this.data.count[length] = e.currentTarget.dataset.num
      var arr = []
      //由于小程序 没有push操作 所以通过遍历存放
      for (var i = 0; i < this.data.count.length; i++) {
        arr[i] = this.data.count[i]
      }
      this.setData({
        count: arr
      })
    } else {
      console.log(e.currentTarget.dataset.num)
      console.log(this.data)
      console.log(this.data.count2)
      var length = this.data.count2.length
      this.data.count2[length] = e.currentTarget.dataset.num
      var arr = []
      for (var i = 0; i < this.data.count2.length; i++) {
        arr[i] = this.data.count2[i]
      }
      this.setData({
        count2: arr
      })
    }
    
  },
  // 判断是 加减乘除
  isAdd(e){
    console.log(e.currentTarget.dataset)
    this.setData(
      {
        flag: e.currentTarget.dataset.flag,
        isa:2
      }
    )
  },
  // 计算结果
  compute(){
    if (this.data.count.length!=0){
      if (this.data.flag=="+"){ // 加法操作 
        var after = '0'
        var before = '0'
        this.data.count.map(function(item){
          after = after+item
        })
        this.data.count2.map(function (item) {
          before = before + item
        })
        this.setData({
          total: parseInt(after) + parseInt(before)
        })
      } else if (this.data.flag == "-"){ //减法操作 
        var after = '0'
        var before = '0'
        this.data.count.map(function (item) {
          after = after + item
        })
        this.data.count2.map(function (item) {
          before = before + item
        })
        this.setData({
          total: parseInt(after) - parseInt(before)
        })
      } else if (this.data.flag == "*"){ // 乘法操作 
        var after = '0'
        var before = '0'
        this.data.count.map(function (item) {
          after = after + item
        })
        this.data.count2.map(function (item) {
          before = before + item
        })
        this.setData({
          total: parseInt(after) * parseInt(before)
        })
        }else{ // 除法操作 
        var after = '0'
        var before = '0'
        this.data.count.map(function (item) {
          after = after + item
        })
        this.data.count2.map(function (item) {
          before = before + item
        })
        this.setData({
          total: parseInt(after) / parseInt(before)
        })
        }
        // 重置 前后数值 标识符
        this.setData(
          {
            isa:1
          }
        )

    }else{
      wx.showToast({
        title: '请选择计算数字!',
        icon: 'tarning',
        duration: 1000
      })
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
