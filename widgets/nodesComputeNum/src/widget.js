/**
 * Created by jakub.niezgoda on 11/12/2018.
 */

Stage.defineWidget({
    id: 'nodesComputeNum',
    name: 'Number of compute nodes',
    description: 'Number of compute nodes',
    initialWidth: 2,
    initialHeight: 8,
    color : 'red',
    showHeader: false,
    isReact: true,
    hasReadme: true,
    permission: Stage.GenericConfig.WIDGET_PERMISSION('nodesComputeNum'),
    categories: [Stage.GenericConfig.CATEGORY.CHARTS_AND_STATISTICS],
    initialConfiguration: [
        Stage.GenericConfig.POLLING_TIME_CONFIG(30)
    ],
    fetchUrl: '[manager]/summary/node_instances?_target_field=host_id&state=started',

    render: function(widget, data, error, toolbox) {
        if (_.isEmpty(data)) {
            return <Stage.Basic.Loading />;
        }

        let KeyIndicator = Stage.Basic.KeyIndicator;
        const numberOfComputeNodes = _.chain(data.items)
            .filter((item) => !_.isNil(item.host_id))
            .sumBy('node_instances')
            .value();

        return <KeyIndicator title="Compute Nodes" icon="server" number={numberOfComputeNodes} />;
    }
});