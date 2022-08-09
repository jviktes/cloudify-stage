// @ts-nocheck File not migrated fully to TS
import PropTypes from 'prop-types';
import type { TestResult } from './types';
import AgentsPropType from './props/TestResultsPropType';

interface TestResultProps {
    data: {
        //items: TestResult;
        items: PropTypes.array;
    };
    widget: Stage.Types.Widget;
    toolbox: Stage.Types.Toolbox;
}
// eslint-disable-next-line react/prefer-stateless-function
export default class TestDetails extends React.Component<TestResultProps> {
    // static propTypes: any;

    constructor(props: TestResultProps) {
        super(props);
        this.keyCount = 0;
        this.getKey = this.getKey.bind(this);
    }

    getKey(){
        return this.keyCount++;
    }

    render() {
        
        const { data, toolbox, widget } = this.props;
        /* eslint-disable no-console, no-process-exit */
        console.log("rendering TestResults:");
        console.log(data);
        const { DataTable } = Stage.Basic;
        return (
            <div>
               <DataTable className="agentsTable" 
                    >
                    <DataTable.Column label="Test name" />
                    <DataTable.Column label="Description" />
                    <DataTable.Column label="Class" />
                    <DataTable.Column label="Code" />
                    <DataTable.Column label="Actual value" />
                    <DataTable.Column label="Expected value" />
                    <DataTable.Column label="Result" />

                    {_.map(data, item => (                       
                            <DataTable.Row key={this.getKey()}>                  
                                <DataTable.Data>{item.name}</DataTable.Data>
                                <DataTable.Data>{item.description}</DataTable.Data>
                                <DataTable.Data>{item.class}</DataTable.Data>
                                <DataTable.Data>{item.code}</DataTable.Data>
                                <DataTable.Data>{item.actual_value}</DataTable.Data>
                                <DataTable.Data>{item.expected_value}</DataTable.Data>
                                <DataTable.Data>{item.result}</DataTable.Data>
                            </DataTable.Row>
                    ))}
                </DataTable>
                
            </div>
        );
    }
}

// TestDetails.propTypes = {
//     data: PropTypes.shape({
//         items: AgentsPropType,
//     })
// };

TestDetails.propTypes = {
    data: PropTypes.array,
};

// TestDetails.propTypes = {
//     data: PropTypes.shape({
//         items: PropTypes.arrayOf(
//             PropTypes.shape({
//             actual_value: PropTypes.string,
//             class: PropTypes.string,
//             code:  PropTypes.string,
//             description: PropTypes.string,
//             expected_value: PropTypes.string,
//             name:  PropTypes.string,
//             result:  PropTypes.string,
//             })
//         ),
//     }),
//     toolbox: Stage.PropTypes.Toolbox,
//     widget: Stage.PropTypes.Widget
// };
