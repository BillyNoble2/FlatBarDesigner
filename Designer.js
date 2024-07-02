function submitForm(){
    //Get values from the form.
    let tensionLoad = document.getElementById('tensionLoad').value;
    let plateWidth = document.getElementById('plateWidth').value;
    let plateThickness = document.getElementById('plateThickness').value;
    let plateGrade = document.getElementById('plateGrade').value;
    let boltDiameter = document.getElementById('preferredBolt').value;
    let boltGrade = document.getElementById('boltGrade').value;

    //Create object to be converted to JSON.
    let designData = {
        TensionLoad: tensionLoad,
        plateWidth: plateWidth,
        plateThickness: plateThickness,
        plateGrade: plateGrade,
        boltDiameter: boltDiameter,
        boltGrade: boltGrade
    };

    let jsonData = JSON.stringify(designData);

    console.log(jsonData);
    var grossArea = calculateGrossArea(plateWidth, plateThickness);
    console.log("GrossArea = " + grossArea);

    var boltHoleDia = determineBoltHoleDia(boltDiameter);
    console.log("BoltHoleDiameter = " + boltHoleDia);

    var numberBolts = calculateNumberBolts(tensionLoad, boltDiameter, boltGrade);
    console.log("NumberOfBolts = " + numberBolts);

    var boltsPerRow = determineBoltsInRow(boltDiameter, numberBolts, plateWidth);
    console.log("BoltsPerRow = " + boltsPerRow);

    var netArea = calculateNetArea(plateWidth, plateThickness, boltsPerRow, boltHoleDia);
    console.log("NetArea = " + netArea);

    var boltShearResTotal = calculateBoltShearRes(boltDiameter, numberBolts);
    console.log("BoltRes = " + boltShearResTotal)

    var fu = determinePlateFu(plateThickness, plateGrade);
    console.log("PlateUltimateTensileResistance = " + fu)

    var tensionResistance = calculateTensionResistance(netArea, fu);
    console.log("TensionResistance = " + tensionResistance)

    var acceptable = determineAcceptable(tensionLoad, tensionResistance);
    console.log("Acceptable = " + acceptable)

    displayResults(tensionLoad, netArea, tensionResistance, boltShearResTotal);
}

function calculateBoltShearRes(boltDiameter, numberBolts){
    switch(boltDiameter){
        case '20':
            boltShearRes = 94.1;
            break;
        case '24':
            boltShearRes = 136;
            break;
        case '30':
            boltShearRes = 215;
            break;
        default:
            console.error('Unsupported bolt diameter:', boltDiameter)
            boltShearRes = null;
    }
    var totalShearRes = (boltShearRes * numberBolts)
    return totalShearRes;
}

function calculateNumberBolts(tensionLoad, boltDiameter, boltGrade){
    let boltShearRes = 0;

    switch(boltDiameter){
        case '20':
            boltShearRes = 94.1;
            break;
        case '24':
            boltShearRes = 136;
            break;
        case '30':
            boltShearRes = 215;
            break;
        default:
            console.error('Unsupported bolt diameter:', boltDiameter)
            boltShearRes = null;
    }
    let numberBolts = tensionLoad / boltShearRes;
    numberBolts = Math.ceil(numberBolts);
    return numberBolts;
}

function determineBoltHoleDia(boltDiameter){
    switch(boltDiameter){
        case '20':
            return 22;
        case '24':
            return 26;
        case '30':
            return 33;
    }
}

function calculateGrossArea(plateWidth, plateThickness){
    return (plateWidth * plateThickness)
}

function calculateNetArea(plateWidth, plateThickness, boltsPerRow, boltHoleDia) {
    // Convert inputs to numbers to ensure correct calculations
    plateWidth = Number(plateWidth);
    plateThickness = Number(plateThickness);
    boltsPerRow = Number(boltsPerRow);
    boltHoleDia = Number(boltHoleDia);

    // Check if any of the conversions failed (resulting in NaN)
    if (isNaN(plateWidth) || isNaN(plateThickness) || isNaN(boltsPerRow) || isNaN(boltHoleDia)) {
        console.log("Invalid input: all inputs must be numbers");
        return null;
    }

    // Calculate the net area
    let netArea = (plateWidth * plateThickness) - (boltsPerRow * boltHoleDia * plateThickness);

    return netArea;
}

