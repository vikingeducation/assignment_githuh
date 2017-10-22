# GitHub statistician about users - GitHuh?

Command Line Interface, GitHuh?, that displays statistics for a given username.

git.printRecentStars(USER_NAME) -returns a list of the user's starred repos.
git.printFollowings(USER_NAME) -  -returns a list of the people who the user is following
git.printProfileDetails(USER_NAME) - returns the user's profile information (email, number of public repos, follower/following count, etc.)
git.printRecentRepos(USER_NAME) - returns a list of ten user's recently committed repos.

repos <username>
stars <username> returns a list of the user's starred repos.
profile <username> returns the user's profile information (email, number of public repos, follower/following count, etc.)

## Getting Started

If you have [installed node](https://nodejs.org/en/download/) on your computer, type teh following commands

```
$ node github_api.js
```

If you want to check statistics of other users run also the following lines after:

```
git.printRecentStars(USER_NAME);
git.printFollowings(USER_NAME);
git.printProfileDetails(USER_NAME);
git.printRecentRepos(USER_NAME);
```

## Authors

* **Dariusz Biskupski** - *Initial work* - https://dariuszbiskupski.com


## Acknowledgments

This is an assignment created for [Viking Code School](https://www.vikingcodeschool.com/)
