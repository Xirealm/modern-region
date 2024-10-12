var div = document.querySelector('#listbox')
// 列表
var xhr = new XMLHttpRequest()
xhr.onload = function () {
  if (xhr.status == 200) {
    var data = JSON.parse(xhr.responseText).data
    console.log(data)
    var list = data.map((item, index) => {
      return item.name
    })
    // input
    var inp = document.querySelector('#search')
    var timer = null
    // 监听input框按键松开的事件
    inp.addEventListener('keyup', function (e) {
      // 拿到已展示内容
      let p = document.querySelectorAll('p')
      // 循环列表
      for (let i = 0; i < list.length; i++) {
        // 如果输入的内容在列表x项中存在 并且内容不为空 就把对应的列表展示出来
        // 内容不为空 是因为如果按了功能键 如删除、Ctrl键时 浏览器会默认用户输入了空字符串 而空字符串能匹配上列表 导致错误匹配
        // toUpperCase()方法将英文转为大写
        if (list[i].includes(inp.value.toUpperCase()) && inp.value !== '') {
          let p = document.createElement('p')
          p.innerText = list[i]
          div.appendChild(p)
          $('div').on('click', 'p', function () {
            $('input').val($(this).text())
            div.style.display = 'none'
          })
        }
        // 循环展示的内容 如果列表没有匹配上的 去除掉
        for (let j = 0; j < p.length; j++) {
          if (list[i].search(p[j].innerText) == -1) {
            p[j].innerText = ''
          }
        }
      }
    })
  }
}
xhr.open('GET', '/sxqyhapi/yun/region/search', true)
xhr.setRequestHeader('Content-Type', 'application/json', true)
xhr.send(JSON.stringify())
