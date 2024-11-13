// Function to calculate labor benefits
function calculateBenefits() {
    const name = document.getElementById('name').value.trim();
    const monthlySalary = parseFloat(document.getElementById('monthlySalary').value);
    const yearsWorked = parseInt(document.getElementById('yearsWorked').value);
    const daysWorked = parseInt(document.getElementById('daysWorked').value);
    const unusedVacationDays = parseInt(document.getElementById('unusedVacationDays').value);

    // Validate inputs
    if (!name || isNaN(monthlySalary) || isNaN(yearsWorked) || isNaN(daysWorked) || isNaN(unusedVacationDays)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    if (monthlySalary <= 0 || yearsWorked < 0 || daysWorked < 0 || unusedVacationDays < 0) {
        alert("Please enter valid positive numbers.");
        return;
    }

    // Constants for calculations
    const dailySalary = monthlySalary / 30; // Assume 30 days in a month for simplicity
    const severancePay = monthlySalary * yearsWorked; // Payment for each year worked
    const extraDaysPay = dailySalary * daysWorked; // Pay for additional days worked
    const vacationPay = dailySalary * unusedVacationDays; // Pay for unused vacation days

    // Total benefits calculation
    const totalBenefits = severancePay + extraDaysPay + vacationPay;

    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Hello, ${name}.</p>
        <p>For your ${yearsWorked} years of service:</p>
        <ul>
            <li>Severance Pay: $${severancePay.toFixed(2)}</li>
            <li>Pay for Extra Days Worked: $${extraDaysPay.toFixed(2)}</li>
            <li>Unused Vacation Days Pay: $${vacationPay.toFixed(2)}</li>
        </ul>
        <p><strong>Total Benefits: $${totalBenefits.toFixed(2)}</strong></p>
    `;
}