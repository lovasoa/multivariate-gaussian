# multivariate-gaussian

[![Build Status](https://travis-ci.org/lovasoa/multivariate-gaussian.svg?branch=master)](https://travis-ci.org/lovasoa/multivariate-gaussian)

Multivariate normal distribution density function implemented in javascript

## How to use

```js
var gaussian = require('multivariate-gaussian');

var distribution_parameters = {
  // n*n covariance matrix
  sigma : [[1, 0.5], [0.5, 1]],
  // n-dimensional mean vector
  mu : [0, 0]
}

var density_function = gaussian(distribution_parameters);

density_function([0, 0]); // Returns the value of the density function at (0,0)
```
