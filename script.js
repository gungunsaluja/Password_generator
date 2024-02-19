const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[dataIndicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbol = '~!@#$%^&*()_+={[}]|:;"<,>.?/'

// initailly
let password = "";
let passwordLen = 10;
let checkCount=0;
handleSlider();
// set strength circle color to grey
setIndicator("#ccc");
// set passwrd lemgth
function handleSlider(){
    inputSlider.value = passwordLen;
    lengthDisplay.innerText = passwordLen;
    // or kuj?
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLen-min)*100/(max-min)) +"% 100%"

}
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
    // shadow

}
function getRandomIn(min,max){
    return Math.floor(Math.random() * (max-min)) + min;

}
function generateRandomNumber(){
    return getRandomIn(0,9);
}
function generateLowercase(){
      return String.fromCharCode(getRandomIn(97,123));
}
function generateUppercase(){

    return String.fromCharCode(getRandomIn(65,91));
}
    function generateSymbol(){
        const randNum = getRandomIn(0,symbol.length);
        return symbol.charAt(randNum);
    }
    function calcStrength(){
        let hasUpper = false;
        let hasLower = false;
        let hasNum = false;
        let hasSym  = false;
        if(uppercaseCheck.checked) hasUpper = true;
        if(lowercaseCheck.checked) hasLower = true;
        if(numberCheck.checked) hasNum = true;
        if(symbolsCheck.checked) hasSym = true;
        if(hasUpper && hasLower && (hasNum || hasSym) && passwordLen >= 8){
            setIndicator("#0f0");
        }
        else if(
            (hasLower || hasUpper) &&
            (hasNum || hasSym) &&
            passwordLen >= 6
        )
        {
            setIndicator("#ff0");
        }
        else{
            setIndicator("#f00");
        }
    }
    async function copyContent(){
        try{
            await navigator.clipboard.writeText(passwordDisplay.value);
            copyMsg.innerText = "copied";
        }
        catch(e){
            copyMsg.innerText = "Failed";
        }
        // to make copy vala msg visible
       copyMsg.classList.add("active");
       setTimeout(()=>{
        copyMsg.classList.remove("active");
       },2000);
    }
    function shufflePassword(array){
        // fisher yates method
        for(let i=array.length-1;i>0;i--){
            // random j 
            const j=Math.floor(Math.random()* (i+1));
            // swap number at i and j
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        let str = "";
        array.forEach((el) =>(str += el));
        return str;
    }
     function handleCheckBoxChange(){
        checkCount =0;
        allCheckBox.forEach((checkbox)=>{
            if(checkbox.checked){
         checkCount++;
            }
        });
        if(passwordLen<checkCount){
            passwordLen = checkCount;
            handleSlider();
        }
     }
    allCheckBox.forEach((checkbox)=>{
        checkbox.addEventListener('change', handleCheckBoxChange);
    })

    
    inputSlider.addEventListener('input',(e)=>{
        passwordLen = e.target.value;
        handleSlider();
    });

    copyBtn.addEventListener('click',()=>{
        if(passwordDisplay.value){
            copyContent();
        }
    })
    generateBtn.addEventListener('click',()=>{
        // none of the checkbox are selected
        if(checkCount==0)
        return;
    if(passwordLen<checkCount){
        passwordLen = checkCount;
        handleSlider();
    }
    // lets start the journey to find new password
    console.log("Starting the journey")
    password = "";

    // let's put the stuff mentioned by checkboxes
    // if(uppercaseCheck.checked){
    //     password += generateUppercase();

    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowercase();
        
    // }
    // if(numberCheck.checked){
    //     password += generateRandomNumber();
        
    // }
    // if(symbolsCheck.Check.checked){
    //     password += generateSymbol(); 
        
    // }
    let funarr = [];

    if(uppercaseCheck.checked)
        funarr.push(generateUppercase);
    if(lowercaseCheck.checked)
        funarr.push(generateLowercase);
    if(numberCheck.checked)
        funarr.push(generateRandomNumber);
    if(symbolsCheck.checked)
        funarr.push(generateSymbol);


    // compalsary additions
    for(let i=0;i<funarr.length;i++){
        password+=funarr[i]();

    }
    console.log("compalsary addition done");
    // remaining length;

    for(let i=0;i<passwordLen-funarr.length;i++){
        let randin = getRandomIn(0,funarr.length);
        console.log("Compansary addtion done");
        password += funarr[randin]();
    }
    console.log("remaining addtion done");
    // shuffel the password
    password = shufflePassword(Array.from(password)); 
    // show
    console.log("shuffleing done");
    passwordDisplay.value = password;
    console.log("UI addtion done");
    calcStrength();
    })
// handle slider ka use  sirf itta h ki slider ko ui pr reflect krata hai
// remove old password
