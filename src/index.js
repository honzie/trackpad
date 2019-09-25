const _ = require('lodash');

const normal = require('./normal')

// TODO REMOVE
const project = require('../examples/simple-project');
// END TODO

// COnfiguration to abstract
const runs = 100000; // multiple of 100
const perBatch = runs / 100;

console.log(`TRACKPAD
  ====
  Project: ${project.name}
  Team: ${Object.keys(project.team).join(', ')}
  Tasks: ${project.tasks.length}
  Operational Overhead: TODO
  Oncall Overhead: TODO
  Yearly Vacation / Sick Days: TODO
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

const simulationResults = {};

console.log(`RUNNING SIMULATIONS
  ====
`);

for (let i = 1; i <= 100; i++) {
  for (let j = 0; j < perBatch; j++) {
    // Set up an on deck.
    const simulation = {
      availabilities: [0],
      currentAvailabilityPointer: 0,
      taskPointer: 0,
      0: Object.keys(project.team),
    };

    while (simulation.taskPointer < taskRunners.length) {
      const currentTime = simulation.availabilities[simulation.currentAvailabilityPointer];

      // Assign tasks for everyone idle at the current time
      _.shuffle(simulation[currentTime]).forEach((name) => {
        const taskTime = Math.max(Math.floor(taskRunners[simulation.taskPointer].getTime[name]()), 0);
        const taskCompletion = currentTime + taskTime;

        // Add the task completion
        if (simulation[taskCompletion]) {
          // There's already at least one free team member at that time
          // Add the new team member's availability
          simulation[taskCompletion].push(name);
        } else {
          // This is a new availability slot
          // Add the team member, and insert it into the availabilities array
          const insertAt = _.sortedIndex(simulation.availabilities, taskCompletion);

          simulation.availabilities = simulation.availabilities.slice(0, insertAt).concat(taskCompletion, simulation.availabilities.slice(insertAt));
          simulation[taskCompletion] = [name];
        }

        // Increment task
        simulation.taskPointer++;
      });

      // Move the availability pointer
      simulation.currentAvailabilityPointer++;
    }

    // Add this to the simulations results
    const projectDuration = simulation.availabilities[simulation.availabilities.length - 1];
    simulationResults[projectDuration] = simulationResults[projectDuration] ? simulationResults[projectDuration] + 1 : 1;
  }

  console.log(`  ${i}%`);
}

// LOG RESULTS
console.log(`RESULTS:
  ====
`);

const resultTimes = Object.keys(simulationResults).sort();
let runningTotal = 0;

for (let k = resultTimes[0] - 1; k <= resultTimes[resultTimes.length - 1] ; k++) {
  if (simulationResults[k]) {
    runningTotal += simulationResults[k];
  }

  console.log(`  Hour ${k}: ${runningTotal / runs * 100}% chance of completion`);
}
