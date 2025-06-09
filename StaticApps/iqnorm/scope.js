//GLOBALS
const scopeGlobals = {

    bodyElem: document.getElementById("checklist-body"),
    isBodyDisplayed: false,
    isRequiredInputsSet: false,
    inputElements: document.querySelectorAll(".sf-select .sf-inp"),
    requiredInputElements: document.getElementsByClassName("sf-required"),
    IdsOfRequiredInputs: [],
    inputState: {}


}


const initPage = () => {

    scopeGlobals.bodyElem.style.display = "none";

    //*Set selection state and event listeners
    for (let elem of scopeGlobals.inputElements) {
        scopeGlobals.inputState[elem.id] = elem.value;
        elem.addEventListener("change", refilter);
    }


    //*append required input elements
    for (let elem of scopeGlobals.requiredInputElements) {
        scopeGlobals.IdsOfRequiredInputs.push(elem.id);
        updateInputState("all");
    }

    //Filter by difault inputs
    refilter("all");

}

const refilter = (target = "") => {

    //* Update input States
    if (target == "all") {

        target = { id: "all" };
        updateInputState("all");

    } else {

        target = event.target;
        updateInputState(target.id);
    }

    console.log(`event triggered ${target.id}`);

    //* Filter the items by inputState
    filterItems();

    //* if body not displayed check to display body
    if (scopeGlobals.isBodyDisplayed == false) {

        //*check for required inputs
        if (checkForRequiredInputs()) {

            scopeGlobals.isRequiredInputsSet = true;
            scopeGlobals.bodyElem.style.display = "block";
        }
    }

}

const updateInputState = (inputId) => {

    if (inputId == "all") {

        //*updated and set all inputs
        for (let elem of scopeGlobals.inputElements) {
            scopeGlobals.inputState[elem.id] = elem.value;

        }
    } else {

        scopeGlobals.inputState[inputId] = document.getElementById(inputId).value;

    }
}

const filterItems = () => {

    let elemsToBeFiltered;

    for (let inputId in scopeGlobals.inputState) {

        elemsToBeFiltered = document.getElementsByClassName(`${inputId}-dependant`);

        for (let elem of elemsToBeFiltered) {

            let logicState = true;
            let subLogic;

            for (let id in scopeGlobals.inputState) {

                if (elem.classList.contains(`${id}-dependant`)) {

                    subLogic = evalScopeString(elem, id);
                    logicState = logicState && subLogic;

                } else {

                    continue;
                }

            }

            elem.style.display = logicState ? (elem.tagName == "SPAN" ? "inline-block" : "block") : "none";
        }
    }

    2
}

const checkForRequiredInputs = () => {

    let isAllSelected = true;
    for (let inputId in scopeGlobals.IdsOfRequiredInputs) {
        let isInputSet = scopeGlobals.inputState[inputId] != '';
        isAllSelected = isAllSelected && isInputSet;
    }
    return isAllSelected;
}

const evalScopeString = (elem, inputId) => {

    let inputString = elem?.dataset[inputId];
    let statements = inputString?.split("&");
    let logicRes = true;
    if (inputString == undefined) {
        console.warn("variate:" + inputId + ". A logic attribute does not have a valid string");
        console.warn("element id : " + elem?.id);
        console.warn("element name : " + elem?.name);
        return true;
    }
    if (scopeGlobals.inputState[inputId] == "all") {
        return true;
    }


    for (statement of statements) {
        [operator, val] = statement?.split(" ");
        //console.log("" + operator + "   " + val);
        logicRes = logicRes && regLogicOperations.evaluate(operator, val, scopeGlobals.inputState[inputId]);
    }

    return logicRes;
}


const regLogicOperations = {

    evaluate: (op, val, inp) => {
        switch (op) {
            case '<':
                return regLogicOperations.lessThen(val, inp);
                break;
            case '<=':
                return regLogicOperations.lessThenEqualTo(val, inp);
                break;
            case '>':
                return regLogicOperations.moreThen(val, inp);
                break;
            case '>=':
                return regLogicOperations.moreThenEqualTo(val, inp);
                break;
            case '=':
                return regLogicOperations.equalTo(val, inp);
                break;
            case '!=':
                return regLogicOperations.notEqualTo(val, inp);
                break;
        }
    },

    lessThen: (val, inp) => {
        return inp < Number(val);
    },

    lessThenEqualTo: (val, inp) => {
        return inp <= Number(val);
    },

    moreThen: (val, inp) => {
        return inp > Number(val);
    },

    moreThenEqualTo: (val, inp) => {
        return inp >= Number(val);
    },

    equalTo: (val, inp) => {
        return inp == val;
    },

    notEqualTo: (val, inp) => {
        return inp != val;
    },

}




