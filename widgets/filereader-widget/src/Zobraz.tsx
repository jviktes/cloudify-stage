// @ts-nocheck File not migrated fully to TS
import PropTypes from 'prop-types';
import type { Tests } from './types';
import AgentsPropType from './props/AgentsPropType';
import TestDetails from './TestDetails';

interface TestDataProps {
    data: {
        items: PropTypes.array;
        total: number;
        //deploymentId: string;
        nodeId: string;
        nodeInstanceId: string;
    };
    widget: Stage.Types.Widget;
    toolbox: Stage.Types.Toolbox;
}
// eslint-disable-next-line react/prefer-stateless-function
export default class Zobraz extends React.Component<TestDataProps> {
    // static propTypes: any;

    constructor(props: TestDataProps) {
        super(props);
    }

// requestor: PropTypes.string,
// deployment_id: PropTypes.string,
// deployment_name: PropTypes.string,
// results:PropTypes.string,



    fetchGridData = fetchParams => {
        const { toolbox } = this.props;
        return toolbox.refresh(fetchParams);
    };

    refreshData() {
        const { toolbox } = this.props;
        toolbox.refresh();
    };

    onRowClick(_item) {
        //console.log("on click...");
        //console.log(_item.fileName);
        const el = document.getElementById(_item.fileName+"_ext");
        if (el.style.display === "none") {
            el.style.display = "";
          } else {
            el.style.display = "none";
          }
    };
    renderTestResultSummary(itemData) {
        //console.log(itemData.testResultSummary);
        //console.log(itemData.testResultSummary.indexOf("Succeeded"));
        //console.log(itemData.testResultSummary.indexOf("Failed"));
        
        if (itemData.testResultSummary && itemData.testResultSummary.toLowerCase().indexOf("succeeded")!== -1) {
            return <i aria-hidden="true" className="green checkmark icon"></i>;
        }
        if (itemData.testResultSummary && itemData.testResultSummary.toLowerCase().indexOf("failed")!== -1) {
            return <i aria-hidden="true" className="red remove icon"></i>;
        }
        return '';
    };

    render() {
        
        const { data, toolbox, widget } = this.props;
        /* eslint-disable no-console, no-process-exit */

        //console.log(data);
        const { DataTable } = Stage.Basic;
        const manager = toolbox.getManager();
        const tenantName=manager.getSelectedTenant();

        return (
            <div>
                <span>Current tenant: {tenantName}</span>
               <DataTable className="agentsTable" style={{height:50}, {overflow:"scrollbars"}}
                    fetchData={this.fetchGridData}
                    sortColumn={widget.configuration.sortColumn}
                    sortAscending={widget.configuration.sortAscending} 
                    searchable
                    >
                    <DataTable.Column label="Test datum" name="testDatum"/>
                    <DataTable.Column label="Virtual machine" name="virtualMachine" />
                    <DataTable.Column label="Class" name="class" />
                    <DataTable.Column label="Passed" name="passed"/>
                    <DataTable.Column label="Failed" name="failed"/>
                    <DataTable.Column label="Result" name="result"/>
                    <DataTable.Column label="File name" name="fileName"/>
                    {_.map(data.items, item => (
                        
                        <DataTable.RowExpandable key={item.fileName}>
                            <DataTable.Row key={item.fileName+"_main"} onClick={()=>this.onRowClick(item)}>                  
                                <DataTable.Data>{item.testDatum}</DataTable.Data>
                                <DataTable.Data>{item.virtualMachine}</DataTable.Data>
                                <DataTable.Data>{item.class}</DataTable.Data>
                                <DataTable.Data style={{color:"green"}}>{item.passedTestsCount}</DataTable.Data>
                                <DataTable.Data style={{color:"red"}}>{item.failedTestsCount}</DataTable.Data>
                                <DataTable.Data>
                                    {this.renderTestResultSummary(item)}
                                    {item.testResultSummary}
                                </DataTable.Data>
                                <DataTable.Data>{item.fileName}</DataTable.Data>
                            </DataTable.Row>
                            <DataTable.Row key={item.fileName+"_ext"} style={{display:"none"}} id={item.fileName+"_ext"} onClick={()=>this.onRowClick(item)}>
                                        <DataTable.Data colSpan={7}>
                                            <TestDetails widget={widget} data={item.testResultArray} toolbox={toolbox}></TestDetails>
                                        </DataTable.Data>
                            </DataTable.Row>
                        </DataTable.RowExpandable>
                    ))}
                </DataTable>
                
            </div>
        );
    }
}

Zobraz.propTypes = {
    data: PropTypes.array,
    // data: PropTypes.shape({
    //     items: AgentsPropType,
    //     //deploymentId: 'Data'
    // })
};
