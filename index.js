#!/usr/bin/env node

(function(global) {
  'use strict';
  var chalk = require('chalk');
  var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
  var ora = require('ora');
  var spinner;
  var program = require('commander');
  var version = require('./package.json').version;

  program
    .version(version, '-v, --version')
    .description('Scans bluetooth devices')
    .option('-n, --name [device]', '[optional] If device name is known, only output MAC address')
    .parse(process.argv);

  btSerial.on('found', function(address, name) {
    if((typeof program.name === 'string') && (program.name === name)) {
      console.log(address);
    } else if(typeof program.name !== 'string') {
      spinner.stop();
      console.log('\t- Found device: ' + chalk.green(address) + ' (' + chalk.blue(name) + ')');
    }
  });

  if(typeof program.name !== 'string') {
    console.log(chalk.bold('\nStart bluetooth scanning (v' + version + ') \n'));
    spinner = ora('Inquire bluetooth devices').start();
  }
  btSerial.inquire();

})(this);
