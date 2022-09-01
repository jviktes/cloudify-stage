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

export default  function GeneralStep(this: any, { toolbox, blueprint, index,title,deploymentInputs,errors,fileLoading,activeSection,onYamlFileChange,onDeploymentInputChange}: DeploymentsInfoProps) {

    console.log(blueprint); 

    
    const [data, setData] = React.useState({});
    console.log("GeneralStep");

    // const pokusny = {
    //     "default": 5,
    //     "description": "Poksuný vstup",
    //     "type": "integer",
    //     "constraints": [
    //         {
    //             "valid_values": [
    //                 1,
    //                 2,
    //                 3,
    //                 4,
    //                 5,
    //             ]
    //         }
    //     ]
    // }

    // blueprint.plan.inputs["quantity"] = pokusny;

    const fetchQuantity = async () => {
        const response = await toolbox.getWidgetBackend().doGet('quantity');
        const data = await response;
        //setData(data);
        console.log(data);
        blueprint.plan.inputs["quantity"] = data;
        setData(data);
      };
      
      const fetchOnline = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setData(data);
      };

      const fetchInternalData = async () => {
        const response = await toolbox.getWidgetBackend().doGet('files');
        const data = await response;
        setData(data);
      };

    fetchQuantity();
    console.log("data:"+data); 

    const category = "general";

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
            <button onClick={fetchOnline}>Load example data from external source</button>
            <button onClick={fetchInternalData}>Load example data from internal source</button>
            <pre>{JSON.stringify(data, null, "  ")}</pre>
        </AccordionSectionWithDivider>
        
    );
}