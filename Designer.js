async function submitForm() {
    // Get values from the form
    let tensionLoad = document.getElementById('tensionLoad').value;
    let plateWidth = document.getElementById('plateWidth').value;
    let plateThickness = document.getElementById('plateThickness').value;
    let plateGrade = document.getElementById('plateGrade').value;
    let boltDiameter = document.getElementById('preferredBolt').value;
    let boltGrade = document.getElementById('boltGrade').value;

    try {
        // Make the POST request
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

        // Check if the response status is OK
        if (!response.ok) {
            // If the response is not OK, throw an error
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        // Parse the JSON response
        const result = await response.json();
        console.log(result);
        BuildResponse(result);
    } catch (error) {
        console.error("Failed to fetch or parse JSON:", error.message);
        
        // Log the raw response text to understand what went wrong
        try {
            const errorText = await response.text();
            console.error("Raw response:", errorText);
        } catch (textError) {
            console.error("Failed to read response text:", textError.message);
        }
    }
}



function BuildResponse(result) {
    try {
        // Log the raw JSON object
        console.log("Raw JSON object:", result);
        // Access properties directly without parsing
        console.log(result.BoltHoleDiameter);

        // Display calculation results
        document.getElementById("ShearResVal").innerText = result.TensionResistance + " kN"
        document.getElementById("BoltShearResVal").innerText = result.TotalBoltShearRes + " kN"

        // Conditional results

        let tensionLoad = parseFloat(document.getElementById('tensionLoad').value);
        let results = [];
        
        // Check Tension Resistance
        if (result.TensionResistance > tensionLoad) {
            results.push(true);
            document.getElementById("ShearResAcceptable").innerText = "PASS";
        } else {
            results.push(false);
            document.getElementById("ShearResAcceptable").innerText = "FAIL";
        }
        
        // Check Total Bolt Shear Resistance
        if (result.TotalBoltShearRes > tensionLoad) {
            results.push(true);
            document.getElementById("BoltShearResAcceptable").innerText = "PASS";
        } else {
            results.push(false);
            document.getElementById("BoltShearResAcceptable").innerText = "FAIL";
        }
        
        // Determine Overall Acceptability
        if (results.includes(false)) {
            document.getElementById("OverallAcceptable").innerText = "FAIL";
        } else {
            document.getElementById("OverallAcceptable").innerText = "PASS";
        }

        // Display dimensional results
        document.getElementById("DimA").innerText = result.DimA
        document.getElementById("DimB").innerText = result.DimB
        document.getElementById("DimC").innerText = result.DimC
        document.getElementById("DimD").innerText = result.DimD
        document.getElementById("BoltsTotalDia").innerText = result.NumberOfBolts
        document.getElementById("BoltsPerRowDia").innerText = result.BoltsPerRow

        switch(result.Diagram){
            case "A":
                resultImage.src = 'img/optionA.png'
                break;
            case "B":
                resultImage.src = 'img/optionB.png'
                break;
            case "C":
                resultImage.src = 'img/optionC.png'
                break;
            case "D":
                resultImage.src = 'img/optionD.png'
                break;
            case "X":
                resultImage.src = " "
                break;
        }
        
    } catch (e) {
        console.error("Failed to parse JSON:", e.message);
    }
}

