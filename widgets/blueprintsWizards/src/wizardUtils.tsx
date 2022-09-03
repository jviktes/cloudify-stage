
export default function getDeploymentInputsByCategories( _deploymentInputs: Record<string, unknown>, category:string) {

    const inputsWithoutValues: Record<string, unknown> = {};

    _.forEach(_deploymentInputs, (inputObj, inputName) => {

        let tt = inputObj; //TODO out?
        String(tt);
        
        //TODO: following to some config file?

        if (category=="general") {
            if (inputName=="location") {
                inputsWithoutValues[inputName] = _deploymentInputs["location"];
            }
            if (inputName=="product_name") {
                inputsWithoutValues[inputName] = _deploymentInputs["product_name"];
            }
            if (inputName=="quantity") {
                inputsWithoutValues[inputName] = _deploymentInputs["quantity"];
            }
            if (inputName=="environment") {
                inputsWithoutValues[inputName] = _deploymentInputs["environment"];
            }
            if (inputName=="network_segment") {
                inputsWithoutValues[inputName] = _deploymentInputs["network_segment"];
            }
        }

        if (category=="clustering") {
            if (inputName=="availability_zone") {
                inputsWithoutValues[inputName] = _deploymentInputs["availability_zone"];
            }
        }

        if (category=="gsn") {
            if (inputName=="impact") {
                inputsWithoutValues[inputName] = _deploymentInputs["impact"];
            }
        }

        if (category=="swconfig") {
            if (inputName=="sw_apps") {
                inputsWithoutValues[inputName] = _deploymentInputs["sw_apps"];
            }
        }

        if (category=="vmconfig") {
            if (inputName=="size") {
                inputsWithoutValues[inputName] = _deploymentInputs["size"];
            }
            if (inputName=="disk_size") {
                inputsWithoutValues[inputName] = _deploymentInputs["disk_size"];
            }
            if (inputName=="os_disk_type") {
                inputsWithoutValues[inputName] = _deploymentInputs["os_disk_type"];
            }
            
        }

    });

    //TODO sort by order
    const orderedInputsWithoutValues: Record<string, unknown> =  getDeploymentInputsOrderByCategories(inputsWithoutValues, category);
    return orderedInputsWithoutValues;

}   

export function getDeploymentInputsOrderByCategories( _deploymentInputs: Record<string, unknown>, category:string) {

    //TODO sort by order
    const orderedInputsWithoutValues: Record<string, unknown> = {};

    if (category=="general") {
        const generalOrder = ["product_name","quantity", "environment","location", "network_segment"];

        for (let index = 0; index < generalOrder.length; index++) {
            const element = generalOrder[index];
            if (_deploymentInputs[element]!=null) {
                orderedInputsWithoutValues[element]=_deploymentInputs[element];
            }
        }
    }
    
    console.log("orderedInputsWithoutValues:");
    console.log(orderedInputsWithoutValues);
    return orderedInputsWithoutValues;
}
