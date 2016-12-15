var matrix = require("matrix-js");

function vector(x) {
    return matrix(x.map(function (v){return [v]}));
}

/**
* @param {Object<Array>} parameters An object that has the following properties:
*                                * sigma : covariance matrix
*                                * mu : mean vector
* @return {Function} The probability function 
**/
function density (parameters) {
    var sigma = matrix(parameters.sigma), mu = vector(parameters.mu);
    var sinv = matrix(sigma.inv());
    var coeff = 1 / Math.sqrt(
                Math.pow(2 * Math.PI, mu.size()[0]) *
                sigma.det()
               );
    return function (raw_x) {
        var x = vector(raw_x);
        var delta = matrix(x.sub(mu));
        var delta_trans = matrix(delta.trans());
        return coeff * Math.exp(
                 matrix(delta_trans.prod(sinv)).prod(delta)[0][0] / (-2)
                );
    }
}