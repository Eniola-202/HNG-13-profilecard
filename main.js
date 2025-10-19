function currentTime(){
    const now= Date.now();
    document.getElementById("timemillisec").innerText= now;   
}

currentTime()

setInterval(currentTime, 1000)