<<<<<<< HEAD
'use strict'
const chalk = require('chalk')
const semver = require('semver')
const packageConfig = require('../package.json')
const shell = require('shelljs')

=======
var chalk = require('chalk')
var semver = require('semver')
var packageConfig = require('../package.json')
var shell = require('shelljs')
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

<<<<<<< HEAD
const versionRequirements = [
=======
var versionRequirements = [
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
<<<<<<< HEAD
  }
=======
  },
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
<<<<<<< HEAD
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

=======
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
<<<<<<< HEAD

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

=======
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
    console.log()
    process.exit(1)
  }
}
