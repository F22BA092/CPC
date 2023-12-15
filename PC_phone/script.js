window.addEventListener("load", nowMounth);
window.addEventListener("load", nowDate);
window.addEventListener("load", getweek);


function nowDate() {
    var ele = document.getElementById("date");
    setInterval(() => {
        var date = new Date();
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        if((min.toString().length) == 1){
        ele.innerHTML = day + "日 " + hour + ":0" + min;
    }else{
        ele.innerHTML = day + "日 " + hour + ":" + min;
    }
    }, 1000);
}

function nowMounth() {
    var date = new Date();
    var mounth = Number(date.getMonth()) + 1;
    document.getElementById("mounth").innerHTML = mounth + "月";
}

function getweek() {
    let now = new Date();
    let date = now.getDate();
    let day_arr = ['日', '月', '火', '水', '木', '金', '土']
    let elem = day_arr[now.getDay()];
    document.getElementById("elem").innerHTML = "(" + elem + ")";
    document.getElementById("week").innerHTML = date + "日";
}
