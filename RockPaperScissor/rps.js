var userScore_span = document.getElementById("userscore");
var botScore_span = document.getElementById("botscore");
let us=0;
let bs=0;
var resultat_div=document.getElementById("resultat");
var rock_div=document.getElementById("r");
var paper_div=document.getElementById("p");
var scissor_div=document.getElementById("s");
let color=""
let shadow=""



rock_div.addEventListener('click', function(){
    var botResult=Math.floor(Math.random()*3)+1
if(botResult===1){
    us++;
    userScore_span.innerHTML=us;
    resultat_div.innerHTML="Stein slår saks! Du vinner!";
    color= "#4dcc7d";
    shadow= "#31b43a";
    r.style.borderColor= color;
    r.style.boxShadow= "0 0 10px"+shadow
    setTimeout(function(){r.style.borderColor= "white"},1000)
    setTimeout(function(){r.style.boxShadow= "none"},1000)
}
else if(botResult===2){
    bs++;
   botScore_span.innerHTML=bs;
    resultat_div.innerHTML="Du ble slått av papir :(";
    color="#fc121b";
    shadow="#d01115";
    r.style.borderColor= color;
    r.style.boxShadow= "0 0 10px"+shadow;
    setTimeout(function(){r.style.borderColor= "white"},1000);
    setTimeout(function(){r.style.boxShadow= "none"},1000);
}
else{
    resultat_div.innerHTML="Stein mot stein! Det ble uavgjort!";
    color="#464647";
    shadow="#25292b";
    r.style.borderColor= color;
    r.style.boxShadow= "0 0 10px"+shadow;
    setTimeout(function(){r.style.borderColor= "white"},1000);
    setTimeout(function(){r.style.boxShadow= "none"},1000);
}

})
paper_div.addEventListener('click', function(){
    const botResult=Math.floor(Math.random()*3)+1

if(botResult===1){
    us++;
    userScore_span.innerHTML=us;
    resultat_div.innerHTML="Papir slår stein! Du vinner!";
    color= "#4dcc7d";
    shadow= "#31b43a";
    p.style.borderColor= color;
    p.style.boxShadow= "0 0 10px"+shadow
    setTimeout(function(){p.style.borderColor= "white"},1000)
    setTimeout(function(){p.style.boxShadow= "none"},1000)



}
else if(botResult===2){
    bs++;
   botScore_span.innerHTML=bs;
    resultat_div.innerHTML="Du ble slått av saks :(";
    color="#fc121b";
    shadow="#d01115";
    p.style.borderColor= color;
    p.style.boxShadow= "0 0 10px"+shadow;
    setTimeout(function(){p.style.borderColor= "white"},1000);
    setTimeout(function(){p.style.boxShadow= "none"},1000);
}
else{
    resultat_div.innerHTML="Papir mot papir! Det ble uavgjort!";
    color="#464647";
    shadow="#25292b";
    p.style.borderColor= color;
    p.style.boxShadow= "0 0 10px"+shadow;
    setTimeout(function(){p.style.borderColor= "white"},1000);
    setTimeout(function(){p.style.boxShadow= "none"},1000);
}})

scissor_div.addEventListener('click', function(){
    const botResult=Math.floor(Math.random()*3)+1

if(botResult===1){
    us++;
    userScore_span.innerHTML=us;
    resultat_div.innerHTML="Saks slår papir! Du vinner!";
    color= "#4dcc7d";
    shadow= "#31b43a";
    s.style.borderColor= color;
    s.style.boxShadow= "0 0 10px"+shadow
    setTimeout(function(){s.style.borderColor= "white"},1000)
    setTimeout(function(){s.style.boxShadow= "none"},1000)



}
else if(botResult===2){
    bs++;
   botScore_span.innerHTML=bs;
    resultat_div.innerHTML="Du ble slått av stein :(";
    color="#fc121b";
    shadow="#d01115";
    s.style.borderColor= color;
    s.style.boxShadow= "0 0 10px"+shadow;
    setTimeout(function(){s.style.borderColor= "white"},1000);
    setTimeout(function(){s.style.boxShadow= "none"},1000);
}
else{
    resultat_div.innerHTML="Saks mot saks! Det ble uavgjort!";
    color="#464647";
    shadow="#25292b";
    s.style.borderColor= color;
    s.style.boxShadow= "0 0 10px"+shadow;
    setTimeout(function(){s.style.borderColor= "white"},1000);
    setTimeout(function(){s.style.boxShadow= "none"},1000);
}})
