import React from "react";

import AccordionSectionWithDivider from "../../../common/src/components/accordion/AccordionSectionWithDivider";
import DeploymentInputs from "../DeploymentInputsWizard";
import getDeploymentInputsByCategories from '../../src/wizardUtils';

interface DeploymentsInfoProps {
    toolbox: Stage.Types.Toolbox;
    blueprint: any, 
    index: any, 
    title: any, 
    deploymentInputs: any, 
    errors: any, 
    fileLoading: any, 
    activeSection: any ,
    onYamlFileChange:any,
    onDeploymentInputChange:any,
}

export default function SWConfigStep(this: any, { toolbox, blueprint, index,title,deploymentInputs,errors,fileLoading,activeSection,onYamlFileChange,onDeploymentInputChange}: DeploymentsInfoProps) {

    //console.log("SWConfigStep:");
    //console.log(deploymentInputs);
    //console.log(title);
    const category = "swconfig";
    return (
        
        <AccordionSectionWithDivider
            title={title}
            index={index}
            activeSection={activeSection}
        >
            <DeploymentInputs
                toolbox={toolbox}
                blueprint={blueprint}
                onYamlFileChange={onYamlFileChange}
                fileLoading={fileLoading}
                onDeploymentInputChange={onDeploymentInputChange}
                deploymentInputs={getDeploymentInputsByCategories(deploymentInputs,category)}
                errors={errors}
            />

        </AccordionSectionWithDivider>
        
    );
}