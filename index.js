let parametersBox = document.querySelector('#parametersBox');
let requestJsonBox = document.getElementById('requestJsonBox');

//Utility function
//1. get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
//Parametr counter variable
let addedParamCount = 0;

//Hide the parameters box initially
parametersBox.style.display = "none";

//If the user clicks params, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    requestJsonBox.style.display = "none";
    parametersBox.style.display = "block";
})
//If the user clicks json, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    requestJsonBox.style.display = "block";
    parametersBox.style.display = "none";
})

//If the user clicks on + button add more parameter
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                    <label for="urlField" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Parameter ${addedParamCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Parameter ${addedParamCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam">-</button>
                </div>`

    //Convert the string to DOM element
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    //Add an event listener to remove the parameter on clicking minus(-) button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }


    addedParamCount++;

})

//If the user clicks the submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    document.getElementById('responseText').value = "Please wait..."

    //Fetch all the values entered by user
    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    

    //If user has used params, collect all the parameters in an object
    data = {};
    if (contentType == "params") {
        
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + String(i+1))!=undefined) {
                let key = document.getElementById('parameterKey' + String(i + 1)).value;
                let value = document.getElementById('parameterValue' + String(i + 1)).value;
                if(key!='' && value!= ''){
                    data[key] = value;
                }
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('requestJsonText').value;
        
    }

    //Log all the values in the console for debugging
    console.log('url is: ', url);
    console.log('request type: ', requestType);
    console.log('content type:', contentType);
    console.log('data is :', data);
    
    //If the requestType is get then invoke fetch api to create a get request
    if(requestType=="GET"){
        fetch(url,{
            method: "GET"
        }).then(response=>response.text()).then((text)=>{
            document.getElementById('responseText').innerHTML = text;    
        })
    }
    else{
        fetch(url,{
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then(response=>response.text()).then((text)=>{
            document.getElementById('responseText').innerHTML = text;
        })
    }

})
