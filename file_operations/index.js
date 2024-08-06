const fs = require('fs');
const pfs = require('fs/promises');

fs.writeFile('/tmp/file.txt', "Hello World\n", { flag: 'a+' }, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log('1. File written successfully');
    }
});

console.log('This will print first');
try {
    fs.writeFileSync('/tmp/file1.txt', 'Hello World!');
    console.log('2. File written successfully');
} catch {
    console.log('Error while writing file');
}
console.log('This will print after writing file');


(async function () {
    try {
        await pfs.writeFile('/tmp/file3.txt', 'Hello World!');
        console.log('3. File written successfully');
    } catch (err) {
        console.log('Error while writing file file3');
        console.log(err);
    }
})();

fs.readFile('/tmp/file.txt', 'utf8', (err, data) => {
    if (!err) {
        console.log('ASYNC');
        console.log(data);
    }
});

const data = fs.readFileSync('/tmp/file.txt', 'utf8');
console.log('SYNC');
console.log(data);