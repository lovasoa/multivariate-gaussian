var gaussian = require('../');

var distribution_parameters = {
  // n*n covariance matrix
  sigma : [[1, 0.5], [0.5, 1]],
  // n-dimensional mean vector
  mu : [0, 0]
}

var density_function = gaussian(distribution_parameters);

var res = density_function([0, 0]); // Returns the value of the density function at (0,0)

var assert = require('assert');
assert.ok(res > 0 && res < 1);
