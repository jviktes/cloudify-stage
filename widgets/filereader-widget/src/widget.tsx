// @ts-nocheck File not migrated fully to TS
//  fetchUrl: '[manager]/eventsVik[params]',
/* eslint-disable no-console, no-process-exit */
import { result } from 'lodash';
import Zobraz from './Zobraz';

const data1 = 'pokusný text';
Stage.defineWidget({
    id: 'filereader-widget',
    name: 'Nacteni souboru',
    description: 'Test results',
    initialWidth: 12,
    initialHeight: 32,
    color: 'orange',
    isReact: true,
    hasReadme: true,
    hasStyle:true,
    categories: [Stage.GenericConfig.CATEGORY.OTHERS],
    permission: Stage.GenericConfig.CUSTOM_WIDGET_PERMISSIONS.CUSTOM_ALL,
    initialConfiguration: [
        Stage.GenericConfig.SORT_COLUMN_CONFIG('testDatum'),
        Stage.GenericConfig.SORT_ASCENDING_CONFIG(false),
    ],
    fetchData(widget, toolbox,params) {
        console.log('fetch files data...');
        const manager = toolbox.getManager();
        const tenantName=manager.getSelectedTenant();
        params.tenant = tenantName;
        return toolbox.getWidgetBackend().doGet('filesAPI', { params });
    },

    // fetchParams(widget, toolbox) {
    //     const params = {};
    //     const deploymentId = "liberec";//toolbox.getContext().getValue('deploymentId');
    //     if (!_.isEmpty(deploymentId)) {
    //         params.deployment_id = _.castArray(deploymentId);
    //     }
    //     //console.log("fetchParams:");
    //     //console.log(params);
    //     return params;
    // },

    render(widget, data, error, toolbox) {
        //const params = this.fetchParams!(widget, toolbox);
        
        const formattedData = {
            items: data
            //deploymentId: 'test results'
        };

        return <Zobraz widget={widget} data={formattedData} toolbox={toolbox} />;
    }
});
