// Take a number and returns a tuple
//     [the square root entirely, a string of square root to precision]
// Using guess and check
// Find initial SWAG first guess
// From first guess divide and conquer
//     Based on narrowing between upper and lower bound

// For now this will only allow checking number greater or equal to 4
// this is due to the fact that numbers lower than 4 breaks this algorithm
// I have a fix, just have implemented it yet.

function sqrt(number, decimalPlaces = 10) {
    // On object to contain bounds, and string representation of bound numbers
    // Strings are turnicated to decimalPlaces after dot
    const bounds = { upper: 0, lower: 0, upperStr: "l", lowerStr: "" };
    
    // Initial guess can be refined to be more accurate
    // This is rough for now, Number of Div by 2 determined by digits in number
    let guess = number >> placesFromDot(number);
    let lastGuess;
//    let pctDeviation = number / (guess * guess);
    bounds.upper = guess;
    bounds.lower = 0;
    guess = bounds.upper - ((bounds.upper - bounds.lower) / 2);
    
    // Simple function to determine upperstr and lowerStr
    const stringify = function (b) {
	return b.toString().slice(0, placesFromDot(b, 'LHS') + decimalPlaces + 1);
    };

    // Validate number, if NaN, 'undefined', 0 => return null
    //                  if number is < 2       => return null
    //                  if number is < 4, fix special case => return null
    if (number === 1) return '1 silly';
    if (!number || number < 4) return null;
    
    while ((bounds.upperStr != bounds.lowerStr) &&
	   (guess * guess !== number) && lastGuess !== guess) {

	lastGuess = guess;
	  
	if ((guess *guess) > number) {
	    bounds.upper = guess;
	}
	else if ((guess * guess) < number) {
	    bounds.lower = guess;
	}

	bounds.upperStr = stringify(bounds.upper);
	bounds.lowerStr = stringify(bounds.lower);

	guess = bounds.upper - ((bounds.upper - bounds.lower) / 2);

	console.log("guess = ", guess);
	console.log(bounds);
	console.log();
    }

    let result = bounds.upper - ((bounds.upper - bounds.lower) / 2);
    
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

console.log(sqrt(10000000));
