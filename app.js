/* eslint-disable no-console, no-process-exit */
// @ts-nocheck File not migrated fully to TS
const express = require('express');
const app = express();

const fs = require('fs/promises'); 
const path = require('path');

// Defining get request at '/' route
app.get('/', function(req, res) {
  console.log("root");
  res.json({
    number: 1
  });
});
// Defining get request at '/array' route
app.get('/quantity', function(req, res) {
  console.log("quantity");
  res.json(
    {
      "default": 20,
      "description": "Poksuný vstup",
      "type": "integer",
      "constraints": [
          {
              "valid_values": [
                  10,
                  20,
                  30,
                  40,
                  50,
              ]
          }
      ]
    }
  );
});


// Defining get request at '/array' route
app.get('/array', function(req, res) {
  console.log("array");
  res.json([{
      number: 1,
      name: 'John',
      gender: 'male'
    },
    {
      number: 2,
      name: 'Ashley',
      gender: 'female'
    },
    {
      number: 3,
      name: 'Pavel',
      gender: 'male'
    },
    {
      number: 2,
      name: 'Jana',
      gender: 'female'
    }
  ]);
});

// Defining get request at '/array' route
app.get('/gsn', function(req, res) {
  console.log("gsn");
  res.json(
    {
      "results": [{
        "key": "6a09886d-a4c4-496b-956b-22bde6f3b381",
        "description": "Investment Managers"
      }, {
        "key": "c36eaac7-b249-4805-b917-3c1153c4841f",
        "description": "Major Banks"
      }, {
        "key": "2292e290-e2ba-408e-89d6-d342a502c49f",
        "description": "Real Estate Investment Trusts"
      }, {
        "key": "59fd8020-8e4a-4d3a-bff9-a4842507297e",
        "description": "Property-Casualty Insurers"
      }, {
        "key": "23f6f23c-8e10-402f-b523-f7568bbad12b",
        "description": "Real Estate Investment Trusts"
      }, {
        "key": "f31acea9-ed77-4542-a93c-d836bf7d9a1b",
        "description": "EDP Services"
      }, {
        "key": "1c85ad10-8abf-4775-950f-736443c2819b",
        "description": "Industrial Machinery/Components"
      }, {
        "key": "d251c2bb-5de9-4be5-855d-6a66dc1e3f99",
        "description": "Major Banks"
      }, {
        "key": "582e743a-5ee5-400e-99a1-ad6c313345e7",
        "description": "Major Pharmaceuticals"
      }, {
        "key": "daa1f426-ad8c-4210-9edf-4d9ef2ab16bd",
        "description": "n/a"
      }, {
        "key": "57ea1bc5-d18e-4cde-a1ce-09208003fb7e",
        "description": "Major Banks"
      }, {
        "key": "d93e1851-2ee4-4e68-b8f9-b85208ad791d",
        "description": "Finance: Consumer Services"
      }, {
        "key": "046a6bd6-cd13-4083-9b49-c1e981c06e0d",
        "description": "n/a"
      }, {
        "key": "1e55f054-cb41-44b2-9d24-cf0aed4b4c55",
        "description": "Biotechnology: In Vitro & In Vivo Diagnostic Substances"
      }, {
        "key": "1a6bc0d0-5c7a-447d-af4f-c372e15ca003",
        "description": "Hotels/Resorts"
      }, {
        "key": "470dca2b-ea69-4f04-94ea-f9cb712471ad",
        "description": "EDP Services"
      }, {
        "key": "6e9eaf37-ca48-4c18-86ef-bbdecabf2317",
        "description": "Multi-Sector Companies"
      }, {
        "key": "c15fa204-b9ab-4cc1-a9a7-6aa2a98d20c6",
        "description": "Biotechnology: Biological Products (No Diagnostic Substances)"
      }, {
        "key": "b830c62b-c55b-41bd-bed4-a75fb758c1ed",
        "description": "Computer peripheral equipment"
      }, {
        "key": "eeb1f62e-d932-4340-a562-949e574014a5",
        "description": "EDP Services"
      }, {
        "key": "c5ff5c4d-6851-4deb-b809-b3fb3ba393b7",
        "description": "Computer Software: Prepackaged Software"
      }, {
        "key": "1c8703f1-917a-4429-9b55-8be6f15a298a",
        "description": "Investment Bankers/Brokers/Service"
      }, {
        "key": "63935eec-7a07-43f5-869d-1f38ca3c9074",
        "description": "n/a"
      }, {
        "key": "a1689127-b009-4005-a1fc-c041c03d0e97",
        "description": "Real Estate Investment Trusts"
      }, {
        "key": "11b8c0cb-f44f-4e2e-ba00-01392de56f05",
        "description": "Investment Managers"
      }, {
        "key": "f8b887a6-11e6-4912-be82-14b13f6df11b",
        "description": "Electrical Products"
      }, {
        "key": "2364c194-79be-413d-834b-1bb89a6f53cb",
        "description": "Major Pharmaceuticals"
      }, {
        "key": "ce90c6cf-0573-4fc1-b529-c5e04507127b",
        "description": "Major Pharmaceuticals"
      }, {
        "key": "aec33168-5b1c-4d5c-a0ab-d828b6ffff4e",
        "description": "Real Estate Investment Trusts"
      }, {
        "key": "a8708b08-7cec-48fa-aeee-d8f17bffe5f8",
        "description": "Computer Communications Equipment"
      }, {
        "key": "7c555feb-b953-403c-8912-8152178134c7",
        "description": "Homebuilding"
      }, {
        "key": "cbb34141-d64a-4771-a774-674668644f8d",
        "description": "Industrial Machinery/Components"
      }, {
        "key": "50a68b20-3380-4afe-b749-da846fc987b6",
        "description": "Major Banks"
      }, {
        "key": "62b972bb-0b8a-4ee1-a07c-addfc7609d42",
        "description": "Investment Bankers/Brokers/Service"
      }, {
        "key": "c6a67a23-4227-404c-867e-a394a2ec61c0",
        "description": "Property-Casualty Insurers"
      }, {
        "key": "153d0b05-b9ff-4667-9243-965d4038f34c",
        "description": "Package Goods/Cosmetics"
      }, {
        "key": "1d257fa3-9718-4a5d-a0e4-c1afc560d888",
        "description": "Major Pharmaceuticals"
      }, {
        "key": "fcabf60e-6b90-46dd-b0a3-425d354fdda0",
        "description": "Transportation Services"
      }, {
        "key": "e7fbe032-e37d-4641-b0ed-94c59f622175",
        "description": "Biotechnology: In Vitro & In Vivo Diagnostic Substances"
      }, {
        "key": "7eb2a0a0-e1c9-40d1-8526-8a491471bd60",
        "description": "Major Chemicals"
      }, {
        "key": "0f5be5d0-bda3-4138-8b51-1e2520a4ca33",
        "description": "Apparel"
      }, {
        "key": "9fc167a0-9f6b-4f38-8f7e-a12b1ad20841",
        "description": "Investment Bankers/Brokers/Service"
      }, {
        "key": "3f8f417b-affa-4e86-ad80-35a93d84ffe7",
        "description": "Oil & Gas Production"
      }, {
        "key": "82d8a0d3-a366-428e-835f-321ffb1b5f7e",
        "description": "n/a"
      }, {
        "key": "9cab72a6-f805-48b8-8658-0875280038ae",
        "description": "Oil & Gas Production"
      }, {
        "key": "9acf754f-bc37-443a-ad56-9ac3081c1b22",
        "description": "Finance: Consumer Services"
      }, {
        "key": "31746c96-dc41-427b-9c4c-e404bcc696c1",
        "description": "Oilfield Services/Equipment"
      }, {
        "key": "53a650b9-e502-4483-8e5d-3c9fd92989cc",
        "description": "Major Banks"
      }, {
        "key": "75bdc115-9d42-4537-81cb-6cb8b087a152",
        "description": "n/a"
      }, {
        "key": "7a82be59-550e-4be7-98d4-f584e225bd47",
        "description": "Medical/Dental Instruments"
      }, {
        "key": "f9aeec4d-5dc9-4556-9e48-d410666f9afa",
        "description": "Containers/Packaging"
      }, {
        "key": "1e60cf14-bee5-48ee-ba3f-78a6b808f0a7",
        "description": "Marine Transportation"
      }, {
        "key": "48b4f60b-0151-4f07-a3bc-6b3cea9f3c24",
        "description": "n/a"
      }, {
        "key": "2884c467-6be9-49ca-ae05-ced12d3a2bb8",
        "description": "n/a"
      }, {
        "key": "1ca76af1-7f7f-48d9-a73b-363413a6f9a2",
        "description": "Oil & Gas Production"
      }, {
        "key": "ff56abf5-4046-424d-9512-ae6b714eedf4",
        "description": "Finance/Investors Services"
      }, {
        "key": "255e876b-9d75-4ee7-bb13-7bae1466a370",
        "description": "Computer Software: Prepackaged Software"
      }, {
        "key": "9b4fe553-bb63-4ca0-a9c7-ded9bd7f676f",
        "description": "Telecommunications Equipment"
      }, {
        "key": "69217c4c-5f68-4fad-b497-2dc143d677ae",
        "description": "EDP Services"
      }, {
        "key": "c6146a3e-700b-4a55-9665-79588cef4e80",
        "description": "Savings Institutions"
      }, {
        "key": "81e83a74-183c-4ba3-88f4-da0e885ac6d1",
        "description": "n/a"
      }, {
        "key": "c998dd30-e70f-43be-9b93-0ede50ff7f60",
        "description": "Medical/Dental Instruments"
      }, {
        "key": "5748be0a-0b69-424e-bbeb-cbc98d3c79ce",
        "description": "Electronic Components"
      }, {
        "key": "aae278d1-f22d-4ff2-8c45-6a397c35083f",
        "description": "Major Banks"
      }, {
        "key": "fdbd5420-3a1f-41a2-bb7f-529df651d9ed",
        "description": "Military/Government/Technical"
      }, {
        "key": "a49da71c-c770-4c55-b9f0-a7b0639b61ba",
        "description": "Electronic Components"
      }, {
        "key": "94d3d46a-8abe-4099-94ca-2b7ec780b129",
        "description": "Savings Institutions"
      }, {
        "key": "33585975-0c63-4171-8827-2cdeb81a3e8f",
        "description": "Auto Manufacturing"
      }, {
        "key": "36bb70d3-9fba-4051-a0c5-e53748202abf",
        "description": "Major Chemicals"
      }, {
        "key": "2836d428-7670-4416-90c1-521edc93657a",
        "description": "Finance: Consumer Services"
      }, {
        "key": "cd022b9d-5cf3-4d9f-ad4c-2ed3d38d43ed",
        "description": "n/a"
      }, {
        "key": "487c71a8-b5d6-4e51-88b6-733b2ab0c315",
        "description": "Major Pharmaceuticals"
      }, {
        "key": "998dd7fc-6e1c-4cad-84bd-4d3f2475f17f",
        "description": "n/a"
      }, {
        "key": "19377adb-9dd6-4d93-b289-630b0a295e7f",
        "description": "Major Pharmaceuticals"
      }, {
        "key": "c82e0413-0e41-4605-b110-edff1b44c318",
        "description": "Property-Casualty Insurers"
      }, {
        "key": "f3a946dd-1820-49cd-baf9-06766ffeef07",
        "description": "Property-Casualty Insurers"
      }, {
        "key": "53135723-534b-4203-8070-f151510b1451",
        "description": "n/a"
      }, {
        "key": "2d138f72-e744-41ec-ac34-4d989c7565a6",
        "description": "Farming/Seeds/Milling"
      }, {
        "key": "f84d8993-fb2b-4654-a31e-ed3afce5be84",
        "description": "Major Banks"
      }, {
        "key": "07bcf692-1863-42b0-9ffc-1a37e2b02d50",
        "description": "Major Banks"
      }, {
        "key": "d328f196-c45d-41f9-b9e3-1f7491da3547",
        "description": "Hotels/Resorts"
      }, {
        "key": "cd54f77a-14f1-4c08-923e-bde180cb9f4d",
        "description": "Engineering & Construction"
      }, {
        "key": "a64021a9-bfac-43a7-9ea7-b92e5b19df98",
        "description": "n/a"
      }, {
        "key": "669b134b-1a82-4bc7-a588-5f189c009266",
        "description": "Oil & Gas Production"
      }, {
        "key": "597daaf7-766d-44a2-98d0-67a3c5a8a511",
        "description": "n/a"
      }, {
        "key": "edfeca6f-c78f-4f90-9479-b6e1c86991c7",
        "description": "Real Estate"
      }, {
        "key": "3b5598b8-b5b3-44d8-a05d-e4441b0c071d",
        "description": "Real Estate Investment Trusts"
      }, {
        "key": "9ed8e226-1813-471a-a910-bafe3f5b1391",
        "description": "Major Banks"
      }, {
        "key": "080a8f72-ac74-459a-8ad0-2e072fa9285b",
        "description": "Specialty Insurers"
      }, {
        "key": "b7c90296-d0e6-4e9f-91fa-965f905e9a8f",
        "description": "Biotechnology: Biological Products (No Diagnostic Substances)"
      }, {
        "key": "a260e596-72c5-489e-a1f7-bc894c03e21a",
        "description": "n/a"
      }, {
        "key": "c4b240d0-7e85-485c-8667-e90aa5391b06",
        "description": "Semiconductors"
      }, {
        "key": "08b3320a-fcf4-4317-acca-77d123183de5",
        "description": "Telecommunications Equipment"
      }, {
        "key": "e88dfd26-69c6-4569-b1e5-6176580bd0e5",
        "description": "Medical/Dental Instruments"
      }, {
        "key": "15021db7-d21b-4df0-8fc8-9fa92404f2b9",
        "description": "n/a"
      }, {
        "key": "20231b4a-2cf1-4c49-85de-197beb7169ac",
        "description": "Banks"
      }, {
        "key": "31c4d3f9-f436-4ef8-9745-2af429772563",
        "description": "n/a"
      }, {
        "key": "9b55be57-8084-45e5-ad67-db5f68f71bb5",
        "description": "Services-Misc. Amusement & Recreation"
      }, {
        "key": "4706617f-b9f6-466e-9737-b30618640d98",
        "description": "Major Banks"
      }, {
        "key": "f694ee15-041b-449d-907c-bf822ea9d7f6",
        "description": "Oil & Gas Production"
      }]
    }
  );
});

// Setting the server to listen at port 3000
app.listen(3000, function(req, res) {
  console.log("Server is running at port 3000");
});