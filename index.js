
   const width = window.innerWidth
   if (width > 500) {
    $('body').ripples({
      dropRadius: 30,
      perturbance: 1,
      resolution:512
    });
   }

  var interval ;
   let data = []
   function navigate(id){
    interval = setInterval(scrollVertical,30,id)
   }
   
 function scrollVertical (id){
  
    var targetSectionCordinate = document.getElementById(id).getBoundingClientRect()
    if (targetSectionCordinate.top <= 50){
        clearInterval(interval);
        return
    }
    window.scrollBy(0,50)
 }
  function inVisible(){
    if(scrollY >= 174){
       document.getElementById('scr').style.display = "none"
    }
    else{
      document.getElementById('scr').style.display = "block"
    }
  }
  window.addEventListener('scroll',inVisible)
  
 function sendData() {
  const InputNumber = document.getElementById('text-number')
    if (InputNumber.value === "" && InputNumber.value.length < 10 ){
      alert("Enter Valid Number")
      return
    }
   const AllInput = document.querySelectorAll('.main input')  
   for (let Input of AllInput){
    data.push(Input.value)
   }
   const myvalue = {
     "name":data[0],
     "websiteUrl":data[1],
     "phone":data[2],
     "bussinesOperatingSince":data[3],
     "email":data[4],
     "bussinessGoal":data[5],
     "brandName":data[6],
     "howDidHear":data[7],
     "monthlyAdvertisngBudget":data[8],
     "anythingElse":data[9],
   }
  const myReq = JSON.stringify( {
    "subject": "SKYDREAMERS",
      "data": myvalue
  })
     console.log(myvalue)
   AllInput.forEach(input => input.value = "")
  const requestOption = {
    method: "POST",
    headers : {
      'Content-Type': 'application/json', 
      'Accept': 'application/json'
    },
    body:myReq,
 }
    fetch('https://lead-management-api.1click.tech/leads',requestOption)
    .then((res) => {res.json()
     console.log(res)
     Swal.fire(
      'Deatils Submitted',
      'We will get touch with you soon',
      'success'
    )
   })
 }

 function ValidateNumber(event){
  const phoneNumber = document.getElementById('text-number')
  const number = event.target.value.replace(/\D/g, '')
  console.log(number)
   phoneNumber.value = number
 }

 (function(){
  function id(v){ return document.getElementById(v); }
  function loadbar() {
    var ovrl = id("overlay"),
        prog = id("progress"),
        stat = id("progstat"),
        img = document.images,
        c = 0,
        tot = img.length;
    if(tot == 0) return doneLoading();

    function imgLoaded(){
      c += 1;
      var perc = ((100/tot*c) << 0) +"%";
      prog.style.width = perc;
      //  stat.innerHTML = "Loading "+ perc;
      if(c===tot) return doneLoading();
    }
    function doneLoading(){
      setTimeout(function(){ 
        ovrl.style.opacity = 0;
        ovrl.style.display = "none";
      }, 1200);
      typeWriter()
    }
    for(var i=0; i<tot; i++) {
      var tImg     = new Image();
      tImg.onload  = imgLoaded;
      tImg.onerror = imgLoaded;
      tImg.src     = img[i].src;
    }    
  }
  document.addEventListener('DOMContentLoaded', loadbar, false);
}());

  let title =  document.querySelector('.main_heading');
  const page = document.getElementById('page')
  const Html = document.getElementsByTagName('html')
let name1 = "WELCOME TO THE CLUB"
let index = 1;
  const typeWriter = () => {
  let new_title = name1.slice(0, index);
  title.innerText = new_title;
  if(index > name1.length){
    page.style.opacity = "0";
    document.body.style.overflow = "visible";
    setInterval(() => {
      page.style.display = "none"
    }, 1000);
   
  }
  else{
    index++;
    document.body.style.overflow = "hidden";
  }
  setTimeout(() => typeWriter(),100)
  }

  typeWriter()
