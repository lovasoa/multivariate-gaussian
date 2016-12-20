var Gaussian = require('../');
var tape = require('tape');

tape('returns a correct probability for a standard distribution', function(assert) {
  assert.plan(1);
  var distribution_parameters = {
    // n*n covariance matrix
    sigma : [[1, 0], [0, 1]],
    // n-dimensional mean vector
    mu : [0, 0]
  }

  var my_gaussian = new Gaussian(distribution_parameters);
  var res = my_gaussian.density([0, 0]); // Returns the value of the density function at (0,0)

  assert.ok(Math.abs(res - 1 / (2 * Math.PI)) < 1e-5, 'Density probability is correct');
});

tape('returns a correct probability for a random distribution', function(assert) {
  assert.plan(1);

  var distribution_parameters = {
    sigma : [[ 3.10853404,  0.57142415,  0.03101091],
             [ 0.9549752 ,  3.89398613,  0.88597582],
             [ 0.87729471,  0.82066072,  3.67113053]],

    mu :     [ 0.73516845,  0.27666293,  0.65376305]
  }
  var x = [ 0.7,  0.2,  0.6];
  var my_gaussian = new Gaussian(distribution_parameters);
  var res = my_gaussian.density(x); // Returns the value of the density function at (0,0)
  /* Result was computed in python using ipython:
        In [34]: sigma
        Out[34]:
        array([[ 3.10853404,  0.57142415,  0.03101091],
               [ 0.9549752 ,  3.89398613,  0.88597582],
               [ 0.87729471,  0.82066072,  3.67113053]])

        In [35]: mu
        Out[35]: array([ 0.73516845,  0.27666293,  0.65376305])

        In [36]: x
        Out[36]: array([ 0.7,  0.2,  0.6])

        In [37]: multivariate_normal.pdf(x,mean=mu,cov=sigma)
        Out[37]: 0.010375829337330682
  */
  var expected = 0.010375829337330682;
  assert.ok(Math.abs(res  - expected) < 1e-3, 'Density of probability is correct: '+ res + ' ≈ ' + expected);
});

tape('handles singular matrices', function(assert) {
  assert.plan(1);

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
});

tape('works when sigma^-1 is large', function(assert) {
  assert.plan(1);

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
});

tape('works when input is NaN', function(assert) {
  assert.plan(1);

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
});
