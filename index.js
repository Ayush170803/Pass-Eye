let slider=document.querySelector('#slider');
let pwdlength=document.querySelector('#passwordlength');
let pwdgenerated=document.querySelector('#pwdgenerated');
let copybutton=document.querySelector('#copybutton');
let uppercase=document.querySelector('#uppercase');
let lowercase=document.querySelector('#lowercase');
let symbols=document.querySelector('#symbols');
let numbers=document.querySelector('#numbers');
let allcheckbox=document.querySelectorAll('input[type=checkbox]')
let circle=document.querySelector('#circle');
let passwordbutton=document.querySelector('#passwordbutton');
let copybuttonmessage=document.querySelector('#copybuttonmessage');



let password="";
let passwordlengthinitially=10;
let checkcount=0;
let setofsymbols="~,`@!#$%^&*()_-+={}[]|:;'><.,?/"

console.log(pwdgenerated.value);
handleslider();
function handleslider()
{
    slider.value=passwordlengthinitially;
    passwordlength.innerText=passwordlengthinitially;
}

function setindicator(color)
{
    circle.style.backgroundColor=color;
}


function getrandominteger(min,max)
{
   return (Math.floor(Math.random()*(max-min)))+min;
}

function getrandomnumber()
{
    return getrandominteger(0,9);
}

function getuppercase()
{
    return String.fromCharCode(getrandominteger(65,91));
}
function getlowercase()
{
    return String.fromCharCode(getrandominteger(97,123));
}
function getsymbols()
{
   let random=getrandominteger(0,setofsymbols.length);
   return setofsymbols.charAt(random);
}

function setIndicator(color)
{
    circle.style.backgroundColor = color;
}

function getStrength()
{
    let uppercasePresent=false;
    let lowercasePresent=false;
    let symbolsPresent=false;
    let numbersPresent=false;

    if(uppercase.checked)
    {
        uppercasePresent=true;
    }

    if(lowercase.checked)
    {
        lowercasePresent=true;
    }

    if(symbols.checked)
    {
        symbolsPresent=true;
    }

    if(numbers.checked)
    {
        numbersPresent=true;
    }

    let strengthColor='#cccccc'; 

  
    if (checkCount === 4 && slider.value>=8 || (checkCount === 3 && slider.value>10))
    {
        strengthColor = '#347474'; 
        pwdgenerated.style.color="#347474";
    } 
    else if (checkCount === 3 && slider.value<=10 || (checkCount === 2 && slider.value>=15) || (checkCount === 4 && slider.value<8))
    {
        strengthColor = '#42b883'; 
        pwdgenerated.style.color="#42b883";
    } 
    else if (checkCount === 2 ) {
        strengthColor = '#fdb44b'; 
        pwdgenerated.style.color="#fdb44b";
    } 
    else if (checkCount === 1) {
        strengthColor = 'red'; 
        pwdgenerated.style.color="red";
    }

    setIndicator(strengthColor);
}


function handleCheckboxChange(){
    checkCount = 0;
    allcheckbox.forEach(function (checkbox) {
        if(checkbox.checked){
            checkCount++;
        }
    });
    getStrength();
}


allcheckbox.forEach(function(checkbox){
    checkbox.addEventListener('change', handleCheckboxChange);
});

slider.addEventListener('input',function()
{
    pwdlength.innerText = slider.value;
});

passwordbutton.addEventListener('click',function ()
{
    if (checkCount===0)
    {
        return; 
    }
    pwdgenerated.value = password;
    getStrength(); 
});
async function copyfunction()
{
    try
    {
        await navigator.clipboard.writeText(pwdgenerated.value);
        copybuttonmessage.innerText="copied";
        setTimeout(()=>
            {copybuttonmessage.innerText=""
            },2000);
    }
    catch
    {
        copybutton.textContent="failed";
    }

    copybuttonmessage.classList.add("active");

setTimeout(function()
{
    copybuttonmessage.classList.remove("active");
},2000);
}

copybutton.addEventListener('click',function()
{
    if(pwdgenerated.value)
    {
    copyfunction();
    }
});

slider.addEventListener('input',function()
{
        passwordlength.innerText=slider.value;
})


function handlecheckboxchange()
{
    checkcount=0;
    allcheckbox.forEach(function(checkbox)
{
    if(checkbox.checked)
        {
            checkcount++;
        }
})

if(checkcount>slider.value)
    {
        slider.value=checkcount;
        passwordlength.innerText=checkcount;
    }
}
allcheckbox.forEach(function(checkbox)
{
    checkbox.addEventListener('change',handlecheckboxchange); // change means ticked and unticked both
})





passwordbutton.addEventListener('click',function()
{
    if(checkcount==0)
        {
            return;
        }
    if(checkcount>slider.value)
        {
            slider.value=checkcount;
            passwordlength.innerText=checkcount;
        }

    password="";

//other logic
    // if(uppercase.checked)
    //     {
    //         password+=getuppercase();
    //     }

    // if(lowercase.checked)
    // {
    //         password+=getlowercase();
    // }
    // if(numbers.checked)
    // {
    //     password+=getrandomnumber();
    // }
    // if(symbols.checked)
    // {
    //     password+=getsymbols();
    // }


    let funcarr=[];
    if(uppercase.checked)
        funcarr.push(getuppercase);

    if(lowercase.checked)
        funcarr.push(getlowercase);

    if(symbols.checked)
        funcarr.push(getsymbols);

    if(numbers.checked)
        funcarr.push(getrandomnumber);

    //now we add the random letters from checked that was pushed into funcarr to add it to password;
    for(let i=0;i<funcarr.length;i++)
        {
            password+=funcarr[i]();
        }
    for(let i=0;i<passwordlength.innerText-funcarr.length;i++)
        {
            let randomindex=getrandominteger(0,funcarr.length);
            password+=funcarr[randomindex]();
        }
        password=shufflepassword(Array.from(password));
        pwdgenerated.value=password;

})

function shufflepassword(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
}