function determineBoltsInRow(boltDiameter, numberBolts, plateWidth) {
    switch(boltDiameter) {
        case '20': 
            if (plateWidth >= 180 && numberBolts % 3 == 0) {
                console.log("YOU CAN HAVE 3 BOLTS PER ROW");
                return 3;
            }
            if (plateWidth >= 180 && numberBolts % 2 == 0){
                console.log("YOU CAN HAVE 2 BOLTS PER ROW")
                return 2;
            }
            if (plateWidth < 180 && numberBolts % 2 == 0) {
                console.log("YOU CAN HAVE 2 BOLTS PER ROW");
                return 2;
            }
            break; 
        case '24':
            if (plateWidth >= 210 && numberBolts % 3 == 0){
                console.log("YOU CAN HAVE 3 BOLTS PER ROW")
                return 3;
            }
            if (plateWidth >= 210 && numberBolts % 2 ==0){
                console.log("YOU CAN HAVE 2 BOLTS PER ROW")
                return 2;
            }
            if (plateWidth < 210 && numberBolts % 2 == 0){
                console.log("YOU CAN HAVE 2 BOLTS PER ROW")
                return 2;
            }
        case '30':
            if (plateWidth >= 300 && numberBolts % 3 == 0){
                console.log("YOU CAN HAVE 3 BOLTS PER ROW")
                return 3;
            }
            if (plateWidth >= 300 && numberBolts % 2 ==0){
                console.log("YOU CAN HAVE 2 BOLTS PER ROW")
                return 2;
            }
            if (plateWidth < 300 && numberBolts % 2 == 0){
                console.log("YOU CAN HAVE 2 BOLTS PER ROW")
                return 2;
            }
        default:
            console.log("Invalid bolt diameter or conditions not met");
            return null; 
    }
}

function initialBoltGeo(boltDiameter, plateWidth, numberBolts){
    let boltPatternWidth = 0;

    switch(boltDiameter){
        case '20':
            // min edge x 2 + min pitch
            boltPatternWidth = 120;
        case '24':
            boltPatternWidth = 140;
        case '30':
            boltPatternWidth = 210;
        default:
            console.error('An error has occured when getting initial bolt geometry');
    }

    if(boltPatternWidth > plateWidth){
        console.error("Bolt pattern too wide for plate.")
        return null;
    }
    return boltPatternWidth;
}

function determinePlateFu(plateThickness, plateGrade) {
    // Convert plateThickness to a number to ensure correct calculations
    plateThickness = Number(plateThickness);

    // Check if the conversion to number was successful
    if (isNaN(plateThickness)) {
        console.log("Invalid input: plateThickness must be a number");
        return null;
    }

    switch(plateGrade) {
        case '355':
            if (plateThickness <= 40) {
                return 490;
            }
            if (plateThickness > 40 && plateThickness <= 80) {
                return 470;
            }
            return null; // If plateThickness is greater than 80 or negative
        case '275':
            if (plateThickness <= 40) {
                return 430;
            }
            if (plateThickness > 40 && plateThickness <= 80) {
                return 410;
            }
            return null; // If plateThickness is greater than 80 or negative
        default:
            return null; // If plateGrade is not '355' or '275'
    }
}

function calculateTensionResistance(netArea, fu){
    //BS EN 1993-1-1 CL 6.2.3
    var gammaM2 = 1.1;
    let resistance = ((0.9 * netArea * fu) / gammaM2) / 1000
    resistance = resistance.toFixed(1);
    return resistance
}

function determineAcceptable(result, designVal ){
    if(designVal <= result){
        return true;
    }
    else{
        return false;
    }
}

//This was for the old result inline text, needs updated to display the table.
function displayResults(tensionLoad, netArea, tensionResistance, boltShearResTotal){
    //Display tension load.
    document.getElementById("ShearResVal").innerText = tensionResistance + " kN";
    //Display true if design resistance > design value
    document.getElementById("ShearResAcceptable").innerText = determineAcceptable(tensionLoad, tensionResistance);
    
    //Display total bolt shear resistance.
    document.getElementById("BoltShearResVal").innerText = boltShearResTotal + " kN"
    document.getElementById("BoltShearResAcceptable").innerText = determineAcceptable(boltShearResTotal, tensionLoad);
}