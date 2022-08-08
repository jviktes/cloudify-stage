// @ts-nocheck File not migrated fully to TS
import PropTypes from 'prop-types';
import type { Tests } from './types';
import AgentsPropType from './props/AgentsPropType';

interface TestDataProps {
    data: {
        items: Tests;
        total: number;
        deploymentId: string;
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
    }

    render() {
        
        const { data, toolbox, widget } = this.props;
        /* eslint-disable no-console, no-process-exit */

        console.log(data);
        const { DataTable } = Stage.Basic;
        return (
            <div>
                <span>{data.deploymentId}</span>
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
                    <DataTable.Column label="Test results" />

                    {_.map(data.items, item => (
                        <DataTable.Row key={item.fileName}>                  
                            <DataTable.Data>{item.fileName}</DataTable.Data>
                            <DataTable.Data>{item.virtualMachine}</DataTable.Data>
                            <DataTable.Data>{item.testDatum}</DataTable.Data>
                            <DataTable.Data>{item.passedTestsCount}</DataTable.Data>
                            <DataTable.Data>{item.failedTestsCount}</DataTable.Data>
                            <DataTable.Data>{item.testResultArray}</DataTable.Data>

                        </DataTable.Row>
                    ))}
                </DataTable>
            </div>
        );
    }
}

Zobraz.propTypes = {
    data: PropTypes.shape({
        items: AgentsPropType,
        deploymentId: 'Data'
    })
};
