const { stdin, stdout } = process;

function prompt(question) {
  return new Promise((resolve, reject) => {
    stdin.resume();
    stdout.write(question);
    stdin.on('data', data => resolve(data.toString().trim()));
    stdin.on('error', err => reject(err));
  });
}
var time = 0;
var timearr = [5,4,10];
var earningspertime = [1500,1000,3000];
var solutions = [];
var totalearnings = 0;

function calculatemaxearnings (time,earnings,possiblesolution){
    if(earnings > totalearnings){
        totalearnings = earnings;
        solutions = [];
        solutions.push(possiblesolution.map((ele)=>{return ele}));
    }
    else if(earnings === totalearnings){
        solutions.push(possiblesolution.map((ele)=>{return ele}));
    }
    for(var i=0; i<3;i++){
        if(timearr[i] < time){
            possiblesolution[i] += 1;
            calculatemaxearnings(time - timearr[i],((time-timearr[i])*earningspertime[i]) + earnings,possiblesolution);
            possiblesolution[i] -= 1;
        }
    }
}
const main = async()=>{
        time = parseInt(await prompt("Enter Time: "));
        calculatemaxearnings(time,0,new Array(3).fill(0));   
        console.log("Earnings: $"+totalearnings);
        solutions.forEach((solution,index)=>{
                console.log(index+1+". T: "+solution[0]+" P: "+solution[1]+" C: "+solution[2]);
        });
    }

main();

