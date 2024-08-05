async function submitForm(){
    //Get values from the form.
    let tensionLoad = document.getElementById('tensionLoad').value;
    let plateWidth = document.getElementById('plateWidth').value;
    let plateThickness = document.getElementById('plateThickness').value;
    let plateGrade = document.getElementById('plateGrade').value;
    let boltDiameter = document.getElementById('preferredBolt').value;
    let boltGrade = document.getElementById('boltGrade').value;


    const response = await fetch('https://localhost:7163/FlatBar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            TensionLoad: tensionLoad,
            Width: plateWidth,
            Thickness: plateThickness,
            BoltDiameter: boltDiameter,
            PlateGrade: plateGrade,
            BoltGrade: boltGrade
        })
    });

    const result = await response.json();
    console.log(result)
    BuildResponse(result)
}



function BuildResponse(result) {
    try {
        // Log the raw JSON object
        console.log("Raw JSON object:", result);
        // Access properties directly without parsing
        console.log(result.BoltHoleDiameter);
    } catch (e) {
        console.error("Failed to parse JSON:", e.message);
    }
}

