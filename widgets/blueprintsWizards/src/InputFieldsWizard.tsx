import Help from  '../../common/src/inputs/InputHelp'; //'./InputHelp';
import InputField from './InputFieldWizard';
//import getInputFieldInitialValue from '../../common/src/inputs/utils/getInputFieldInitialValue'; //'./utils/getInputFieldInitialValue';
import type { DataType, Input, OnChange } from '../../common/src/inputs/types'; //'./types';
import { DataTable } from 'cloudify-ui-components';
import React from 'react';
import {Icon } from 'semantic-ui-react';
import { getInputsOrderByCategories } from './wizardUtils';

function normalizeValue(input: Input, inputsState: Record<string, any>, dataType: DataType) {
    if ((input.type === 'integer' || input.type === 'float') && Number.isNaN(inputsState[input.name])) {
        return '';
    }
    if (_.isUndefined(inputsState[input.name])) {
        dataType;
        return '';//getInputFieldInitialValue(input.default, input.type, dataType);
    }
    return inputsState[input.name];
}

function FormField({
    input,
    value,
    onChange,
    error,
    toolbox,
    dataType
}: {
    input: Input;
    value: any;
    onChange: OnChange;
    error: boolean;
    toolbox: Stage.Types.WidgetlessToolbox;
    dataType: DataType;
}) {
    const { name, display_label: displayLabel, default: defaultValue, description, type, constraints } = input;
    const { Form } = Stage.Basic;
    const help = (
        <Help
            description={description}
            type={type}
            constraints={constraints}
            defaultValue={defaultValue}
            dataType={dataType}
        />
    );
    const required = _.isUndefined(defaultValue);
    const booleanType = type === 'boolean';

    return (
        <Form.Field
            key={name}
            error={booleanType ? null : error}
            help={help}
            required={required}
            label={booleanType ? null : displayLabel ?? name}
        >
            <InputField input={input} value={value} onChange={onChange} error={error} toolbox={toolbox} />
        </Form.Field>
    );
}

function FormSearchField({
    input,
    value,
    //onChange,
    //error,
    toolbox,
    //dataType,
    gsnData
}: {
    input: Input;
    value: any;
    onChange: OnChange;
    error: boolean;
    toolbox: Stage.Types.Toolbox;
    dataType: DataType;
    gsnData:any;
}) {
    const { Form } = Stage.Basic;
    const [data, setData] = React.useState(JSON.parse(JSON.stringify(gsnData)));
   
    const [searchText, setsearchText] = React.useState('');

    // funkce vyplni vybranou business services do pole Input:
    const ConfirmSelectedBusinessService = (_item: any)=> {
        console.log("ConfirmSelectedBusinessService:" + _item.u_number);
        toolbox.getEventBus().trigger('blueprint:setDeploymentIputs','business_service',_item.u_number);
    }

    const onSearch = (_filterText: string) => {
        //console.log("searching..."+_filterText);
        setsearchText(_filterText);
        data.result = [];

        gsnData.result.forEach((element: {name: string; u_number: string; }) => {
            //console.log(element);
            if (element.u_number.toLowerCase().includes(_filterText.toLowerCase())||element.name.toLowerCase().includes(_filterText.toLowerCase())) {
                data.result.push(element);
            }
        });     
        setData(data);
    }

    return (

            <><div className="field">
            <label style={{ display: "inline-block" }}>{input.display_label}</label>
            <div className="field"><div className="ui fluid icon input"><input style={{backgroundColor:"rgba(0,0,0,.05)"}} value={value} readOnly /></div></div>
            </div><div id="id_search_results">

                <Form.Field>
                    <Form.Input
                        icon="search"
                        placeholder="Search Business service ... "
                        value={searchText}
                        onChange={e => onSearch(e.target.value)}
                        loading={false} />
                </Form.Field>
                <div style={{ maxHeight: "150px", overflowY:"scroll"}}>
                    <DataTable
                        className="agentsBlueprintsGsn table-scroll-gsn"
                        sortColumn={"Key"}
                        sortAscending={true}
                    >
                        {/* <DataTable.Column label="Key" name="Key" width="20%" />
                        <DataTable.Column label="Description" name="Description" width="70%" />
                        <DataTable.Column width="10%" name="Action" /> */}

                        {_.map(data.result, item => (
                            <DataTable.Row
                                key={item.u_number}
                                onClick={() => ConfirmSelectedBusinessService(item)}
                            >
                                <DataTable.Data style={{ width: '20%' }}>
                                    {item.u_number}
                                </DataTable.Data>

                                <DataTable.Data style={{ width: '70%' }}>
                                    {item.name}
                                </DataTable.Data>

                                <DataTable.Data className="center aligned rowActions" style={{ width: '10%' }}>
                                    <Icon
                                        name="add"
                                        link
                                        bordered
                                        title="Select business service"
                                        onClick={(event: Event) => {
                                            event.stopPropagation();
                                            ConfirmSelectedBusinessService(item);
                                        } } />
                                </DataTable.Data>

                            </DataTable.Row>
                        ))}
                    </DataTable>
                </div>
            </div></>

       
    );
}

