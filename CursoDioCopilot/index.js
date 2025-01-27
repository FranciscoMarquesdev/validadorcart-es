// Function to validate credit card number using Luhn algorithm
function validateCreditCardNumber(cardNumber) {
  let sum = 0;
  let shouldDouble = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

// Function to determine the card type (bandeira)
function getCardType(cardNumber) {
  const cardTypes = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    enroute: /^(2014|2149)[0-9]{11}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
    voyager: /^8699[0-9]{11}$/,
    hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
    aura: /^50[0-9]{14,17}$/,
    // Add more card types as needed
  };

  for (const [type, pattern] of Object.entries(cardTypes)) {
    if (pattern.test(cardNumber)) {
      return type;
    }
  }
  return "unknown";
}

// Main function to validate card and determine bandeira
function validateAndDetermineCard(cardNumber) {
  if (!validateCreditCardNumber(cardNumber)) {
    return { valid: false, bandeira: null };
  }
  const bandeira = getCardType(cardNumber);
  return { valid: true, bandeira: bandeira };
}

// Example usage
const cardNumber = "3503475123630170"; // Replace with actual card number
const result = validateAndDetermineCard(cardNumber);
console.log(result); // { valid: true, bandeira: 'mastercard' }
