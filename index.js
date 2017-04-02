#!/usr/bin/env node
const request = require('request')
const clear = require('clear')
const chalk = require('chalk')
const figlet = require('figlet')

clear()
console.log(
    chalk.yellow(
        figlet.textSync('Githuh?', { horizontalLayout: 'full' })
    )
)

let command = process.argv[2]
let username = process.argv[3]

const reposOptions = {
    url: `https://api.github.com/users/${username}/repos?per_page=10&sort=created`,
    headers: {
        'User-Agent': 'request'
    }
}

const starsOptions = {
    url: `https://api.github.com/users/${username}/starred`,
    headers: {
        'User-Agent': 'request'
    }
}

const profileOptions = {
    url: `https://api.github.com/users/${username}`,
    headers: {
        'User-Agent': 'request'
    }
}

switch (command) {
    case 'repos':
        request(reposOptions, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let results = JSON.parse(body)

                console.log(
                    chalk.blue('Recent Repos:')
                )
                console.log(
                    chalk.blue('=============')
                )

                results.map((repo) => {
                    console.log(chalk.green(repo.name))
                })
            } else {
                console.log(chalk.red(`Error: ${error}`))
            }
        })
        break
    case 'stars':
        request(starsOptions, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let results = JSON.parse(body)

                console.log(
                    chalk.blue('Starred Repos:')
                )
                console.log(
                    chalk.blue('==============')
                )
                
                results.map((repo) => {
                    console.log(chalk.green(repo.name))
                })
            } else {
                console.log(chalk.red(`Error: ${error}`))
            }
        })
        break
    case 'profile':
        request(profileOptions, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let results = JSON.parse(body)

                console.log(
                    chalk.blue('Profile Information:')
                )
                console.log(
                    chalk.blue('====================')
                )

                console.log(chalk.green('Email: '), chalk.cyan(results.email))
                console.log(chalk.green('Number of public repos: '), chalk.cyan(results.public_repos))
                console.log(chalk.green('Followers: '), chalk.cyan(results.followers))
                console.log(chalk.green('Following: '), chalk.cyan(results.following))
            } else {
                console.log(chalk.red(`Error: ${error}`))
            }
        })
        break
    default:
        console.log(chalk.red('Something went wrong. Check syntax of command.'))
}