function CountrySelectField({
    //input,
    gsnItemData,
    //onChange,
    //error,
    toolbox,
    //dataType,
    //gsnData
}: {
    //input: Input;
    gsnItemData: any;
    //onChange: OnChange;
    //error: boolean;
    toolbox: Stage.Types.Toolbox;
    //dataType: DataType;
    //gsnData:any;
}) {

    //console.log("GSN data:");
    //console.log(gsnData);
    const { Form } = Stage.Basic;
    //const type=FormFieldType.Checkbox,
    //const booleanType = type === 'boolean';
    // funkce vyplni vybranou business services do pole Input:

    const pokus = (e: any, _item:any)=> {
        console.log("ConfirmSelectedBusinessService:" + _item.countryName);
        //get selected countries:
        console.log(e);
        toolbox.getEventBus().trigger('blueprint:setDeploymentIputs','business_service',_item.u_number);
    }

    return (
        
        <Form.Field>
        {/* {gsnItemData.countryData.region_code} */}
        <Form.Input
            onChange={e => pokus(e.target.value, gsnItemData)}
            loading={false} 
            type="Checkbox"
            label={gsnItemData.countryName}
            />
        </Form.Field> 
    );
}

function RegionSelectField({
    //input,
    gsnItemData,
    //onChange,
    //error,
    toolbox,
    //dataType,
    //gsnData
}: {
    //input: Input;
    gsnItemData: any;
    //onChange: OnChange;
    //error: boolean;
    toolbox: Stage.Types.Toolbox;
    //dataType: DataType;
    //gsnData:any;
}) {

    //console.log("GSN data:");
    //console.log(gsnData);
    const { Form } = Stage.Basic;
    //const type=FormFieldType.Checkbox,
    //const booleanType = type === 'boolean';
    // funkce vyplni vybranou business services do pole Input:

    const pokus = (e: any, _item:any)=> {
        console.log("ConfirmSelectedBusinessService:" + _item);
        //get selected countries:
        console.log(e);
        toolbox.getEventBus().trigger('blueprint:setDeploymentIputs','business_service',_item);
    }

    return (
        
        <Form.Field>
        {/* {gsnItemData.countryData.region_code} */}
        <Form.Input
            onChange={e => pokus(e.target.value, gsnItemData)}
            loading={false} 
            type="Checkbox"
            label={gsnItemData}
            />
        </Form.Field> 
    );
}

