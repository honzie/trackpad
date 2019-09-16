const random = require('random');

// TODO REMOVE
const project = require('../examples/simple-project');
// END TODO

console.log('Running Monte Carlo Simulations');

console.log('Simulation 1');

const idleTeam = Object.keys(project.team);
console.log('Idle Team', idleTeam)

//console.log(random)

const normal = random.normal(mu = 50, sigma = 25)
//const poisson = random.poisson(lambda = 1)
// const bernoulli = random.bernoulli(p = 50)// error
const binomial = random.binomial(n = 100, p = .99)

const percentages = {};
const percentages10 = {};

const runs = 1000000;
for (let i = 0; i < runs; i++) {
  const normalVal = Math.floor(normal());

  if (normalVal < 10) {
    percentages10.lt10 = percentages10.lt10 ? percentages10.lt10 + 1 : 1
  } else if (normalVal > 90) {
    percentages10.gt90 = percentages10.gt90 ? percentages10.gt90 + 1 : 1
  }

  //console.log(normalVal)

  //percentages[normalVal] = percentages[normalVal] ? percentages[normalVal] + 1 : 1;
}

console.log('<10', percentages10.lt10 / runs * 100)
console.log('---', (runs - percentages10.lt10 - percentages10.gt90) / runs * 100)
console.log('>90', percentages10.gt90 / runs * 100)

//console.log('percentages', percentages)
