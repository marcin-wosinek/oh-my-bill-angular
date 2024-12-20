# Oh-my-bill

Simple application for a quick estimation of energy consumption costs. Based on
a [blog post](https://how-to.dev/oh-my-bill-project-introduction).

## Application goal

Allow for quick estimation of the energy costs, based on the recent
measurements of energy meter.

## User stories

There will be only one user in the application—storing data directly in the
browser.

### Recording the energy consumption

Key feature of the app, will be to register energy consumption, as shown right
now at the meter. There should be an option to change the data-time of
measurement—is user has some mesurements done offline, and wants to add it
later on.

### Setting the energy tarif

The energy tarif should have two values:

- cost per kWh,
- flat cost for line maintainence.

Both values should default to some resonable value, and be editable by user.

### Reviewing the energy consumption

There should be a way for user to evaluate their consumption—optimal would be
barchart per hour.