export default function InputFields({
    inputs,
    onChange,
    inputsState,
    errorsState,
    toolbox,
    dataTypes,
    gsnData,
    gsnCountries,
    gsnRegions,
    
}: {
    inputs: Record<string, any>;
    onChange: OnChange;
    inputsState: Record<string, any>;
    errorsState: Record<string, any>;
    toolbox: Stage.Types.Toolbox;
    dataTypes?: Record<string, any>;
    gsnData:any;
    gsnCountries:any;
    gsnRegions:any;
}) {
    //inputs je nutne srovnat podle poradi, nyni je poradi podle nacteni z blueprint souboru:

    inputs = getInputsOrderByCategories(inputs);
    //const [dataGsnCountries] = React.useState(JSON.parse(JSON.stringify(gsnCountries)));

    const inputFields = _(inputs)
        .map((input, name) => ({ name, ...input }))
        .reject('hidden')
        //.sortBy([input => !_.isUndefined(input.default), 'name'])
        .map(input => {
            //console.log(input.name);   
            //console.log(inputsState); 
            const dataType = !_.isEmpty(dataTypes) && !!input.type ? dataTypes![input.type] : undefined;
            const value = normalizeValue(input, inputsState, dataType);

            //pokud pole inputState neobsahuje input, pak se preskakuje, tim se vylouci pole podle wizard kroku:
            if (_.isUndefined(inputsState[input.name])) {
                return ;
            }

            if (input.name=="product_name") {
                //console.log("form type product_name");
                //console.log("product_name:"+JSON.stringify(input));
                return <div className="field">
                        <label style={{display:"inline-block"}}>{input.display_label}</label>
                        <div className="field"><div className="ui fluid icon input"><input value={value} readOnly/></div></div>
                    </div>
            }

            // logika ha_concept:
            if (input.name=="availability_zone") {
                //console.log("form type availability_zone");
                //console.log("availability_zone:"+JSON.stringify(input));
                //console.log("inputsState_ha_concept");
                //console.log(inputsState["ha_concept"]);

                if (inputsState["ha_concept"]=="None") {
                    //toolbox.getEventBus().trigger('blueprint:setDeploymentIputs','availability_zone',"1");
                    //nebude se renderovat za danych podminek:
                    return;
                }
                
            }

            if (input.name=="impacted_region") {
                
                return <div className="field">
                        <label style={{ display: "inline-block" }}>{input.display_label}</label>
                        <div className="field" style={{ maxHeight: "150px", overflowY:"scroll"}}>
                                    <DataTable className="agentsBlueprintsGsn table-scroll-gsn">
                                        {_.map(gsnRegions, item => (
                                            <DataTable.Row key={JSON.stringify(item)} >
                                                <DataTable.Data style={{ width: '20%' }}>
                                                    <RegionSelectField gsnItemData={item} toolbox={toolbox}></RegionSelectField>
                                                </DataTable.Data>
                                            </DataTable.Row>
                                        ))}
                                    </DataTable>
                            </div>
                       </div>
            }

            if (input.name=="impacted_country") {
                console.log("form type impacted_region");

                // gsnCountries:{
                // "United Arab Emirates":{"country_code":"AE","region_code":"ASIA","region_name":"ASIA"},
                // "Syrian Arab Republic":{"country_code":"SY","region_code":"ASIA","region_name":"ASIA"},
                // dataGsnCountries.array.forEach((element: any) => {
                //     console.log(element.region_code);
                // });

                return <div className="field">
                        <label style={{ display: "inline-block" }}>{input.display_label}</label>
                        <div className="field" style={{ maxHeight: "150px", overflowY:"scroll"}}>
                                    <DataTable className="agentsBlueprintsGsn table-scroll-gsn">
                                        {_.map(gsnCountries, item => (
                                            <DataTable.Row key={JSON.stringify(item)} >
                                                <DataTable.Data style={{ width: '20%' }}>
                                                    <CountrySelectField gsnItemData={item} toolbox={toolbox}></CountrySelectField>
                                                </DataTable.Data>
                                            </DataTable.Row>
                                        ))}
                                    </DataTable>
                            </div>
                       </div>
            }

            if (input.name=="data_disks") {
                console.log("data_disks");
                return <div className="field">
                    <label style={{ display: "inline-block" }}>{input.display_label}</label>
                    <table>
                        <tr>
                            <td>
                                <select name="disk_type" id="disk_type">
                                    <option value="Standard_LRS">Standard_LRS</option>
                                    <option value="StandardSSD_LRS">StandardSSD_LRS</option>
                                    <option value="Premium_LRS">Premium_LRS</option>
                                </select>
                            </td>
                            <td>
                                <select name="disk_size" id="disk_size">
                                    <option value="4">4</option>
                                    <option value="8">8</option>
                                    <option value="16">16</option>
                                    <option value="64">64</option>
                                    <option value="128">128</option>
                                    <option value="256">256</option>
                                    <option value="512">512</option>
                                </select>
                            </td>
                            <td>Host cacching</td>
                            <td><input type="Text" placeholder='Mount point'></input></td>
                            <td><input type="Text" placeholder='Disk label'></input></td>
                        </tr>
                    </table>
                    <Icon
                                        name="add"
                                        link
                                        bordered
                                        title="Add another data disk"
                                        onClick={(event: Event) => {
                                            event.stopPropagation();
                                        } } />
                </div>
            }
            

            // TODO komponenta jako vyhledavaci: 
            if (input.name=="business_service") {
                //console.log("form type business_service");
                //console.log("business_service:"+JSON.stringify(input));
                            return ( 
                                <div>
                                    <FormSearchField
                                        input={input}
                                        value={value}
                                        onChange={onChange}
                                        error={errorsState[input.name]}
                                        toolbox={toolbox}
                                        dataType={dataType}
                                        gsnData={gsnData}
                                    />
                                </div>
                            )
            }
            
                return (
                    <FormField
                        input={input}
                        value={value}
                        onChange={onChange}
                        error={errorsState[input.name]}
                        toolbox={toolbox}
                        dataType={dataType}
                    />
                );

        })
        .value();

    return <>{inputFields}</>;
}
