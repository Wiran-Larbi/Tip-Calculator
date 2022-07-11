//? Necessary Input Fields
const Bill = document.getElementById("bill-input");
const TipBtns = document.querySelectorAll(".tip");
const TipBtnsArr = Array.from(TipBtns);
const CustomTip = document.getElementById("custom");
const NbPeople = document.getElementById("number-people-input");
const Tip_Amount = document.querySelector(".tip-amount-value");
const Total = document.querySelector(".total-value");
const errorMSG = document.querySelector(".error-msg");
const RESET = document.querySelector(".reset");
let BillVal = 0;
var TipVal = 0;
let NB = 1;

RESET.addEventListener("click", reset);

Bill.addEventListener("input", setBillValue);

TipBtnsArr.forEach(btn => {
     btn.addEventListener("click",handleTipClick);
});

CustomTip.addEventListener("input",setCustomTip);

NbPeople.addEventListener("input",setNbPeople);

function valideFloat(s) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}    
function valideInt(s) {
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}
function setBillValue() {
       if(Bill.value.includes(",")){
           Bill.value = Bill.value.replace(",",".");
       }
       if(!valideFloat(Bill.value))
         Bill.value = Bill.value.substr(0,Bill.value.length-1);
        
       BillVal = parseFloat(Bill.value);
       if(BillVal  == 0 || Bill.value.length == 0){
        unset()
       }else{
           Display();
       }
}
function handleTipClick(event) {
        //? Eliminate The Active State
        TipBtnsArr.forEach(btn => {
            btn.classList.remove("clicked");
               //! set Active State
           if(event.target.innerHTML == btn.innerHTML){
               
               btn.classList.add("clicked");
               TipVal = parseFloat(btn.value);
           }

        });
        Display();
       
}
function setCustomTip() {
   
      if(CustomTip.value == "") return;
      if(!valideInt(CustomTip.value)){
        CustomTip.value = CustomTip.value.substr(0,CustomTip.value.length-1);
      }
      if(parseInt(CustomTip.value)> 100 ){
        CustomTip.value = CustomTip.value.substr(0,CustomTip.value.length-1);
      }
      TipVal = (parseFloat(parseInt(CustomTip.value) / 100));
      //! Delete Active State From Btns
      TipBtnsArr.forEach(btn => {
        btn.classList.remove("clicked");
       });
      Display();     
} 

function setNbPeople() {
    if(!valideInt(NbPeople.value))
        NbPeople.value = NbPeople.value.substr(0, NbPeople.value.length-1);
    
    
    if(parseInt(NbPeople.value) == 0){
        errorMSG.classList.remove("hide");
        NbPeople.style.border = "2px solid #F24C4C";
    }else{
        NB = parseInt(NbPeople.value);
        errorMSG.classList.add("hide");
        NbPeople.style.border = "2px solid transparent";
    }
   Display();
    
}

function Display() {

       if(NB >= 1 && BillVal >0 && TipVal >= 0.0){
        Tip_person = parseFloat((BillVal * TipVal) / NB);
        Total_person = parseFloat((BillVal * (TipVal + 1)) / NB);
          
         Tip_Amount.innerHTML = `$${Tip_person.toFixed(1)}`;
         Total.innerHTML = `$${Total_person.toFixed(1)}`;
       }
       RESET.classList.add("filled");
}
function reset() {
      unset();
      deActive();
      Bill.value = '';
      CustomTip.value = '';
      NbPeople.value = '';
      BillVal = 0;
      TipVal = 0;
      NB = 0;
      RESET.classList.remove("filled");
      RESET.classList.add("empty");
}

function unset() {
      Tip_Amount.innerHTML = `$0.00`;
      Total.innerHTML = `$0.00`;
}
function deActive() {
     TipBtnsArr.forEach(btn => {
           btn.classList.remove("clicked");
     })
}