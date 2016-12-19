var n = require("numeric");

var sqrt2PI = Math.sqrt(Math.PI * 2);

/**
 * Represents a multivariate gaussian
* @param {{sigma: Array<Array<number>>, mu: Array<number>}} gaussian_parameters
**/
function Gaussian(parameters) {
    this.sigma = parameters.sigma;
    this.mu = parameters.mu;
    this.k = this.mu.length; // dimension
    var det = n.det(this.sigma);
    if (det > 0) {
        this._sinv = n.inv(this.sigma); // π ^ (-1)
        this._coeff = 1 / (Math.pow(sqrt2PI, this.k) * Math.sqrt(det));
    } else {
        this._sinv = n.rep([this.k, this.k], 0);
        this._coeff = 0;
    }
}

/**
 * Evaluates the density function of the gaussian at the given point
 */
Gaussian.prototype.density = function(x) {
    var delta = n.sub(x, this.mu); // 𝛿 = x - mu
    var prod = n.dot(delta, n.dot(this._sinv, delta)); // Π = 𝛿T . Σ^(-1) . 𝛿
    return this._coeff * Math.exp(prod / -2); // e^(-Π/2) / √|2.π.Σ|
};

module.exports = Gaussian;
