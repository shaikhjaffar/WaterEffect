images = ["./images/Asset 12@3x.png","./images/Apollo-Tyre-Logo-PNG-HD-New 1.png", "./images/Big_Logo.svg", "./images/dubai.png","./images/Asset 12@3x.png", "./images/Apollo-Tyre-Logo-PNG-HD-New 1.png", "./images/Big_Logo.svg", "./images/dubai.png",];
const number_of_logos = images.length ;
console.log(window.innerWidth)
const spacing = (window.innerWidth/ number_of_logos)*10;
const duration = (number_of_logos*spacing);
var int_cnt = -1;
var marquee = document.getElementById("hold_logos");
partner_interval = setInterval(function() {
    int_cnt++;
    if(int_cnt < number_of_logos) {
           const img = document.createElement("img");
           img.className = "logo-images";
           img.src = images[int_cnt];
           marquee.append(img);
    }
}, spacing/0.8);

setTimeout(function() {
    clearInterval(partner_interval);
}, duration+10);