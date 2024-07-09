test();

function test(){
    calculateDimB('20', 2, '200')
}

function calculateDimA(boltDiameter){    
    switch(boltDiameter){
        case '20':
            return 30;
        case '24':
            return 35;
        case '30':
            return 45;
    }
}

function calculateDimB(boltDiameter, boltsPerRow, plateWidth){

    switch(boltDiameter){
        case '20':
            var minEdgeDist = 30;
            var minBoltCC = 60;
            break;
        case '24':
            var minEdgeDist = 35;
            var minBoltCC = 70;
            break;
        case '30':
            var minEdgeDist = 45;
            var minBoltCC = 90;
            break;
    }

    let availableBoltWidth = plateWidth - (2 * minEdgeDist)
    if(boltsPerRow > 1){
        boltSpaces = boltsPerRow - 1
    }
    else{
        boltSpaces = boltsPerRow
    }

    let boltCC = availableBoltWidth / boltSpaces
    return boltCC
}