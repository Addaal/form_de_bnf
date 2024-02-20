document.addEventListener("DOMContentLoaded", function () {

    var selectElement = document.getElementById("text-dropdown-3");
    var nroDoc = document.getElementById("nroDoc");
    var charts = [];
    const dropdownButton = document.getElementById('tipoDocumentoDropdown');
    const dropdownMenuItems = document.querySelectorAll('#tipoDocumento-menu .dropdown-item');



   
    var currentValue;
    dropdownMenuItems.forEach(item => {
        item.addEventListener('click', function () {
            const selectedOptionText = this.textContent;
            document.getElementById('text-dropdown-3').textContent = selectedOptionText;
            currentValue = selectedOptionText;
            console.log(selectedOptionText);
    
            // Check if the current value is "Registro unico del contribuyente"
            if (currentValue === "Registro unico del contribuyente") {
                // Add event listeners to modify input behavior
                document.getElementById("nroDoc").value="";
                nroDoc.addEventListener("input", inputEventListener);
                nroDoc.addEventListener("keydown", keydownEventListener);
            } else {
                document.getElementById("nroDoc").value="";
                // Remove event listeners if currentValue is not "Registro unico del contribuyente"
                nroDoc.removeEventListener("input", inputEventListener);
                nroDoc.removeEventListener("keydown", keydownEventListener);
            }
        });
    });
    
    // Event listener for input event
    function inputEventListener(event) {
       
        charts = [];
        var nroDocValue = event.target.value;
        console.log("RUC value:", nroDocValue);
        event.target.value = nroDocValue.replace(/\D/g, '');
        if (!isNaN(event.target.value)) {
            var numericValue = event.target.value.slice(0, 8);
            for (let i = 0; i < numericValue.length; i++) {
                charts.push(numericValue.charAt(i));
                if (charts.length === 7) {
                    charts.push("-");
                }
            }
        }
        console.log(charts);
        event.target.value = charts.join("");
    }
    
    // Event listener for keydown event
    function keydownEventListener(event) {
        if (event.key === "Backspace" || event.key === "Delete") {
            if (charts.length > 0 && charts[charts.length - 1] === "-") {
                charts.pop();
            }
            if (nroDoc.value.slice(-1) === "-") {
                nroDoc.value = nroDoc.value.slice(0, -1);
            }
        }
    }
    




});

