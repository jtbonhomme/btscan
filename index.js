#!/usr/bin/env node

var chalk = require('chalk');
var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
var ora = require('ora');
var spinner;

btSerial.on('found', function(address, name) {
    spinner.stop();
    console.log('\t- Found device: ' + chalk.green(address) + ' (' + chalk.blue(name) + ')');
/*    btSerial.findSerialPortChannel(address, function(channel) {
        console.log('\t\t> channel: ' + chalk.red(channel));
        // close the connection when you're ready
        btSerial.close();
    }, function() {
        console.log('\t\t ... found nothing for this device');
    });*/
});

console.log(chalk.bold('\nStart bluetooth scanning\n'));
spinner = ora('Inquire bluetooth devices').start();
btSerial.inquire();
