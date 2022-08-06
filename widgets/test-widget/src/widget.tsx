// @ts-nocheck File not migrated fully to TS
/* eslint-disable no-console, no-process-exit */

import ReactTreeView from './components/ReactTree';

const dummyData = {
    label: 'archive',
    value: 'archive/',
    children: [
        {
            label: 'tentant_AA1',
            value: 'root/archive/tentant_AA1',
            children: [
                { label: 'VM_tenAA1-OAT-jbos-20220430.log', value: 'root/parent/VM_tenAA1-OAT-jbos-20220430.log', leaf: true,
                children: [
                    { label: 'Test 1', value: '"actual_value": "test1","class": "OAT","code": "ABC1","description": "Brief description of the test1.","expected_value": "test1_exp_val","name": "TEST1","result": "PASSED"', leaf: true },
                    { label: 'Test 2', value: '"actual_value": "test2","class": "OAT","code": "ABC2","description": "Brief description of the test2.","expected_value": "test1_exp_val","name": "TEST2","result": "FAILED"', leaf: true }
                ] },
                { label: 'VM_tenAA1-OAT-jbos-20220723.log', value: 'root/parent/VM_tenAA1-OAT-jbos-20220723.log', leaf: true,
                children: [
                    { label: 'Test 1', value: '"actual_value": "test1","class": "OAT","code": "ABC1","description": "Brief description of the test1.","expected_value": "test1_exp_val","name": "TEST1","result": "PASSED"', leaf: true },
                    { label: 'Test 2', value: '"actual_value": "test2","class": "OAT","code": "ABC2","description": "Brief description of the test2.","expected_value": "test1_exp_val","name": "TEST2","result": "FAILED"', leaf: true }
                ] },
                { label: 'VM_tenAA1-OAT-jbos-20220802.log', value: 'root/parent/VM_tenAA1-OAT-jbos-20220802.log', leaf: true,
                children: [
                    { label: 'Test 1', value: '"actual_value": "test1","class": "OAT","code": "ABC1","description": "Brief description of the test1.","expected_value": "test1_exp_val","name": "TEST1","result": "PASSED"', leaf: true },
                    { label: 'Test 2', value: '"actual_value": "test2","class": "OAT","code": "ABC2","description": "Brief description of the test2.","expected_value": "test1_exp_val","name": "TEST2","result": "FAILED"', leaf: true }
                ]           
                },
            ]
        },
        {
            label: 'tentant_AA2',
            value: 'root/archive/tentant_AA2',
        }
    ]
};



Stage.defineWidget({
    id: 'test-widget',
    name: 'Stromova struktura',
    description: 'Stromova struktura',
    initialWidth: 12,
    initialHeight: 32,
    color: 'orange',
    isReact: true,
    hasReadme: true,
    categories: [Stage.GenericConfig.CATEGORY.OTHERS],
    permission: Stage.GenericConfig.CUSTOM_WIDGET_PERMISSIONS.CUSTOM_ALL,

    render(widget, data, error, toolbox) {
        return <ReactTreeView data={dummyData} />;
    }
});
