function submitForm(){
    //Get values from the form.
    let tensionLoad = document.getElementById('tensionLoad').value;
    let plateWidth = document.getElementById('plateWidth').value;
    let plateThickness = document.getElementById('plateThickness').value;
    let plateYieldStrength = document.getElementById('plateYieldStrength').value;
    let boltDiameter = document.getElementById('preferredBolt').value;
    let boltGrade = document.getElementById('boltGrade').value;

    //Create object to be converted to JSON.
    let designData = {
        TensionLoad: tensionLoad,
        plateWidth: plateWidth,
        plateThickness: plateThickness,
        plateYieldStrength: plateYieldStrength,
        boltDiameter: boltDiameter,
        boltGrade: boltGrade
    };

    let jsonData = JSON.stringify(designData);

    console.log(jsonData);
    calculateGrossArea(plateWidth, plateThickness);
    calculateNumberBolts(tensionLoad, boltDiameter, boltGrade);
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
    console.log(numberBolts);
}

function calculateGrossArea(plateWidth, plateThickness){
    console.log(plateWidth * plateThickness);
    return (plateWidth * plateThickness)
}