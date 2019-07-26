pay_b = document.getElementById("paypal");
if (pay_b.disabled==false) {
	document.getElementById("stripe_pago").hidden=true;
}

function ocultar_aparecer(){
	var pay = document.getElementById("paypal");
	var stripe_pago = document.getElementById("stripe_pago");
	if (pay.disabled==true && stripe_pago.hidden==false) {
		pay.disabled=false;
		stripe_pago.hidden=true;
	}else{
		pay.disabled=true;
		stripe_pago.hidden=false;
	}
	
	
}

var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// Create an instance of Elements.
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element.
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

card.on('focus', () => {
    console.log('user is in form');
});

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission.
var form = document.getElementById('payment-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe
  	.createToken(card)
  	.then(function(result) {
    	if (result.error) {
      	// Inform the user if there was an error.
      	var errorElement = document.getElementById('card-errors');
      	errorElement.textContent = result.error.message;
    	} else {
      	// Send the token to your server.
      		//stripeTokenHandler(result.token);
      		console.log(result.token.id)
    		}
  		});
	});

// Submit the form with the token ID.
function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
}