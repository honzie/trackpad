const random = require('random');

// This could be configurable
// At 10/90, sigma 31.6 fo 80%, 24.6 for 90%, 20.65 for 95%
// TODO: Double check math here
const referenceSigma = 24.6;
const referenceLow = 10;
const referenceHigh = 90;
const sigmaRatio = referenceSigma / (referenceHigh - referenceLow);

/**
 * Sets up for generating normal distributions. Mu is the average,
 * sigma is 31.6 for 80%, 24.61 for 90%, 20.65 for 95%.
 *
 * To use:
 * const getNormal = normal(low, high);
 * const normalVal = Math.floor(getNormal()); // Can be used multiple times
 */
module.exports = (low, high) => {
  const mu = (high + low) / 2;
  const sigma = (high - low) * sigmaRatio;

  return random.normal(mu, sigma);
};
