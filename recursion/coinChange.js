/*
    Given a number of American cents, compute and return
    an array enumerating all possible ways to represent it.
    
    =>  cents: 5
    <=  [
            {quarters: 0, dimes: 0, nickels: 1, pennies: 0},
            {quarters: 0, dimes: 0, nickels: 0, pennies: 5}
        ]
*/
class Wallet {
    constructor(quarters,dimes,nickels,pennies) {
        this.quarters = quarters;
        this.dimes = dimes;
        this.nickels = nickels;
        this.pennies = pennies;
    }
}
const changeMap = {
    quarter: 25,
    dime: 10,
    nickel: 5,
    penny: 1
}
function coinChange(cents, sum=0, result=[]) {
    let wallet = {};
    for(dem of Object.keys(changeMap)) {
        let target = changeMap[dem];
        while(sum > 0) {
            if(cents%changeMap[dem] === 0) {
                sum -= changeMap[dem];
                if(wallet[dem]) {
                    wallet[dem]++;
                } else {
                    wallet[dem] = 1;
                }
            }
        }
        
    }
}
coinChange(100);
