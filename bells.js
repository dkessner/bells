//
// bells.js
//
// Darren Kessner
// Marlborough School
//


window.onload = function()
{
    let bells = new Bells();
    setInterval(bells.tick.bind(bells), 1000);
}


class Bells {

  constructor() {
    this.chr = document.getElementById("chr");
    this.cmin = document.getElementById("cmin");
    this.csec = document.getElementById("csec");

    this.unmute = document.getElementById("unmute");
    this.unmute.addEventListener("click", this.handleUnmute.bind(this));

    this.bells = new Audio("bells.mp3");

    this.bellTimes = ["083000", "094000",  // Class
                      "102500",  // Community
                      "103000", "114500",  // Class
                                           // Lunch
                      "123000", "134000",  // Class
                      "135000", "150000",  // Class
                      ];

    //this.addTestBellTimes();
    this.bellTimes.sort();
    console.log(this.bellTimes);

    this.updateNextBell();
  }

  addTestBellTimes() {
    let date = new Date();
    date.setSeconds(date.getSeconds() + 10);
    let hr = this.padzero(date.getHours());
    let min = this.padzero(date.getMinutes());
    let sec = this.padzero(date.getSeconds());
    this.bellTimes.push(hr + min + sec);

    date.setSeconds(date.getSeconds() + 10);
    sec = this.padzero(date.getSeconds());
    this.bellTimes.push(hr + min + sec);    

    date.setSeconds(date.getSeconds() + 10);
    sec = this.padzero(date.getSeconds());
    this.bellTimes.push(hr + min + sec);    
  }

  padzero(num) {
    if (num < 10) { num = "0" + num; }
    else { num = num.toString(); }
    return num;
  }

  updateTime() {
    let date = new Date();
    let hr = this.padzero(date.getHours());
    let min = this.padzero(date.getMinutes());
    let sec = this.padzero(date.getSeconds());

    this.chr.innerHTML = hr;
    this.cmin.innerHTML = min;
    this.csec.innerHTML = sec;

    this.now = hr + min + sec;
  }

  updateNextBell() {
    this.updateTime();
    this.nextBell = this.bellTimes[0];
    for (let i=0; i<this.bellTimes.length; i++) {
       if (this.now < this.bellTimes[i]) {
           this.nextBell = this.bellTimes[i];
           break;
       }
    }

    let nextBellText = this.nextBell.slice(0,2) + ":" + this.nextBell.slice(2,4)
        + ":" + this.nextBell.slice(4,6);
    document.getElementById("nextBell").innerHTML = "Next bell " + nextBellText;
  }

  tick() {
    this.updateTime();
    if (this.now == this.nextBell) {
        this.bells.play();
        this.updateNextBell();
    }
  }

  handleUnmute() {
    this.unmute.value = "Sound enabled";
    this.unmute.style.background = "#fff";
    this.unmute.style.color = "#260859"; /* dark purple */
    this.unmute.disabled = true;

    //this.bells.play();
  }
}


