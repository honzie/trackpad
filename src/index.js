const normal = require('./normal')

// TODO REMOVE
const project = require('../examples/simple-project');
// END TODO

console.log(`TRACKPAD
  ====
  Project: ${project.name}
  Team: ${Object.keys(project.team).join(', ')}
  Tasks: ${project.tasks.length}
`);

// SET UP PROJECT
console.log(`SETTING UP
  ====
`);

// Mutate the project input file so it can easily have random numbers
// generated. This is done once in order to avoid multiple duplicate calls.
const taskRunners = project.tasks.map((task) => {
  const taskRunner = {
    name: task.name,
    getTime: {},
  };

  Object.keys(task.estimates).forEach((name) => {
    const estimates = task.estimates[name];
    taskRunner.getTime[name] = normal(estimates.low, estimates.high);
  });

  return taskRunner;
});

// Set up an on deck.
const onDeck = {
  order: ['t0'],
  t0: Object.keys(project.team),
};

console.log(`RUNNING SIMULATIONS
  ====
`);

(() => {
  console.log('Simulation 1');

  console.log('od', onDeck)
})();


/*
const idleTeam = Object.keys(project.team);
console.log('Idle Team', idleTeam)


const low = 10;
const high = 12;

const getNormal = normal(low, high);

const percentages10 = {};

const runs = 10000000;
for (let i = 0; i < runs; i++) {
  const normalVal = Math.floor(getNormal());

  if (normalVal < low) {
    percentages10.lt10 = percentages10.lt10 ? percentages10.lt10 + 1 : 1
  } else if (normalVal >= high) {
    percentages10.gt90 = percentages10.gt90 ? percentages10.gt90 + 1 : 1
  }

  //console.log(normalVal)

  //percentages[normalVal] = percentages[normalVal] ? percentages[normalVal] + 1 : 1;
}

console.log('<low', percentages10.lt10 / runs * 100)
console.log('---', (runs - percentages10.lt10 - percentages10.gt90) / runs * 100)
console.log('>high', percentages10.gt90 / runs * 100)

//console.log('percentages', percentages)
*/
