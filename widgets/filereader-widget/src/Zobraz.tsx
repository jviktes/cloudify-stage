// @ts-nocheck File not migrated fully to TS
import PropTypes from 'prop-types';
import type { Tests } from './types';
import AgentsPropType from './props/AgentsPropType';

interface TestDataProps {
    data: {
        items: Tests;
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
        console.log("on click...");
        console.log(_item.fileName);
        const el = document.getElementById(_item.fileName+"_ext");
        if (el.style.display === "none") {
            el.style.display = "";
          } else {
            el.style.display = "none";
          }
    };
    render() {
        
        const { data, toolbox, widget } = this.props;
        /* eslint-disable no-console, no-process-exit */

        console.log(data);
        const { DataTable } = Stage.Basic;
        return (
            <div>
               <DataTable className="agentsTable" 
                    fetchData={this.fetchGridData}
                    sortColumn={widget.configuration.sortColumn}
                    sortAscending={widget.configuration.sortAscending} 
                    searchable
                    >
                    <DataTable.Column label="fileName" name="fileName"/>
                    <DataTable.Column label="Virtual machine" name="virtualMachine" />
                    <DataTable.Column label="Test datum" name="testDatum"/>
                    <DataTable.Column label="Passed" />
                    <DataTable.Column label="Failed" />
                    {_.map(data.items, item => (
                        
                        <DataTable.RowExpandable key={item.fileName} >
                            <DataTable.Row key={item.fileName+"_main"} onClick={()=>this.onRowClick(item)}>                  
                                <DataTable.Data>{item.fileName}</DataTable.Data>
                                <DataTable.Data>{item.virtualMachine}</DataTable.Data>
                                <DataTable.Data>{item.testDatum}</DataTable.Data>
                                <DataTable.Data>{item.passedTestsCount}</DataTable.Data>
                                <DataTable.Data>{item.failedTestsCount}</DataTable.Data>
                            </DataTable.Row>
                            <DataTable.Row key={item.fileName+"_ext"} style={{display:"none"}} id={item.fileName+"_ext"} onClick={()=>this.onRowClick(item)}>
                                    <DataTable.Data colSpan={5}>{item.testResultArray}</DataTable.Data>
                            </DataTable.Row>
                        </DataTable.RowExpandable>
                    ))}
                </DataTable>
                
            </div>
        );
    }
}

Zobraz.propTypes = {
    data: PropTypes.shape({
        items: AgentsPropType,
        //deploymentId: 'Data'
    })
};
