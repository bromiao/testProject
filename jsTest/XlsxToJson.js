let fs = require('fs');
let path = require('path');
let _ = require('lodash');
let xlsx = require('node-xlsx');
let xlsxPath = './test.xlsx';

let outFilePath = path.join(__dirname, './test.json')
let list = xlsx.parse(xlsxPath);

let data = list[0].data;
let result = [];
const blockCount = Math.ceil(data.length / 3);


for(let i=0;i<blockCount;i++) {
    result[i] = [];
    for(let j=i * 3;j<data.length;j++) {
        result[i].push({text: data[j][0], backgroundColor: data[j][1]})

        if(result[i].length === 3) {
            break;
        }
    }
}
/*_.forEach(data, (d,i) => {
    console.log(i)
    if(i <= 2+i)
    result.push({text: d[0], backgroundColor: d[1]})
})*/

fs.writeFileSync(outFilePath, JSON.stringify(result), err => {
    console.log(err)
})
