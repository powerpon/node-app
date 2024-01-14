const {execSync} = require('child_process');
const fs = require('fs');

const refreshRateMilliseconds = 100;
const logFilePath = './activityMonitor.log';
const loggingRateMilliseconds = 60000;

function getProcessorInfo() {
    const command = (
        process.platform === 'win32' ? 
        'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"' : 
        'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1'
    );
    try {
        return execSync(command, {encoding: 'utf8'}).trim();
    }catch(error){
        console.error(error);
    }
}

function displayMostIntensiveProcess() {
    setInterval(() => {
        process.stdout.write('\r' + getProcessorInfo());
    }, refreshRateMilliseconds);
}

function logMostIntensiveProcess() {
    setInterval(() => {
        const log = Math.floor(Date.now() / 1000) + ' : ' + getProcessorInfo() + '\n';
        fs.appendFile(logFilePath, log, (error) => {
            if(error){
                console.error(error);
            }
        })
    }, loggingRateMilliseconds);
}

displayMostIntensiveProcess();
logMostIntensiveProcess();