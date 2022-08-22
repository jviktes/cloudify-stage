import React from "react";
import AccordionSectionWithDivider from "../../../common/src/components/accordion/AccordionSectionWithDivider";
import DeploymentInputs from "../DeploymentInputsWizard";

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

export default function SetupKrok(this: any, { toolbox, blueprint, index,title,deploymentInputs,errors,fileLoading,activeSection,onYamlFileChange,onDeploymentInputChange}: DeploymentsInfoProps) {

    console.log("SetupKrok");
    console.log(deploymentInputs);
    console.log(title);
    return (
        <div>Setup krok 2:
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
                deploymentInputs={deploymentInputs}
                errors={errors}
            />

        </AccordionSectionWithDivider>
        </div>
    );
}