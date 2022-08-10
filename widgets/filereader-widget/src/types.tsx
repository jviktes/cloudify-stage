export type Tests = {
    requestor: string;
    fileName: string;
    virtualMachine:string;
    class: string;
    code:  string; 
    testDatum:string;
    passedTestsCount:string;
    failedTestsCount:string;
    testResultSummary:string;
    deployment_id: string;
    deployment_name: string;
    testResultArray: TestResult;
};

export type TestResult = {
    actual_value: string;
    class: string;
    code:  string; 
    description:  string;
    expected_value:  string;
    name:  string;
    result:  string;
};

// Log file structure (JSON string): 

// { 

//     "requestor": "Email / UPN of requestor", 

//     "deployment_id": "ID of deployment", 

//     "deployment_name": "Name of deployment", 

//     "results": [ 

//         {         

//             "actual_value": "Actual configuration value (if applicable)", 

//             "class": "ACT class: [OAT|CIS]", 

//             "code": "Unique code of the test within the class", 

//             "description": "Brief description of the test.", 

//             "expected_value": "Expected configuration value (if applicable)", 

//             "name": "Name of the test", 

//             "result": "Test result: [PASSED|FAILED]" 

//         } 

//     ] 

// } 