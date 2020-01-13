Stage.defineWidget({
    id: 'highAvailability',
    name: 'Cluster Status',
    description: 'Shows the status of the Cloudify Manager cluster',
    initialWidth: 12,
    initialHeight: 25,
    color: 'green',
    isReact: true,
    hasReadme: true,
    permission: Stage.GenericConfig.WIDGET_PERMISSION('highAvailability'),
    categories: [Stage.GenericConfig.CATEGORY.SYSTEM_RESOURCES],

    render(widget, data, error, toolbox) {
        const { Cluster } = Stage.Basic;

        return <Cluster.ClusterServicesList toolbox={toolbox} />;
    }
});
