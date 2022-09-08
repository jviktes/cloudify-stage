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

// EventsTable.propTypes = {
//     data: PropTypes.shape({
//         executionId: PropTypes.arrayOf(PropTypes.string),
//         items: PropTypes.arrayOf(
//             PropTypes.shape({
//                 blueprint_id: PropTypes.string,
//                 deployment_id: PropTypes.string,
//                 deployment_display_name: PropTypes.string,
//                 error_causes: ErrorCausesPropType,
//                 event_type: PropTypes.string,
//                 id: PropTypes.number,
//                 isSelected: PropTypes.bool,
//                 level: PropTypes.string,
//                 message: PropTypes.string,
//                 node_instance_id: PropTypes.string,
//                 node_name: PropTypes.string,
//                 operation: PropTypes.string,
//                 type: PropTypes.string,
//                 workflow_id: PropTypes.string
//             })
//         ),
//         nodeInstanceId: PropTypes.arrayOf(PropTypes.string),
//         timestamp: PropTypes.string,
//         total: PropTypes.number
//     }).isRequired,
//     toolbox: Stage.PropTypes.Toolbox.isRequired,
//     widget: Stage.PropTypes.Widget.isRequired
// };


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
    toolbox: Stage.Types.WidgetlessToolbox;
    dataType: DataType;
    gsnData:any;

}) {
    const { name, display_label: displayLabel, default: defaultValue, description, type, constraints } = input;
    const { Form } = Stage.Basic;

    //const [data, setData] = React.useState({});

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

    //let data = {results: PropTypes.arrayOf(GSNBusinessServiceProps)};
    let data = gsnData;
        
    // const fetchGSN = async () => {
    //     console.log("calling fetchGSN");
    //     const key="GSN_Business_services_cash";
    //     const response = await toolbox.getManager().doGet(`/secrets/${key}`);
    //     const _data = await response;
    //     console.log("GSN_Business_services_cash:");
    //     //data =  JSON.parse(_data.value);
    //     setData(JSON.parse(_data.value))
    //     console.log(data);
    //     //return data;
    // }
    
    //fetchGSN();

    return (
        <Form.Field
            key={name}
            error={booleanType ? null : error}
            help={help}
            required={required}
            label={booleanType ? null : displayLabel ?? name}
        >
            <InputField input={input} value={value} onChange={onChange} error={error} toolbox={toolbox} />

            <div id="id_search_results">
                                        
                 <DataTable
                    className="agentsTable table-scroll"
                    
                    sortColumn={"Key"}
                    sortAscending={true}
                    searchable
                    
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
                                            name="wizard"
                                            link
                                            bordered
                                            title="Select business service"
                                            onClick={(event: Event) => {
                                                event.stopPropagation();
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

// funkce vyplni vybranou business services do pole Input:
function ConfirmSelectedBusinessService(_item: any) {
    console.log(_item);  
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
    toolbox: Stage.Types.WidgetlessToolbox;
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
