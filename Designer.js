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
        console.log("Raw JSON string:", result); // Log the raw JSON string
        
        // Attempt to parse the JSON string
        var response = JSON.parse(result);
        
        console.log("Parsed response:", response); // Log the parsed response

        // Access the properties
        console.log(response.response.grossArea); // Outputs: 4000
        console.log(response.response.boltHoleDiameter); // Outputs: 22
        // Add more properties as needed
    } catch (e) {
        console.error("Failed to parse JSON:", e.message);
    }
}

