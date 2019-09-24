# Trackpad
Monte Carlo Project Planning

## General Structure

TODO:
- Use proper randomization libraries when picking team members for the on deck and insertions (shuffling)

### Input

MVP
- List of tasks
- List of team members, including TBH members
- Range of times for each task from each team member (including predictions for TBH members)
- Holiday schedule
- Number of times to run simulation

Example
TASK: Set up hosting
MEMBER 1: 1 day - 5 days
MEMBER 2: 2 days - 3 days

Stretch
- Task dependency tree: what tasks a given task is dependent on
- Compose tasks into milestones
- Known vacation schedule / average distribution of vacations
- Ability to great what-if scenarios. Swap out tasks for other task sets (grouping tasks), to determine which of multiple plans may be quickest
- Oncall overhead
- Compare various randomization methods, see if it changes the s-curve output
- Compare quicker randomization heuristics (e.g. dividing bell curves into X slices and choosing one via weight)

### Processing

1. Have a pool of idle team members
2. Have an ordered task list
3. When the pool has team members, randomly select one and assign them the next task
4. Randomly generate a time the task takes, using a standard distribution weighting over the prediction for that team member
5. Insert the team member back onto the pool once the task has completed
6. Once all tasks are completed, note the completion date

Stretch
- Use multiple cores for running the simulations

### Output

S-curve graph with percentages of complete projects by X date
