const textBoder = document.querySelector(".text-border");
const textBox = document.querySelector("#text-box");
const originalText = document.querySelector(".original-text p").innerHTML;
const resetButton = document.querySelector('#reset');
const theTimer = document.querySelector(".timer")



// timer for /mins/sec/(10/1000)/milliseconds
var timer=[0,0,0,0];
var interval;
var timerRunning = false;


//helper function to add leading zero in single digit timer
function leadingZero(time){
    
    if (time<=9){
        time = "0" + time;
    }
    return time;
}


//updates timer on display based on timer[3]
function runTimer(){
    
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    
    theTimer.innerHTML = currentTime;
    
    timer[3]++;
    
    //.floor means no decimals
    // convertion to min/sec/10 milli
    timer[0]=Math.floor((timer[3]/100)/60);
    timer[1]=Math.floor((timer[3]/100)-(timer[0]*60)); 
    timer[2]=Math.floor((timer[3])-(timer[1]*100)-timer[0]*6000);
    
}


// start function runs after first keypress in text box
function start(){
    
    let textEnteredLength = textBox.value.length;
    
    // only start timer if textbox value = 0. No text. 
    if (textEnteredLength === 0 && !timerRunning){
        timerRunning = true;
        //interval runs given function every 10 milliseconds
        interval = setInterval(runTimer, 10);
    } 
}

//run spellcheck to update border color
function spellCheck(){
    
    //access enterd text on textbox
    let textEntered = textBox.value;
    //substring function allows to get string from 0 to length value selected
    let originalTextMatch =originalText.substring(0,textEntered.length);
    
    
    //update BORDER COLOR to alert user 
    //green indicates text is complete and free of errors.
    if (textEntered == originalText){
        
        //stops timer, updates color to green, and sets timerRunning boolean to stop timer from re starting if text is deleted in the same session. 
        clearInterval(interval);
        textBoder.style.borderColor = "#00cc00";
        
    }else{
        // blue indicates partially complete with no errors
        if( textEntered == originalTextMatch ){
            textBoder.style.borderColor ="#0099ff";
            // red- there are  errors in the test
        }else{
            textBoder.style.borderColor ="red";
        }
    }
}

//reset button will reset everything
 function reset (){
     
     clearInterval(interval); // making sure there is no interval running in the background
     interval =  null; // clear resource
     timer=[0,0,0,0];
     timerRunning=false; //allows us to start timer again
     textBox.value="";
     theTimer.innerHTML = "00:00:00";
     textBoder.style.borderColor = "gray";
     
     
     
 }

//Event Listeners
textBox.addEventListener("keypress", start, false);
textBox.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
