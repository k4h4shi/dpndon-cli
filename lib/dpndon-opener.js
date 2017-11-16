#!/usr/bin/env node

const dpndon = require('dpndon');
const program = require('commander');
const figlet = require('figlet');
const chalk = require('chalk');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const inquirer = require('inquirer');
const opn = require('opn');

program.parse(process.argv);

const pkgName = program.args[0];

const option = {
  pkgName: pkgName,  
  dependencyTypes: [
    'dependencies',
    'devDependencies',
    'optionalDependencies',
    'peerDependencies',
    'bundledDependencies'
  ],
  props: ['name', 'homepage'],
};

exec(option);

/**
 * execute.
 */
function exec() {  
  //_showLogo();

  const msg = 'loading your dependencies, please wait...';
  const stopSpinner = _createSpinner(msg);

  return dpndon(option)
      .then(stopSpinner)
      .then(_createPkgsArray)
      .then(_createChoices)
      .then(_createPrompt)
      .then(_extractHomepage)
      .then(_openHomepage)
      .catch((error) => {
        stopSpinner();
        console.error(error);
        process.exit(1);
      });
}

/**
 * show logo.
 */
function _showLogo() {
  const title = figlet.textSync('dpndon', { horizontalLayout: 'full' });
  console.log(chalk.green(title));
}

/**
 * create spinner
 */
function _createSpinner(msg) {
  let status = new Spinner(msg);
  status.start();
  const stopSpinner = result => {
    status.stop();
    return result;
  }
  return stopSpinner;
}

/**
 * extract values and combine as an array
 * @param {Object} depnednecy
 * @return {Array} of all dependencies
 */
function _createPkgsArray(pkgDepnednecy) {
  const dependenciesArray = Object.values(pkgDepnednecy);
  return dependenciesArray.reduce((array, dependencies) => {
    array.push(...dependencies);
    return array;
  }, []);
}

/**
 * create choices for user
 * @param {Array} pkgs - that fetched
 * @returns {Array} choices
 */
function _createChoices(pkgs) {
  return pkgs.filter(pkg => pkg.homepage)
  .map(pkg => `${pkg.name}: ${pkg.homepage}`);
}

/**
 * create prompt for user to chose one
 * @param {Array} choices 
 * @returns {Object} prompt
 */
function _createPrompt(choices) {
  return inquirer.prompt(
    [
      {
        type: 'list',
        name: 'dependency',
        message: 'Select which one you want open:',
        choices: choices
      }
    ]
  );
}

/**
 * extract homepage
 */
function _extractHomepage(answer) {
  const dependency = answer.dependency;
  const beginIndex = dependency.indexOf(':') + 2;
  const endIndex = dependency.length;
  const homepage = dependency.substring(beginIndex, endIndex);
  return homepage;
}

/**
 * open homepage
 * @param {*} homepage 
 */
function _openHomepage(homepage) {
  opn(homepage, {
    wait: false
  })
}