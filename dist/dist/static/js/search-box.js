var btns = document.getElementById('navBar').getElementsByTagName('li')
var divs = document.getElementsByClassName('higgs-input-box')
//var div=document.getElementsByClassName('higgs-condition');
for (var i = 0; i < btns.length; i++) {
  btns[i].index = i
  btns[i].onclick = function () {
    //btns[i].style.backgroundColor='red';
    for (var i = 0; i < btns.length; i++) {
      divs[i].style.display = 'none'
    } //排他
    divs[this.index].style.display = 'block'
  }
}
for (var i = 0; i < btns.length; i++) {
  btns[i].index = i
  btns[i].onmouseover = function () {
    // 鼠标滑上变色
    this.style.background = '#fff'
    this.style.color = '#0A1933'
  }
  btns[i].onmouseout = function () {
    // 鼠标滑离变色
    this.style.background = 'rgba(0,0,0,0)'
    this.style.color = '#fff'
  }
}
//公众号二维码
var triggerBtn = document.querySelector('.wechat')
var modalBox = document.querySelector('.code')
triggerBtn.onmouseover = function () {
  modalBox.style.display = 'block'
}
triggerBtn.onmouseout = function () {
  modalBox.style.display = 'none'
}
// 地址栏获取参数方法
function GetUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = encodeURI(window.location.search).substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
window.onload = function () {
  var name = decodeURI(GetUrlParam('name'))
  if (name != null && name.toString().length > 1 && name != 'null') {
    list(name)
  } else {
    getMessage()
  }
}
function list(name) {
  var list = document.querySelector('.aaa')
  var all = document.getElementById('all')
  var number = document.getElementById('number')
  var xhr = new XMLHttpRequest()
  var xhr = new XMLHttpRequest()
  if (name != null) {
    xhr.onload = function () {
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText)
      }
    }

    xhr.onload = function () {
      var obj = JSON.parse(xhr.response)
      // 获取到地区信息
      //console.log(obj.data[0])
      queryData = obj.data[0]
      //console.log(queryData.id)
      // 生成页面
      list.innerHTML = obj.data
        .map((v, i) => {
          return `      
                                <li class="item">
                                <a href="http://139.196.92.110:7979/pdf/export/${v.id}">
                                    <div class="box">
                                        <div class="bg"><img src="static/image/report.png"></div>
                                        <div class="activeBg"></div>
                                        <div class="info">
                                            <span class="company">${v.name}</span>
                                            <div class="baogao"><span>区域现代化信息报告</span></div>
                                        </div>
                                    </div>
                                    <div class="time">
                                    </div>
                                    <div class="operate">
                                        <a class="bbb" href="http://139.196.92.110:7979/pdf/export/${v.id}">下载报告</a>                                            
                                    </div>
                                </a>
                                </li>   
                    `
        })
        .join('')
      number.innerHTML = 1
      all.innerHTML = 1
    }
    xhr.open('POST', '/sxqyhapi/yun/region/listByName')
    xhr.setRequestHeader('Content-Type', 'application/json', true) //请求头
    xhr.send(name)
  } else {
    xhr.open('GET', '/sxqyhapi/yun/region/search')
    xhr.setRequestHeader('Content-Type', 'application/json', true) //请求头
    xhr.send(JSON.stringify())
  }
}
function getMessage() {
  var list = document.querySelector('.aaa')
  var all = document.getElementById('all')
  var next = document.getElementById('next')
  var last = document.getElementById('last')
  var number = document.getElementById('number')
  var jumpto = document.getElementById('jumpto')
  var xhr = new XMLHttpRequest()
  var page = 1
  var count = 1
  xhr.onload = function () {
    if (xhr.status == 200) {
      var data = JSON.parse(xhr.responseText)
      console.log(data)
      //debugger
      var data = JSON.parse(xhr.responseText)
      var page = data.page.currPage
      count = data.page.pageSize
      //总数
      all.innerHTML = data.page.totalCount
      list.innerHTML = data.page.list
        .map((v, i) => {
          return `      
                                <li class="item">
                                <a href="http://139.196.92.110:7979/pdf/export/${v.id}">
                                    <div class="box">
                                        <div class="bg"><img src="static/image/report.png"></div>
                                        <div class="activeBg"></div>
                                        <div class="info">
                                            <span class="company">${v.name}</span>
                                            <div class="baogao"><span>区域现代化报告</span></div>
                                        </div>
                                    </div>
                                    <div class="time">
                                    </div>
                                    <div class="operate">
                                        <a class="bbb" href="http://139.196.92.110:7979/pdf/export/${v.id}">下载报告</a>                                            
                                    </div>
                                    </a>
                                </li>   
                `
        })
        .join('')
    }
  }
  number.innerHTML = 1
  xhr.open('GET', '/sxqyhapi/yun/region/list?page=1&limit=12', true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send()
  //下一页
  next.onclick = function getPage() {
    if (page < count - 1) {
      page++
    } else {
    }
    number.innerHTML = page
    xhr.open(
      'GET',
      '/sxqyhapi/yun/region/list?page=' + page + '&limit=12',
      true
    )
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send()
  }
  //上一页
  last.onclick = function getPage() {
    if (page > 1) {
      page--
    } else {
    }
    number.innerHTML = page
    xhr.open(
      'GET',
      '/sxqyhapi/yun/region/list?page=' + page + '&limit=12',
      true
    )
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send()
  }
  //跳转
  jumpto.onclick = function sub() {
    var content = document.getElementById('txt')
    if (content.value <= count - 1 && content.value > 0) {
      xhr.open(
        'GET',
        '/sxqyhapi/yun/region/list?page=' + content.value + '&limit=12',
        true
      )
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send()
      number.innerHTML = content.value
    } else {
    }
  }
}
