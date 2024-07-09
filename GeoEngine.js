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

function calculateDimC(boltDiameter){
    switch(boltDiameter){
        case '20':
            return 40;
        case '24':
            return 50;
        case '30':
            return 60;
    }
}

function calculateDimD(boltsPerRow, numberBolts, boltDiameter){
    if(numberBolts > boltsPerRow){
        var multipleRows = true;
        if(boltsPerRow > 2){
            const resultImage = document.getElementById("resultImage")
            resultImage.src = 'img/optionC.png'
        }
        else{
            const resultImage = document.getElementById("resultImage")
            resultImage.src = 'img/optionB.png'
        }
    }
    else{
        var multipleRows = false;
        if(boltsPerRow > 2){
            const resultImage = document.getElementById("resultImage")
            resultImage.src = 'img/optionD.png'
        }
        else{
            const resultImage = document.getElementById("resultImage")
            resultImage.src = 'img/optionA.png'
        }
    }

    if(multipleRows = true){
        switch(boltDiameter){
            case '20':
                return '60mm';
            case '24':
                return '70mm';
            case '30':
                return '90mm';
        }
    }
    else{
        return "N/A"
    }
}

function imageSelector(boltsPerRow){
    const resultImage = document.getElementById("resultImage")

    
    if(boltsPerRow = 2){
        resultImage.src = 'img/optionA.png'
    }
}