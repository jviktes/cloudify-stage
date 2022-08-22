// import type { DeploymentInfoWidget } from './widget.types';

import React from "react";
//import { AccordionTitleProps, AccordionTitleProps } from "semantic-ui-react";
import AccordionSectionWithDivider from "../../../common/src/components/accordion/AccordionSectionWithDivider";
import DeploymentInputs from "../DeploymentInputsWizard";

// const { ErrorPopup } = Stage.Shared;
// const { useResettableState } = Stage.Hooks;

// const DeploymentDetails = Stage.Common.Deployments.Details;
// const DeploymentActions = Stage.Common.Deployments.Actions;

// interface DeploymentsInfoProps {
//     data: DeploymentInfoWidget.Data;
//     toolbox: Stage.Types.Toolbox;
// }

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

export default function InstallKrok(this: any, { toolbox, blueprint, index,title,deploymentInputs,errors,fileLoading,activeSection,onYamlFileChange,onDeploymentInputChange}: DeploymentsInfoProps) {
    // onAccordionClick(_: React.MouseEvent<HTMLDivElement, MouseEvent>, { index }: AccordionTitleProps) {
    //     const { activeSection } = this.state;
    //     const newIndex = activeSection === index ? -1 : index;

    //     this.setState({ activeSection: newIndex });
    // }



    //const { toolbox, blueprint, index,title,deploymentInputs,errors,fileLoading,activeSection} = this.props;
    console.log("InstallKrok");
    console.log(deploymentInputs);
    console.log(title);
    return (
        
        <AccordionSectionWithDivider
            title={title}
            index={index}
            activeSection={activeSection}
            //onClick={null}
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
        
    );
}