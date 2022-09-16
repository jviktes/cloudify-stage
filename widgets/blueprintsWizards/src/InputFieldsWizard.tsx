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
    inputStates,
}: {
    //input: Input;
    gsnItemData: any;
    //onChange: OnChange;
    //error: boolean;
    toolbox: Stage.Types.Toolbox;
    //dataType: DataType;
    inputStates:any;
}) {

    const { Form } = Stage.Basic;

    const onRegionChange = (e: any, _item:any)=> {
        //console.log("CountrySelectField:" + _item.countryName);
        //console.log("CountrySelectField e.target:" + e);
        //get selected countries:
        //zde do pole impacted_region musi vyplnit vsechny zakrnute regiony
        //zde musim nejak ziskat vsechny vybrane regiony:
        
        let selectedCountries = JSON.parse(inputStates);
        
        //pokud je e.checked = checked: false
        if (e.checked==true) {
            //pridat do pole:
            if (inputStates.includes(_item.countryName)==false) {
                selectedCountries.push(_item.countryName);
            }
        }
        else {
            if (inputStates.includes(_item.countryName)==true) {
                selectedCountries.pop(_item.countryName);
            }
        }

        console.log(e);
        toolbox.getEventBus().trigger('blueprint:setDeploymentIputs','impacted_country',JSON.stringify(selectedCountries));
    }
    //pokud je v seznamu inputStates dany region, pak se zaskrtne:
    const isSelected = (_gsnItemData: any)=> {
        const _isSelected = inputStates.includes(_gsnItemData);
        return _isSelected;
    };
    return (
        
        <Form.Field>
        {/* {gsnItemData.countryData.region_code} */}
        <Form.Input
            onChange={e => onRegionChange(e.target, gsnItemData)}
            loading={false} 
            type="Checkbox"
            label={gsnItemData.countryName}
            checked={isSelected(gsnItemData.countryName)}
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
    inputStates,
}: {
    //input: Input;
    gsnItemData: any;
    //onChange: OnChange;
    //error: boolean;
    toolbox: Stage.Types.Toolbox;
    inputStates:any;
    //dataType: DataType;
    //gsnData:any;
}) {

    //console.log("GSN data:");
    //console.log(gsnData);
    const { Form } = Stage.Basic;
    //console.log("RegionSelectField inputStates:");
    //console.log(inputStates);

    // funkce vyplni vybranou business services do pole Input:

    const onRegionChange = (e: any, _item:any)=> {
        console.log("ConfirmSelectedBusinessService:" + _item);
        console.log("ConfirmSelectedBusinessService e.target:" + e);
        //get selected countries:
        //zde do pole impacted_region musi vyplnit vsechny zakrnute regiony
        //zde musim nejak ziskat vsechny vybrane regiony:
        
        let selectedRegions = JSON.parse(inputStates);;//["OCEANIA", "AMERICAS"];//JSON.parse(JSON.stringify(inputStates));

        //pokud je e.checked = checked: false
        if (e.checked==true) {
            //pridat do pole:
            if (inputStates.includes(_item)==false) {
                selectedRegions.push(_item);
            }
        }
        else {
            if (inputStates.includes(_item)==true) {
                selectedRegions.pop(_item);
            }
        }

        console.log(e);
        toolbox.getEventBus().trigger('blueprint:setDeploymentIputs','impacted_region',JSON.stringify(selectedRegions)); //["OCEANIA", "AMERICAS"]
    }
    //pokud je v seznamu inputStates dany region, pak se zaskrtne:
    const isSelected = (_gsnItemData: any)=> {
        const _isSelected = inputStates.includes(_gsnItemData);
        return _isSelected;
    };

    return (
        
        <Form.Field>
        {/* {gsnItemData.countryData.region_code} */}
        <Form.Input
            onChange={e => onRegionChange(e.target, gsnItemData)}
            loading={false} 
            type="Checkbox"
            label={gsnItemData}
            checked={isSelected(gsnItemData)}
            />
        </Form.Field> 
    );
}

