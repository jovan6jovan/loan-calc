// UI Vars
const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');

// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e) {
    // Hide results
    document.querySelector('#results').style.display = 'none';

    // Show loader
    document.querySelector('#loader').style.display = 'block';

    setTimeout(calculateResults, 1700);

    e.preventDefault();
});

function calculateResults() {
    // Formulas
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // Show results
        document.querySelector('#results').style.display = 'block';

        // Hide loader
        document.querySelector('#loader').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }
}

// Show error function
function showError(err) {
    // Hide results and loader
    document.querySelector('#results').style.display = 'none';
    document.querySelector('#loader').style.display = 'none';

    // Get UI elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(err));

    // Insert error above heading (zove se nad parent elementom, prvi argument je ono sto zelim da ubacim, drugi je pre kog elementa zelim to da ubacim)
    card.insertBefore(errorDiv, heading);

    // Clear err after 3s
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

// Clear fields
document.querySelector('.clear-fields').addEventListener('click', function() {
    amount.value = '';
    interest.value = '';
    years.value = '';
    monthlyPayment.value = '';
    totalPayment.value = '';
    totalInterest.value = '';
});