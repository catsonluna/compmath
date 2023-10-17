const levels = {
    level1: [
        "LIMIT(MIN(1) MAX(20))"
        ,
        "NUM",
        "EQ{+-}",
        "NUM",
    ],
    level2: [
        "LIMIT(MIN(1) MAX(20))"
        ,
        "NUM",
        "EQ{+-}",
        "NUM",
        "EQ{+-}",
        "NUM",
    ],
    level3: [
        "LIMIT(MIN(10) MAX(40))"
        ,
        "NUM",
        "EQ{+-}",
        "NUM",
        "EQ{+-}",
        "NUM",
        "EQ{+-}",
        "NUM",
    ],
    level4: [
        "LIMIT(MIN(2) MAX(0))"
        ,
        "NUM",
        "EQ{*}",
        "NUM",
    ],
    level5: [
        "LIMIT(MIN(1) MAX(20))"
        ,
        "NUM",
        "EQ{/}",
        "NUM",
    ],
    level6: [
        "LIMIT(MIN(4) MAX(40))"
        ,
        "NUM",
        "EQ{*}",
        "NUM",
        "EQ{/}",
        "NUM",],
    level7: [
        "LIMIT(MIN(5) MAX(50))"
        ,
        "NUM",
        "EQ{*}",
        "NUM",
        "EQ{/}",
        "NUM",
        "EQ{*}",
        "NUM",
    ],
    level8: [
        "LIMIT(MIN(10) MAX(100))"
        ,
        "NUM",
        "EQ{*}",
        "NUM",
        "EQ{/}",
        "NUM",
        "EQ{*}",
        "NUM",
        "EQ{/}",
        "NUM",
    ],
    level9: [
        "LIMIT(MIN(1) MAX(10))"
        ,
        "NUM",
        "EQ{+-*/}",
        "NUM",
        "LIMIT(MIN(1) MAX(10))"
    ],
    level10: [
        "LIMIT(MIN(10) MAX(50))"
        ,
        "NUM",
        "EQ{+-*/}",
        "NUM",
        "EQ{+-*/}",
        "NUM",
    ],
    level11: [
        "LIMIT(MIN(10) MAX(50))"
        ,
        "NUM",
        "EQ{+-*/}",
        "NUM",
        "EQ{+-*/}",
        "NUM",
        "EQ{+-*/}",
        "NUM",
    ],
    level12: [
        "LIMIT(MIN(10) MAX(50)",
        "NUM",
        "EQ{+-*/}",
        "NUM",
        "EQ{+-*/}",
        "NUM",
        "EQ{+-*/}",
        "NUM",
        "EQ{+-*/}",
        "NUM",],
    level13: [
        "LIMIT(MIN(1) MAX(100)",
        "NUM",
        "EQ{+-*/}",
        "(",
        "NUM",
        "EQ{+-*/}",
        "NUM",
        ")",
    ],
    level14: [
        "LIMIT(MIN(1) MAX(100)",
        "NUM",
        "EQ{+-*/}",
        "(",
        "NUM",
        "EQ{+-*/}",
        "NUM",
        ")",
        "EQ{+-*/}",
        "NUM",
    ],
    level15: [
        "LIMIT(MIN(1) MAX(100)",
        "NUM",
        "EQ{+-*/}",
        "(",
        "(",
        "NUM",
        "EQ{+-*/}",
        "NUM",
        ")",
        "EQ{+-*/}",
        "NUM",
        ")",
        "EQ{+-*/}",
        "NUM",
        ]
}

function getEqueation(level: number) {
    switch (level) {
        case 1:
            return levels.level1;
        case 2:
            return levels.level2;
        case 3:
            return levels.level3;
        case 4:
            return levels.level4;
        case 5:
            return levels.level5;
        case 6:
            return levels.level6;
        case 7:
            return levels.level7;
        case 8:
            return levels.level8;
        case 9:
            return levels.level9;
        case 10:
            return levels.level10;
        case 11:
            return levels.level11;
        case 12:
            return levels.level12;
        case 13:
            return levels.level13;
        case 14:
            return levels.level14;
        case 15:
            return levels.level15;
        default:
            return levels.level1;
}
}

export function generateEquation(level: number) {
    let equation = getEqueation(level);
    let min:number;
    let max: number;
    let equationString = "";
    equation.forEach((element: string) => {
        if(element.startsWith("LIMIT")){
            let limit = getLimit(element);
            min = parseInt(limit.min);
            max = parseInt(limit.max);
        }
        if(element.startsWith("NUM")){
            let num = getRandomInt(min, max);
            equationString += num;
        }
        if(element.startsWith("EQ")){
            let eq = parseEquation(element);
            equationString += eq;
        }
        if(element.startsWith("(")){
            equationString += "(";
        }
        if(element.startsWith(")")){
            equationString += ")";
        }
    });
    console.log("Equation: " + equationString);
    // if the eval is .00 then only return int 
    let result = eval(equationString).toFixed(2)
    if(result.endsWith(".00")){
        result =  parseInt(result);
    }
    console.log("Result: " + result);
    console.log("\n");
}

function getLimit(limit: string ) {
    let min = limit.split("MIN(")[1].split(")")[0];
    let max = limit.split("MAX(")[1].split(")")[0];
    return { min: min, max: max };
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function parseEquation(equation: string) {
    var regex = /EQ{(.*?)}/g;
    var matches = equation.match(regex);
    if (matches == null) {
        return equation.split(" ");
    }
    var randomIndex = Math.floor(Math.random() * matches.length);
    var selectedMatch = matches[randomIndex];
    var innerString = selectedMatch.slice(3, -1); // Remove 'EQ{' and '}'
    var randomCharIndex = Math.floor(Math.random() * innerString.length);
    return innerString[randomCharIndex]; // Return a random character from the inner string
}


// for(let i = 1; i <= 15; i++){
//     console.log("Level: " + i);
//     generateEquation(i);
// }