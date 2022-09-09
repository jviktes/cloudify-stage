import Help from  '../../common/src/inputs/InputHelp'; //'./InputHelp';
import InputField from './InputFieldWizard';
//import getInputFieldInitialValue from '../../common/src/inputs/utils/getInputFieldInitialValue'; //'./utils/getInputFieldInitialValue';
import type { DataType, Input, OnChange } from '../../common/src/inputs/types'; //'./types';
import { DataTable } from 'cloudify-ui-components';
import React from 'react';
import { Icon } from 'semantic-ui-react';

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
    onChange,
    error,
    toolbox,
    dataType,
    gsnData,
}: {
    input: Input;
    value: any;
    onChange: OnChange;
    error: boolean;
    toolbox: Stage.Types.Toolbox;
    dataType: DataType;
    gsnData:any;

}) {
    const { name, display_label: displayLabel, default: defaultValue, description, type, constraints } = input;
    const { Form } = Stage.Basic;

    //const [data, setData] = React.useState({});
    const [data, setData] = React.useState(JSON.parse(JSON.stringify(gsnData)));
    const [searchText, setsearchText] = React.useState('');
    //const [valueBusinessService, setValue] = React.useState(defaultValue);

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

    // funkce vyplni vybranou business services do pole Input:
    const ConfirmSelectedBusinessService = (_item: any)=> {
        console.log(_item.key);  
        console.log(value);  
        //business_service
        //value=_item.key;
        
        //toolbox.getContext().setValue("business_service",_item.key);
        //TODO: zde nastavit input:

        

        //setValue(_item.key);

        //const input = document.querySelector("[name='business_service']") as HTMLInputElement | null;
        //input?.dispatchEvent(new Event());

        toolbox.getEventBus().trigger('blueprint:refresh',"nazdar");

        //console.log(input?.name);
        //value = "ffff";
        //toolbox.refresh();
        //input?. = _item.key;
        //onChange;
        
        //var element = document.getElementById('element_id');
        //element?.value = 'random_value';

        //var ev = new Event('input', { bubbles: true});
        //ev.simulated = true;
        //input.value = 'Something new';
        //element.dispatchEvent(ev);

        // handleDeploymentInputChange(_: SyntheticEvent | null, field: Field) {
        //     const { deploymentInputs } = this.state;
        //     const fieldNameValue = Stage.Basic.Form.fieldNameValue(field);
        //     this.setState({ deploymentInputs: { ...deploymentInputs, ...fieldNameValue } });
        // }
        //const fieldNameValue = Stage.Basic.Form.fieldNameValue('business_service');
    }

    const onSearch = (_filterText: string) => {
        //let searchResult = {};

        console.log("searching..."+_filterText);
        setsearchText(_filterText);
        //console.log(data);
        data.results = [];
        //console.log(gsnData);
        //console.log(data);
        //console.log(_filterText);
        gsnData.results.forEach((element: { key: string | string[]; }) => {
            console.log(element);
            if (element.key.includes(_filterText)) {
                data.results.push(element);
            }
        });     
        setData(data);
        //console.log(data);
        //return data;
        
    }

    return (
        <Form.Field
            key={name}
            error={booleanType ? null : error}
            help={help}
            required={required}
            label={booleanType ? null : displayLabel ?? name}
        >
        <InputField input={input} value={value}  onChange={onChange} error={error} toolbox={toolbox} />

            <div id="id_search_results">

                <Form.Field>
                        <Form.Input
                            icon="search"
                            placeholder="Search..."
                            value={searchText}
                            onChange={e => onSearch(e.target.value)}
                            loading={false}
                        />
                    </Form.Field>            
                 <DataTable
                    className="agentsTable table-scroll"
                    sortColumn={"Key"}
                    sortAscending={true}
                >
                    <DataTable.Column label="Key" name="Key"/>
                    <DataTable.Column label="Description" name="Description"/>
                    <DataTable.Column width="10%" name="Action" />

                    {_.map(data.results, item => ( 
                            <DataTable.Row
                            key={item.key}
                            onClick={() => ConfirmSelectedBusinessService(item)}
                        >
                            <DataTable.Data>
                                {item.key}
                            </DataTable.Data>

                            <DataTable.Data>
                                {item.description}
                            </DataTable.Data>

                            <DataTable.Data className="center aligned rowActions">
                                        <Icon
                                            name="add"
                                            link
                                            bordered
                                            title="Select business service"
                                            onClick={(event: Event) => {
                                                event.stopPropagation();
                                                ConfirmSelectedBusinessService(item)
                                            }}
                                        />
                            </DataTable.Data>

                        </DataTable.Row>
                    ))}
                </DataTable>
            </div>

        </Form.Field>
    );
}



// function SearchResults() {
//     // funkce bude vyhledavat a generovat vysledky podle vstupu z pole Input a podle moznych 
//     alert("ahoj") ;
// }

export default function InputFields({
    inputs,
    onChange,
    inputsState,
    errorsState,
    toolbox,
    dataTypes,
    gsnData,
}: {
    inputs: Record<string, any>;
    onChange: OnChange;
    inputsState: Record<string, any>;
    errorsState: Record<string, any>;
    toolbox: Stage.Types.Toolbox;
    dataTypes?: Record<string, any>;
    gsnData:any;
}) {
    const inputFields = _(inputs)
        .map((input, name) => ({ name, ...input }))
        .reject('hidden')
        //.sortBy([input => !_.isUndefined(input.default), 'name'])
        .map(input => {
            //console.log(input.name);   
            //console.log(inputsState); 
            const dataType = !_.isEmpty(dataTypes) && !!input.type ? dataTypes![input.type] : undefined;
            const value = normalizeValue(input, inputsState, dataType);

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
