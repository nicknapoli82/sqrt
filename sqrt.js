// Take a number and returns a tuple
//     [the square root entirely, a string of square root to precision]
// Using guess and check
// Find initial SWAG first guess
// From first guess divide and conquer
//     Based on narrowing between upper and lower bound

function sqrt(number, decimalPlaces = 10) {
    // Validate number, if NaN, 'undefined', 0 => return null
    if (number === 1) return '1 silly';
    if (!number || number <= 0) return null;
    
    // On object to contain bounds, and string representation of bound numbers
    // Strings are turnicated to decimalPlaces after dot
    const bounds = { upper: 0, lower: 0 };
    
    // Initial guess can be refined to be more accurate
    // This is rough for now, Number of Div by 2 determined by digits in number
    let guess = number >> placesFromDot(number);
    let lastGuess;
    bounds.upper = guess;
    bounds.lower = 0;
    guess = bounds.upper - ((bounds.upper - bounds.lower) / 2);

    // Fix special case where number is >= 10 or < 16 because it happens
    if (number >= 10 || number < 16) bounds.upper = number;
    
    // Fix special case where number >> becomes 0 or unusable
    if (number > 0 && number < 4) {
	bounds.upper = number;
	guess = number / 2;
    }
    
    // Fix special case where number is > 0 and < 1
    if (number < 1) {
	bounds.upper = 1;
	guess = 0.5;
    }
    
    // Simple function to determine upperstr and lowerStr
    const stringify = function (b) {
	if (decimalPlaces) return b.toString().slice(0, placesFromDot(b, 'LHS') + decimalPlaces + 1);
	return b.toString().slice(0, placesFromDot(b, 'LHS'));
    };
    
    while ((guess * guess !== number) && lastGuess !== guess) {

	lastGuess = guess;
	  
	if ((guess * guess) > number) {
	    bounds.upper = guess;
	}
	else if ((guess * guess) < number) {
	    bounds.lower = guess;
	}

	guess = bounds.upper - ((bounds.upper - bounds.lower) / 2);

	// console.log("guess = ", guess);
	// console.log(bounds);
	// console.log();
    }

    let result;
    result = bounds.upper - ((bounds.upper - bounds.lower) / 2);
    
    return [guess, stringify(result)];
}

// Returns number of digits from LHS or RHS of dot
// LHS is implied is not given as argument
function placesFromDot(n, side) {
    let nStr = n.toString();
    let dot = nStr.indexOf('.');
    if (dot === -1) return nStr.length;
    if (side === 'LHS' || !side) {
	return nStr.slice(0, dot).length;
    }
    else return nStr.slice(dot + 1).length;
}

console.log(sqrt(0.3, 5));
