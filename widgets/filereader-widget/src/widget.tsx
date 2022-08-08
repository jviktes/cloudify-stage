// @ts-nocheck File not migrated fully to TS
//  fetchUrl: '[manager]/eventsVik[params]',
/* eslint-disable no-console, no-process-exit */
import { result } from 'lodash';
import Zobraz from './Zobraz';

const data1 = 'pokusný text';
Stage.defineWidget({
    id: 'filereader-widget',
    name: 'Nacteni souboru',
    description: 'Nacteni souboru',
    initialWidth: 12,
    initialHeight: 12,
    color: 'orange',
    isReact: true,
    hasReadme: true,
    categories: [Stage.GenericConfig.CATEGORY.OTHERS],
    permission: Stage.GenericConfig.CUSTOM_WIDGET_PERMISSIONS.CUSTOM_ALL,
    fetchData(widget, toolbox) {
        console.log('fetch files data...');
        const params = {
            deployment_id: "liberec"
        };
        return toolbox.getWidgetBackend().doGet('filesAPI', { params });
    },

    fetchParams(widget, toolbox) {
        const params = {};
        const deploymentId = "liberec";//toolbox.getContext().getValue('deploymentId');
        if (!_.isEmpty(deploymentId)) {
            params.deployment_id = _.castArray(deploymentId);
        }
        //console.log("fetchParams:");
        //console.log(params);
        return params;
    },

    render(widget, data, error, toolbox) {
        const formattedData = {
            items: data,
            deploymentId: 'test results'
        };

        return <Zobraz widget={widget} data={formattedData} toolbox={toolbox} />;
    }
});
