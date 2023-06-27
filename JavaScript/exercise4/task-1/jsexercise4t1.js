setInterval(displayDate);
setInterval(displayTime);

function displayDate() {
    let date = new Date();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();

    let monthS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    let d = "DATE :   "+ day + "/" + monthS[month] + "/" + year;
    document.getElementById('date').innerHTML = d;
}

function displayTime() {
    let date = new Date();
    let t = "TIME :    " + date.toLocaleTimeString();
    document.getElementById('time').innerHTML = t;
}

let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resumeBtn = document.getElementById('resume');
let resetBtn = document.getElementById('reset');
  
let hour = 00;
let minute = 00;
let second = 00;
let count = 00;
let timer = false;
stopBtn.disabled = true;
resumeBtn.disabled = true;
resetBtn.disabled = true;

startBtn.addEventListener('click', function () {
    timer = true;
    setInterval(stopWatch,10);
    startBtn.disabled = true;
    stopBtn.disabled = false;
});
  
stopBtn.addEventListener('click', function () {
    timer = false;
    stopBtn.disabled = true;
    resumeBtn.disabled = false;
    resetBtn.disabled = false;

});

resumeBtn.addEventListener('click', function () {
    timer = true;
    setInterval(stopWatch,10);
    resumeBtn.disabled = true;
    stopBtn.disabled = false;
});
  
resetBtn.addEventListener('click', function () {
    timer = false;
    hour = 00;
    minute = 00;
    second = 00;
    count = 00;
    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('count').innerHTML = "00";
    startBtn.disabled = false;
    resumeBtn.disabled = true;
    stopBtn.disabled = true;

});


function stopWatch() {
    if (timer) {
        count++;
        if (count == 99) {
            second++;
            count = 0;
        }
        if (second == 60) {
            minute++;
            count = 0;
            second = 0;
        }
        if (hour == 60) {
            hour++;
            count = 0;
            second = 0;
            minute = 0;
        }
        
        document.getElementById('hr').innerHTML = hour;
        document.getElementById('min').innerHTML = minute;
        document.getElementById('sec').innerHTML = second;
        document.getElementById('count').innerHTML = count;
        
    }
}