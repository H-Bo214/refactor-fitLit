# FitLit- Refactor Tractor
This project represents the collaborative efforts of Rachel Williams, Horacio Borrego, Katy St Sauveur, and Jake West (2005 FE).

For our group project, we were tasked with refactoring an existing project. We were asked to utilize intelligent inheritance as well as thorough testing (including testing with spies) to rebuild an existing application, as well as refactoring our CSS and HTML to be both responsive & accessible.

## Abstract
FitLit is a web application that displays fitness data for a user based on various measurements of hydration, sleep, and activity. Our dashboard provides users information about their own wellness, as well as how it compares to their friends & the FitLit community. Users also have the ability to enter their own health data, using three forms on the dashboard, allowing them to track progress over time!

## Installation Instructions
1. Clone down the repo at: https://github.com/H-Bo214/refactor-fitLit, you can use an optional argument when you run `git clone` (you replace the `[...]` with the terminal command arguments): `git clone git@github.com:H-Bo214/refactor-fitLit.git [what you want to name the repo]`
1. Then install the library dependencies. Switch into your new directory & run: `npm install` in the terminal.
1. To verify that it is setup correctly, run `npm start` in your terminal. Go to `http://localhost:8080/` in the browser to visit the deployed application.

## Project in Action
* On page load (and refresh), a new user's data is fetched from a database to populate their dashboard. Each user has user information displayed, like their name, email address, and friends list, as well as many different wellness metrics. Each user's dashboard has information about their hydration, sleep, and activity levels for a day, week, and across all time. Users also can see information about how their activity levels compare to their friends, as well as activity streaks within the recent week & over the past 30 days.
![](src/images/READMEgif/fetchRandomUser.gif)

* Each user has the ability to post data to the server, for each type of activity. If a user decides they no longer need to record data, no worries- they can a convenient "Back Home" button.
![](src/images/READMEgif/postDataForms.gif)

* In addition to refactoring this project, we were asked to make our application accessible and responsive.
![](src/images/READMEgif/accessibilityAudit.gif)
![](src/images/READMEgif/responsiveDashboard.gif)

## Contributors
* Rachel Williams: https://github.com/rwilliams659
* Horacio Borrego: https://github.com/H-Bo214
* Katy St Sauveur: https://github.com/krogowsk531
* Jake West: https://github.com/jkwest-93
