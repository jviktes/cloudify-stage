export default function getDeploymentInputsByCategories( _deploymentInputs: Record<string, unknown>, category:string) {
    //return this.state.deploymentInputs;//["location"];
    //return this.state.deploymentInputs.find(el => el.key === "location");
    //let neco = this.state.deploymentInputs["location"]; 
    
    //const { Json } = Stage.Utils;
    const inputsWithoutValues: Record<string, unknown> = {};

    _.forEach(_deploymentInputs, (inputObj, inputName) => {

        let tt = inputObj;
        String(tt);
        
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
            if (inputName=="product_name") {
                inputsWithoutValues[inputName] = _deploymentInputs["product_name"];
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
    //console.log(inputsWithoutValues);
    return inputsWithoutValues;
}   