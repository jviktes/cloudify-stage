// @ts-nocheck File not migrated fully to TS
import PropTypes from 'prop-types';
import type { Tests } from './types';
import TestsPropType from './props/TestsPropType';
import TestDetails from './TestDetails';

interface TestDataProps {
    data: {
        items: PropTypes.array;
        total: number;
        nodeId: string;
        nodeInstanceId: string;
    };
    widget: Stage.Types.Widget;
    toolbox: Stage.Types.Toolbox;
}
// eslint-disable-next-line react/prefer-stateless-function
export default class TestsTable extends React.Component<TestDataProps> {
    // static propTypes: any;

    constructor(props: TestDataProps) {
        super(props);
    }

    fetchGridData = fetchParams => {
        const { toolbox } = this.props;
        return toolbox.refresh(fetchParams);
    };

    refreshData() {
        const { toolbox } = this.props;
        toolbox.refresh();
    };

    onRowClick(_item) {
        const el = document.getElementById(_item.fileName+"_ext");
        const elMain = document.getElementById(_item.fileName+"_main");
        if (el.style.display === "none") {
            el.style.display = "";
            el.style.backgroundColor="#e0e0e0";
            elMain.style.backgroundColor="#e0e0e0";
          } else {
            el.style.display = "none";
            el.style.backgroundColor="";
            elMain.style.backgroundColor="";
          }
    };
    /// render icon:
    renderTestResultSummary(itemData) {
        if (itemData.testResultSummary && itemData.testResultSummary.toLowerCase().indexOf("succeeded")!== -1) {
            return <i aria-hidden="true" className="green checkmark icon"></i>;
        }
        if (itemData.testResultSummary && itemData.testResultSummary.toLowerCase().indexOf("failed")!== -1) {
            return <i aria-hidden="true" className="red remove icon"></i>;
        }
        return '';
    };

    render() {
        /* eslint-disable no-console, no-process-exit */
        const { data, toolbox, widget } = this.props;
        const { DataTable } = Stage.Basic;
        const manager = toolbox.getManager();
        const tenantName=manager.getSelectedTenant();

        return (
            <div>
                <span>Current tenant: {tenantName}</span>
               <DataTable className="agentsTable table-scroll"
                    fetchData={this.fetchGridData}
                    sortColumn={widget.configuration.sortColumn}
                    sortAscending={widget.configuration.sortAscending} 
                    searchable
                    >
                          <colgroup>
                            <col style={{backgroundColor:"red"}}/>
                            <col style={{backgroundColor:"yellow"}}/>
                         </colgroup>
                    <DataTable.Column label="Test date" name="testDatum" width="10%"/>
                    <DataTable.Column label="Virtual machine" name="virtualMachine" width="25%" />
                    <DataTable.Column label="Test class" name="class" width="10%"/>
                    <DataTable.Column label="Result" name="result" width="10%"/>
                    <DataTable.Column label="Passed" name="passed" width="5%"/>
                    <DataTable.Column label="Failed" name="failed" width="5%"/>
                    <DataTable.Column label="File name" name="fileName" width="35%"/>
                    {_.map(data.items, item => (
                        
                        <DataTable.RowExpandable key={item.fileName}  >
                            <DataTable.Row key={item.fileName+"_main"} onClick={()=>this.onRowClick(item)} id={item.fileName+"_main"} >                  
                                <DataTable.Data style={{width:"10%"}}>{item.testDatum}</DataTable.Data>
                                <DataTable.Data style={{width:"25%"}}>{item.virtualMachine}</DataTable.Data>
                                <DataTable.Data style={{width:"10%"}}>{item.class}</DataTable.Data>
                                <DataTable.Data style={{width:"10%"}}>
                                    {this.renderTestResultSummary(item)}
                                    {item.testResultSummary}
                                </DataTable.Data>
                                <DataTable.Data style={{color:"green"},{width:"5%"}}>{item.passedTestsCount}</DataTable.Data>
                                <DataTable.Data style={{color:"red"},{width:"5%"}}>{item.failedTestsCount}</DataTable.Data>
                                <DataTable.Data style={{width:"35%"}}>{item.fileName}</DataTable.Data>
                            </DataTable.Row>
                            <DataTable.Row key={item.fileName+"_ext"} style={{display:"none"}} id={item.fileName+"_ext"} onClick={()=>this.onRowClick(item)}>
                                        <DataTable.Data colSpan={7} style={{marginLeft:50}}>
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

TestsTable.propTypes = {
    data: PropTypes.array,
};
