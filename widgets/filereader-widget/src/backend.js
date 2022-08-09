/* eslint-disable no-console, no-process-exit */
// @ts-nocheck File not migrated fully to TS
module.exports = function(r) {
    r.register('files', 'GET', (req, res, next, helper) => {
    console.log("Dotaz:");
    const params = { ...req.query };
    console.log(params.deployment_id);
    helper.Request.doGet(`http://localhost:3000/files`)
    .then(data => {
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        dispatch(errorClusterStatus(err));
    });
});
}

module.exports = async function(r) {
    r.register('filesAPI', 'GET', (req, res, next, helper) => {
    const moment = require('moment');
    const lodash = require('lodash');
    console.log("filesAPI");

    // parsing parametres:
    const params = { ...req.query };
    console.log(params);
    const _sortParam = lodash.castArray(params._sort)[0];
    const _searchParam = lodash.castArray(params._search)[0];
    const _sizeParam = lodash.castArray(params._size)[0];
  
    const testFolder = '/var/log/cloudify/archive/tentant-AA1/';  // TODO!  
    
    const processedDataToJson = data => {

        let outputData = [];
        //console.log(data);
        for (const [key, value] of Object.entries(data)) {

            let _res = [];
            let _fileName = key; //<VM-name>-<ACT-class>-<ACT-set>-<timestamp>.log 

            //funkce pro splitting:
            let text = _fileName;
            const myArray = text.split("-");
            let _VM = myArray[0];

            //vyhledavani podle VM
            //console.log("_searchParam:"+_searchParam);
            //console.log("_VM:"+_VM);
            //console.log(_VM.indexOf(_searchParam));

            if (_searchParam && _VM.indexOf(_searchParam)== -1) {
                continue; //skipping file 
            }


            let _actClassFromFileName = myArray[1];
            let _actSetFromFileName = myArray[2];
            let _actTimeStampFromFileName = myArray[3].slice(0, -4); //YYYYMMDDhhmmss 

            let _testDateFormatted = moment(_actTimeStampFromFileName, 'YYYYMMDDhhmmss').format("YYYY-MM-DD hh:mm:ss");

            // console.log(_testDateFormatted);

            let _actual_value = [];
            let _class = [];
            let _code = [];
            let _description= [];
            let _expected_value= [];
            let _name= [];
            let _result= [];
            let _testResultArray = [];
            let _passedTestsCount = 0;
            let _failedTestsCount = 0;

            //prerovnani vysledku testu, podle pole result:

            value.results.forEach(_testData => {
                _actual_value = _testData.actual_value;
                _class = _testData.class;
                _code = _testData.code;
                _description= _testData.description;
                _expected_value= _testData.expected_value;
                _name= _testData.name;
                _result = _testData.result;
                if (_testData.result.toString().toLowerCase() && _testData.result.toString().toLowerCase().indexOf("passed")!== -1) {
                    _passedTestsCount++;
                }
                if (_testData.result.toString().toLowerCase() && _testData.result.toString().toLowerCase().indexOf("failed")!== -1) {
                    _failedTestsCount++;
                }

                _testResultArray.push(
                    {
                        "actual_value": _actual_value,
                        "class": _class,
                        "code":  _code, 
                        "description":  _description,
                        "expected_value":  _expected_value,
                        "name":  _name,
                        "result": _result,
                    }
                );
            });

            outputData.push({
                "fileName":_fileName, 
                "virtualMachine": _VM,
                "testDatum": _testDateFormatted,//_testDateFormatted, _actTimeStampFromFileName
                "requestor": value.requestor,
                "deployment_id":value.deployment_id,
                "deployment_name":value.deployment_name, 
                "passedTestsCount" : _passedTestsCount,
                "failedTestsCount": _failedTestsCount,
                "testResultArray":JSON.stringify(_testResultArray)
            });
        }
        //console.log(outputData);
        return outputData;

    }
    
    
    let result ={};

    const folder = testFolder;
    const fs = require('fs-extra');
    
        let promises = [];
        fs.readdir(folder, (err, files) => {

            files.forEach(file => {
                {
                    //console.log("resolving file: "+file);
                    result[file]="";
                    
                    let promise1 = new Promise(function(resolve, reject) {
                         resolve(fs.readFile(folder+"/"+file));
                    });
                    promises.push(promise1);
                    //console.log(promises);
                    promise1.then(
                
                        (result1) => { 
                            
                            result[file] = JSON.parse(result1.toString());
                            //console.log(result[file]);
                        }
                
                    );
                }
            });
            Promise.all(promises).then((_res) => {
                //console.log("data from files ready2go:");
                //console.log(result);
                let preparedData = processedDataToJson(result);

                // sorting:
                if (_sortParam && _sortParam.indexOf("fileName")!== -1) {
                    //console.log("sorting fileName");
                    // prvni verze sortingu podle souboru:
                    if (_sortParam.startsWith("-")) {
                        preparedData.sort((a,b) => (a.fileName < b.fileName) ? 1 : ((b.fileName < a.fileName) ? -1 : 0));
                    }
                    else {
                        preparedData.sort((a,b) => (a.fileName > b.fileName) ? 1 : ((b.fileName > a.fileName) ? -1 : 0));
                    }
                }

                if (_sortParam && _sortParam.indexOf("testDatum")!== -1) {
                    // prvni verze sortingu podle souboru:
                    //console.log("sorting testDatum");
                    if (_sortParam.startsWith("-")) {
                        preparedData.sort((a,b) => (new moment(a.testDatum).format('YYYY-MM-DD hh:mm:ss') < new moment(b.testDatum).format('YYYY-MM-DD hh:mm:ss')) ? 1 : ((new moment(b.testDatum).format('YYYY-MM-DD hh:mm:ss') < new moment(a.testDatum).format('YYYY-MM-DD hh:mm:ss')) ? -1 : 0));
                    }
                    else {
                        preparedData.sort((a,b) => (new moment(a.testDatum).format('YYYY-MM-DD hh:mm:ss') > new moment(b.testDatum).format('YYYY-MM-DD hh:mm:ss')) ? 1 : ((new moment(b.testDatum).format('YYYY-MM-DD hh:mm:ss') > new moment(a.testDatum).format('YYYY-MM-DD hh:mm:ss')) ? -1 : 0));
                    }
                }

                if (_sortParam && _sortParam.indexOf("virtualMachine")!== -1) {
                    //console.log("sorting virtualMachine");
                    // prvni verze sortingu podle souboru:
                    if (_sortParam.startsWith("-")) {
                        preparedData.sort((a,b) => (a.virtualMachine < b.virtualMachine) ? 1 : ((b.virtualMachine < a.virtualMachine) ? -1 : 0));
                    }
                    else {
                        preparedData.sort((a,b) => (a.virtualMachine > b.virtualMachine) ? 1 : ((b.virtualMachine > a.virtualMachine) ? -1 : 0));
                    }
                }
                //console.log(preparedData);
                res.send(preparedData);
            });
        });

})}