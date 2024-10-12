var btns = document.getElementsByClassName('banner-con');
var btn2 = document.getElementsByClassName('banner-con1');
var divs = document.getElementsByClassName('wow fadeInLeft');
for (var i = 0; i < btns.length; i++) {
    btns[i].index = i;
    // btn2[i].index = i;
    btns[i].onclick = function() {
        //btns[i].style.backgroundColor='red';
        for (var i = 0; i < btns.length; i++) {
            divs[i].style.display = 'none';
            // btn2[i].style.display = 'none';
        } //排他
        divs[this.index].style.display = 'block';
        // btn2[this.index].style.display = 'block';
    }
}
for (var i = 0; i < btns.length; i++) {
    btns[i].index = i;
    // btn2[i].index = i;
    btns[i].onmouseover = function() {
        // 鼠标滑上变色
        this.style.background = "#fff";
        this.style.color = '#0A1933';
        // btn2[this.index].style.display = 'block';
    };
    btns[i].onmouseout = function() {
        // 鼠标滑离变色
        this.style.background = "rgba(0,0,0,0)";
        this.style.color = '#fff';
        // btn2[this.index].style.display = 'none';
    };
}


var triggerBtn = document.querySelector('.wechat');
var modalBox = document.querySelector('.code');
triggerBtn.onmouseover = function() {
    modalBox.style.display = 'block';
}
triggerBtn.onmouseout = function() {
    modalBox.style.display = 'none';
}
