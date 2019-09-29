# Trackpad
Monte Carlo Project Planning

## General Structure

### Input

MVP
- (done) List of tasks
- (done) List of team members, including TBH members
- (done) Range of times for each task from each team member (including predictions for TBH members)
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
- Ability to create what-if scenarios. Swap out tasks for other task sets (grouping tasks), to determine which of multiple plans may be quickest—or most beneficial to the company
- Oncall overhead
- Compare various randomization methods, see if it changes the s-curve output
- Compare quicker randomization heuristics (e.g. dividing bell curves into X slices and choosing one via weight)
- Compare number vs integer (hour) randomization results
- Website to handle task estimation (log in, per user, track results, show visualizations of test runs, etc)

### Processing

1. Have a pool of idle team members
2. Have an ordered task list
3. Randomly generate a time the task takes, using a standard distribution weighting over the prediction for that team member
4. Insert the team member back onto the pool once the task has completed
5. Once all tasks are completed, note the completion date

Stretch
- Use multiple cores for running the simulations

### Output

S-curve graph with percentages of complete projects by X date
