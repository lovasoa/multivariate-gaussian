var Gaussian = require('../');
var assert = require('assert');

var distribution_parameters = {
  // n*n covariance matrix
  sigma : [[1, 0.5], [0.5, 1]],
  // n-dimensional mean vector
  mu : [0, 0]
}

var my_gaussian = new Gaussian(distribution_parameters);
var res = my_gaussian.density([0, 0]); // Returns the value of the density function at (0,0)
assert.ok(res > 0 && res < 1);

// Test the degenerate cases
var distribution_parameters = {
  // n*n covariance matrix
  sigma : [[1, 1], [1, 1]], // sigma is not full-rank
  // n-dimensional mean vector
  mu : [0, 0]
}

var my_gaussian = new Gaussian(distribution_parameters);
var res = my_gaussian.density([0, 0]); // Returns the value of the density function at (0,0)
assert.equal(res, 0);

// Test when sigma^-1 is very large
var distribution_parameters = {
  // n*n covariance matrix
  sigma : [[ 72.24556085089353, -84.99477747163944]
          ,[-84.99477747163944, 99.99385584898758]], // sigma ^ -1 has large coefficients
  // n-dimensional mean vector
  mu : [0, 0]
}

var my_gaussian = new Gaussian(distribution_parameters);
var res = my_gaussian.density([0, 0]); // Returns the value of the density function at (0,0)
assert.equal(res, 0);

// Test when sigma is invalid
var distribution_parameters = {
  // n*n covariance matrix
  sigma : [[ NaN, NaN]
          ,[ NaN, NaN]], // sigma ^ -1 has large coefficients
  // n-dimensional mean vector
  mu : [0, 0]
}

var my_gaussian = new Gaussian(distribution_parameters);
var res = my_gaussian.density([0, 0]); // Returns the value of the density function at (0,0)
assert.equal(res, 0);
