const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);


const campanhaPath = path.resolve(__dirname, 'contracts', 'Campanha.sol');
const source = fs.readFileSync(campanhaPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let c in output){
    fs.outputJsonSync(
        path.resolve(buildPath, c.replace(':','') + '.json'),
        output[c]
    );
}
