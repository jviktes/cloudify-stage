// @ts-nocheck File not migrated fully to TS
//  fetchUrl: '[manager]/eventsVik[params]',
/* eslint-disable no-console, no-process-exit */
import { result } from 'lodash';
import Zobraz from './Zobraz';

const data1 = 'pokusný text';
Stage.defineWidget({
    id: 'filereader-widget',
    name: 'Nacteni souboru',
    description: 'Nacteni souboru',
    initialWidth: 12,
    initialHeight: 12,
    color: 'orange',
    isReact: true,
    hasReadme: true,
    categories: [Stage.GenericConfig.CATEGORY.OTHERS],
    permission: Stage.GenericConfig.CUSTOM_WIDGET_PERMISSIONS.CUSTOM_ALL,
    fetchData(widget, toolbox) {
        console.log('fetch files data...');
        const params = {
            deployment_id: "liberec"
        };
        return toolbox.getWidgetBackend().doGet('filesAPI', { params });
    },

    fetchParams(widget, toolbox) {
        const params = {};
        const deploymentId = "liberec";//toolbox.getContext().getValue('deploymentId');
        if (!_.isEmpty(deploymentId)) {
            params.deployment_id = _.castArray(deploymentId);
        }
        //console.log("fetchParams:");
        //console.log(params);
        return params;
    },

    processData(data) {

        let outputData = [];

        //console.log(data);
        // toto bylo ok:
        // for(let key of Object.keys(data)){
        //     console.log(key);
        // }

        for (const [key, value] of Object.entries(data)) {

            //console.log(`${key}: ${value}`);
            //console.log(value);

            let _res = [];
            let _fileName = key; //<VM-name>-<ACT-class>-<ACT-set>-<timestamp>.log 

            //funkce pro splitting:
            let text = _fileName;
            const myArray = text.split("-");
            let _VM = myArray[0];
            let _actClassFromFileName = myArray[1];
            let _actSetFromFileName = myArray[2];
            let _actTimeStampFromFileName = myArray[3].slice(0, -4); //YYYYMMDDhhmmss 

            let _testDateFormatted = moment(_actTimeStampFromFileName, 'YYYYMMDDhhmmss').format("YYYY-MM-DD hh:mm:ss");;
            console.log(_testDateFormatted);

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
            _.each(value.results, _testData => {
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
                "testDatum": _testDateFormatted,
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
    },
    render(widget, data, error, toolbox) {
        const _data = this.processData(data);
        //console.log(pokusData);

        //console.group(toolbox.getContext());

        const formattedData = {
            items: _data,
            deploymentId: 'test results'
        };

        return <Zobraz widget={widget} data={formattedData} toolbox={toolbox} />;
    }
});