function DataDiskTable({
    //diskData,
    toolbox,
    inputStates,
}: {
    diskData: any;
    toolbox: Stage.Types.Toolbox;
    inputStates:any;
}) {
    //console.log(diskData); //zbytecne

    const { Form } = Stage.Basic;

    const onItemChange = (e: any, _item:any, _typeProperty:any, _value:any)=> {
        console.log("onItemChange DataDisk:" + _item);
        console.log("DataDisk e.target:" + e);

        let dataDisks = inputStates;

        if (_typeProperty=="disk_type" || _typeProperty=="disk_size" || _typeProperty=="host_caching" 
        || _typeProperty=="mount_point" || _typeProperty=="disk_label") {
            var changedDataDisk = dataDisks.filter((obj: { key: any; }) => {
                return obj.key === _item.key
            })
            if (changedDataDisk[0]!=null) {
                changedDataDisk[0][_typeProperty] = _value;
                toolbox.getEventBus().trigger('blueprint:setDeploymentIputs','data_disks',JSON.stringify(dataDisks));
            }

        } 
    }

    const RemoveDisk=(_item: any)=> {
        console.log("RemoveDisk:" + _item.key);
        let dataDisks = inputStates;

        const indexOfObject = dataDisks.findIndex((object: { key: any; }) => {
        return object.key === _item.key;
        });

        console.log(indexOfObject); // 👉️ 1

        dataDisks.splice(indexOfObject, 1);
        //dataDisks.pop(changedDataDisk[0]);
        toolbox.getEventBus().trigger('blueprint:setDeploymentIputs','data_disks',JSON.stringify(dataDisks));

        // var changedDataDisk = dataDisks.filter((obj: { key: any; }) => {
        //     return obj.key === _item.key
        // })
        // if (changedDataDisk[0]!=null) {
        //     dataDisks.pop(changedDataDisk[0]);
        //     toolbox.getEventBus().trigger('blueprint:setDeploymentIputs','data_disks',JSON.stringify(dataDisks));
        // }
    }

    // let dataDiskFake = [{"key":"AAA","disk_type":"Standard_LRS","disk_size":"16","host_caching":"ReadOnly", "mount_point":"mount point A","disk_label":"Data disk for database"},
    // {"key":"BBB","disk_type":"Premium_LRS","disk_size":"512","host_caching":"ReadOnly", "mount_point":"mount point B","disk_label":"Data disk for aplication"}];

    const DataDiskOptions = [
        { text: 'Standard_LRS', name: 'Standard_LRS', value: 'Standard_LRS' },
        { text: 'StandardSSD_LRS', name: 'StandardSSD_LRS', value: 'StandardSSD_LRS' },
        { text: 'Premium_LRS', name: 'Premium_LRS', value: 'Premium_LRS' },]
    const DiskSizeOptions = [
        { text: '4GB', name: '4GB', value: '4' },
        { text: '8GB', name: '8GB', value: '8' },
        { text: '16GB', name: '16GB', value: '16' },
        { text: '32GB', name: '32GB', value: '32' },
        { text: '64GB', name: '64GB', value: '64' },
        { text: '128GB', name: '128GB', value: '128' },
        { text: '256GB', name: '256GB', value: '256' },
        { text: '512GB', name: '512GB', value: '512' },]
    const DataDiskHostingCashOptions = [
        { text: 'None', name: 'None', value: 'None' },
        { text: 'ReadOnly', name: 'ReadOnly', value: 'ReadOnly' },
        { text: 'ReadWrite', name: 'ReadWrite', value: 'ReadWrite' },]

    return (
            <div>
                <DataTable className="agentsGsnCountries table-scroll-gsn">
                            <DataTable.Column label="disk_type" name="disk_type" width='10%'  />
                            <DataTable.Column label="disk_size" name="disk_size" width='10%' />
                            <DataTable.Column label="host_caching" name="host_caching" width='10%' />
                            <DataTable.Column label="mount_point" name="mount_point" width='30%'/>
                            <DataTable.Column label="disk_label" name="disk_label"  width='35%'/>
                            <DataTable.Column label="" name=""  width='5%'/>
                    {_.map(inputStates, item => (
                        <DataTable.Row key={JSON.stringify(item.key)} >
                            <DataTable.Data style={{ width: '10%' }}>
                                <Form.Dropdown
                                        name="disk_type"
                                        selection
                                        options={DataDiskOptions}
                                        value={item.disk_type}
                                        //onChange={e => onItemChange(e.target, item,"disk_type")}
                                        onChange={(e, { value }) => onItemChange(e.target,item,"disk_type",value)}
                                />
                            </DataTable.Data>
                            <DataTable.Data style={{ width: '10%' }}>
                                <Form.Dropdown
                                        name="disk_size"
                                        selection
                                        options={DiskSizeOptions}
                                        value={item.disk_size}
                                        //onChange={e => onItemChange(e.target, item,"disk_size")}
                                        onChange={(e, { value }) => onItemChange(e.target,item,"disk_size",value)}
                                />
                            </DataTable.Data>
                            <DataTable.Data style={{ width: '10%' }}>
                                <Form.Dropdown
                                        name="host_caching"
                                        selection
                                        options={DataDiskHostingCashOptions}
                                        value={item.host_caching}
                                        //onChange={e => onItemChange(e.target, item,"host_caching")}
                                        onChange={(e, { value }) => onItemChange(e.target,item,"host_caching",value)}
                                />
                             </DataTable.Data>
                             <DataTable.Data style={{ width: '30%' }}>
                                <Form.Input
                                        name="mount_point"
                                        placeholder={'Mount point'}
                                        value={item.mount_point}
                                        //onChange={e => onItemChange(e.target, item,"mount_point")}
                                        onChange={(e, { value }) => onItemChange(e.target,item,"mount_point",value)}
                                />
                             </DataTable.Data>
                             <DataTable.Data style={{ width: '30%' }}>
                                <Form.Input
                                        name="disk_label"
                                        placeholder={'Disk label'}
                                        value={item.disk_label}
                                        //onChange={e => onItemChange(e.target, item,"disk_label")}
                                        onChange={(e, { value }) => onItemChange(e.target,item,"disk_label",value)}
                                />
                             </DataTable.Data>
                             <DataTable.Data style={{ width: '5%' }}>
                                <Icon
                                    name="remove"
                                    link
                                    color='red'
                                    bordered
                                    title="Delete data disk"
                                    onClick={(event: Event) => {
                                        event.stopPropagation(); //item
                                        RemoveDisk(item);
                                    }} />
                            </DataTable.Data>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </div>
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

    var uniqueID = function () {
        return '_' + Math.random().toString(36).slice(2, 11);
    };

    const AddDisk = () => {
        console.log("add disk");
        let dataDisks = JSON.parse(inputsState["data_disks"]);
        dataDisks.push({"key":uniqueID(),"disk_type":"Standard_LRS","disk_size":"16","host_caching":"None", "mount_point":"","disk_label":""});
        toolbox.getEventBus().trigger('blueprint:setDeploymentIputs','data_disks',JSON.stringify(dataDisks));
    }

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

            //product_name_
            if (input.name=="product_name") {
                //console.log("form type product_name");
                //console.log("product_name:"+JSON.stringify(input));
                return <div className="field">
                        <label style={{display:"inline-block"}}>{input.display_label}</label>
                        <div className="field"><div className="ui fluid icon input"><input value={value} readOnly/></div></div>
                    </div>
            }

            //ha_concept:
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

            //impacted_region
            if (input.name=="impacted_region") {
                
                return <div className="field">
                        <label style={{ display: "inline-block" }}>{input.display_label}</label>
                        <div className="field" style={{ maxHeight: "150px", overflowY:"scroll"}}>
                                    <DataTable className="agentsBlueprintsGsn table-scroll-gsn">
                                        {_.map(gsnRegions, item => (
                                            <DataTable.Row key={JSON.stringify(item)} >
                                                <DataTable.Data style={{ width: '20%' }}>
                                                    <RegionSelectField gsnItemData={item} toolbox={toolbox} inputStates={inputsState[input.name]}></RegionSelectField>
                                                </DataTable.Data>
                                            </DataTable.Row>
                                        ))}
                                    </DataTable>
                            </div>
                       </div>
            }

            //impacted_country
            if (input.name=="impacted_country") {
                console.log("form type impacted_country");

                // gsnCountries:{
                // "United Arab Emirates":{"country_code":"AE","region_code":"ASIA","region_name":"ASIA"},
                // "Syrian Arab Republic":{"country_code":"SY","region_code":"ASIA","region_name":"ASIA"},

                return <div className="field" style={{ display: "inline-block" }}>
                        <label>{input.display_label}</label>
                        <div className="field" style={{ maxHeight: "150px", overflowY:"scroll"}}>
                                    <DataTable className="agentsGsnCountries table-scroll-gsn">
                                        {_.map(gsnCountries, item => (
                                            <DataTable.Row key={JSON.stringify(item)} >
                                                <DataTable.Data style={{ width: '20%' }}>
                                                    <CountrySelectField gsnItemData={item} toolbox={toolbox} inputStates={inputsState[input.name]}></CountrySelectField>
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

                        <DataDiskTable diskData={input} toolbox={toolbox} inputStates={JSON.parse(inputsState[input.name])}></DataDiskTable>
                        <Icon
                        name="add"
                        color='green'
                        link
                        bordered
                        title="Add data disk"
                        onClick={(event: Event) => {
                            event.stopPropagation();
                            AddDisk();
                        } } />
                </div>
            }
            
            //business_service: 
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
            //all normal input fieds:
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
