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
    console.log("filesAPI");
    const testFolder = '/var/log/cloudify/archive/tentant-AA1/';    
    let result ={};

    const folder = testFolder;
    const fs = require('fs-extra');
    
        let promises = [];
        fs.readdir(folder, (err, files) => {

            files.forEach(file => {
                {
                    console.log("resolving file: "+file);
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
                console.log("data from files ready2go");
                //console.log(result);
                res.send(result);
            });
        });

})}