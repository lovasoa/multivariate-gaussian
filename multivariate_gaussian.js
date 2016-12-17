var n = require("numeric");

var sqrt2PI = Math.sqrt(Math.PI * 2);

/**
* @param {Object<Array>} parameters An object that has the following properties:
*                                   * sigma : covariance matrix
*                                   * mu : mean vector
* @return {Function} The probability function 
**/
function multivariate_gaussian (parameters) {
    var sigma = parameters.sigma, mu = parameters.mu;
    var sinv = n.inv(sigma); // π ^ (-1)
    var k = mu.length; // dimension
    var coeff = 1 / (Math.pow(sqrt2PI,k) * Math.sqrt(n.det(sigma))); 
    return function (x) {
        var delta = n.sub(x, mu); // 𝛿 = x - mu
        var prod = n.dot(delta, n.dot(sinv, delta)); // Π = 𝛿T . Σ^(-1) . 𝛿
        return coeff * Math.exp(prod / -2); // e^(-Π/2) / √|2.π.Σ|
    };
}

module.exports = multivariate_gaussian;
