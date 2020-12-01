function pairs(ar) {
    let count = 0;
    if(ar.length%2 != 0) ar.splice(ar.length, 1);
    for(let i = 0; i<ar.length; i+=2) {
        if(ar[i]-ar[i+1] == 1 || ar[i]-ar[i+1] == -1){
            count++;
        }
        
    }
}

let str = "SANNSYNLIGHETSTETTHETSFUNKSJONENE"
console.log(str.length)