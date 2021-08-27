//hat game by Andy Teo

const prompt = require('prompt-sync')({sigint: true});

let rowNum = 10, colNum = 10;
let map = [];
let myLocation = [0,0];
let hatLocation = [0,0];
let holeChance = 0.3;
let win = false;
let input = '';

do {         //initialize hatLocation & not at [0,0]
hatLocation = [Math.floor(Math.random()*rowNum), Math.floor(Math.random()*colNum)];
} while (hatLocation[0]==0 && hatLocation[1]==0);

function initializeMap () {
    for (let x=0; x<rowNum; x++) {
        map[x]=[];
        for (let y=0; y<colNum; y++) {
            if (x==0 && y==0) {
                map[x][y]='░';
            }
            else if (x==hatLocation[0] && y==hatLocation[1]) {  //set hat location
                map[x][y]='^';
            }
            else if (Math.random()<holeChance) {  //set hole location
                map[x][y]='O';
            }
            else {
                map[x][y]='░';
            }
            
        }
    }
}

function printMap () {
    for (let x=0; x<rowNum; x++) {
        let mapLine="";
        for (let y=0; y<colNum; y++) {
            if (x==myLocation[0] && y==myLocation[1]) {  //prints * at myLocation
                mapLine = mapLine + '*';
            }
            else {
                mapLine = mapLine + map[x][y];
            }
            if (y==(colNum-1)) {
                console.log(mapLine);   //prints out one line of map
            }
        }
    }
}

initializeMap();    //build initial map

while (!win) {  //keep playing until win
    console.log();
    console.log('Welcome to hat game! Press keys (U)p, (D)own, (L)eft, (R)ight to move, (Q) to quit');
    printMap();
    input = prompt('Your move? ');  //ask for the truth
    switch (input) {
        case 'Q':
            win=true;
            break;
        case 'U':
            if (myLocation[0]==0) {
                console.log('You reached the top');
            }
            else {
                myLocation[0]--;
            }
            break;
        case 'D':
            if (myLocation[0]==(rowNum-1)) {
                console.log('You reached the bottom');
            }
            else {
                myLocation[0]++;
            }
            break;
        case 'L':
            if (myLocation[1]==0) {
                console.log('You reached the left');
            }
            else {
                myLocation[1]--;
            }
            break;
        case 'R':
            if (myLocation[1]==(colNum-1)) {
                console.log('You reached the right');
            }
            else {
                myLocation[1]++;
            }
            break;  
    }
    if ((myLocation[0]==hatLocation[0]) && (myLocation[1]==hatLocation[1])) {   //check win
        console.log('You win!');
        win=true;
    }
    else if (map[myLocation[0]][myLocation[1]]=='O') {  //check hole
        console.log('You fell into the hole!');
        win=true;
    }
};