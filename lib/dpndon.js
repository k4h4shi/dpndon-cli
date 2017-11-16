#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');

program
    .command(
      'opener [packagename]',
      'launch the opener for dependencies of the npm project'
    )
    .parse(process.argv);
