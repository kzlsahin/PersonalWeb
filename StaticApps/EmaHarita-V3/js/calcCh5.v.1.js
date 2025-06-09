// *** Chapter V
const clearResults = () => {
    document.getElementById("field-5-a-result").value = "";
    document.getElementById("field-5-b-result").value = "";
}
const calculateEtut = (parcelArea) => {
    let baseValue = 2835;
    let subLimit = 100;
    let multiplier = 1;
    let result = 0;
    let lastLimit;
    let nextLimit = 0;
    let interval;

    if (parcelArea > nextLimit) {
        lastLimit = nextLimit;
        nextLimit = 500;
        result += baseValue;
        
    }

    if (parcelArea > nextLimit) {
        lastLimit = nextLimit;
        nextLimit = 1000;
        multiplier = 360;
        interval = Math.min(parcelArea, nextLimit) - lastLimit;
        result += multiplier * interval / subLimit;
        
    }
    if (parcelArea > nextLimit) {
        lastLimit = nextLimit;
        nextLimit = 2000;
        multiplier = 212;
        interval = Math.min(parcelArea, nextLimit) - lastLimit;
        result += multiplier * interval / subLimit;
    }
    if (parcelArea > nextLimit) {
        lastLimit = nextLimit;
        nextLimit = 5000;
        multiplier = 135;
        interval = Math.min(parcelArea, nextLimit ) - lastLimit;
        result += multiplier * interval / subLimit;
    }
    if (parcelArea > nextLimit) {
        lastLimit = nextLimit;
        nextLimit = 10000
        multiplier = 50;
        interval = Math.min(parcelArea, nextLimit ) - lastLimit;
        result += multiplier * interval / subLimit;
    }
    if (parcelArea > nextLimit) {
        lastLimit = nextLimit;
        subLimit = 1000;
        multiplier = 48;
        interval = parcelArea - lastLimit;
        result += multiplier * interval / subLimit;
    }
    return result;
}

const calculateProject = (buildingCount, floorCount, baseArea) => {

    let result = 0;
    if(buildingCount + floorCount + baseArea == 0)
    {
        return result;
    }
    if( 0 < baseArea && baseArea <= 100){
        result = 4815;
    }
    if( 100 < baseArea && baseArea <= 150){
        result = 5615;
    }
    if( 150 < baseArea){
        result = 6965;
    }
    let baseLimit = 250;
    let multiplier = 1;
    let subLimit = 100;
    let lastLimit = 0;
    let nextLimit = baseLimit;
    let interval;

    if (baseArea > nextLimit) {
        lastLimit = nextLimit;
        nextLimit = 1000;
        multiplier = 755;
        interval = Math.min(baseArea, nextLimit ) - lastLimit;
        result += multiplier * interval / subLimit;    
    }
    if (baseArea > nextLimit) {
        lastLimit = nextLimit;
        nextLimit = 2000;
        multiplier = 473;
        interval = Math.min(baseArea, nextLimit ) - lastLimit;
        result += multiplier * interval / subLimit;    
    }
    if (baseArea > nextLimit) {
        lastLimit = nextLimit;
        nextLimit = 5000;
        multiplier = 218;
        interval = Math.min(baseArea, nextLimit ) - lastLimit;
        result += multiplier * interval / subLimit;    
    }

    if (baseArea > nextLimit) {
        lastLimit = nextLimit;
        multiplier = 54;
        interval = baseArea - lastLimit;
        result += multiplier * interval / subLimit;    
    }

    result += 450 * floorCount;
    lastLimit = 0;
    nextLimit = 1;

    if(buildingCount > nextLimit )
    {
        lastLimit = nextLimit;
        nextLimit = 10;
        multiplier = 1565;
        subLimit = 1;
        interval = Math.min(buildingCount, nextLimit ) - lastLimit;
        result += multiplier * interval / subLimit;  
    }

    if(buildingCount > nextLimit )
    {
        lastLimit = nextLimit;
        nextLimit = 20;
        multiplier = 1025;
        subLimit = 1;
        interval = Math.min(buildingCount, nextLimit ) - lastLimit;
        result += multiplier * interval / subLimit;  
    }

    if(buildingCount > nextLimit )
    {
        lastLimit = nextLimit;
        nextLimit = 30;
        multiplier = 788;
        subLimit = 1;
        interval = Math.min(buildingCount, nextLimit ) - lastLimit;
        result += multiplier * interval / subLimit;  
    }

    if(buildingCount > nextLimit )
    {
        lastLimit = nextLimit;
        multiplier = 642;
        subLimit = 1;
        interval = buildingCount - lastLimit;
        result += multiplier * interval / subLimit;  
    }
    return result;
}

const calculate3D = (sectCount, baseArea) => {
    let result = 0;
    if(sectCount + baseArea == 0)
    {
        return result;
    }
    if( 0 < baseArea && baseArea <= 1000){
        result = 2250;
    }
    if( 1000 < baseArea && baseArea <= 3000){
        result = 2475;
    }
    if( 3000 < baseArea && baseArea < 5000){
        result = 2700;
    }
    if( 5000 <= baseArea){
        result = 2925;
    }

    let baseLimit = 1;
    let multiplier;
    let subLimit = 1;
    let lastLimit;
    let nextLimit = baseLimit;
    let interval;
    if (sectCount > nextLimit){
        lastLimit = nextLimit;
        nextLimit = 10;
        multiplier = 150;
        interval = Math.min(sectCount, nextLimit ) - lastLimit;
        result += multiplier * interval / subLimit;   
    }
    if (sectCount > nextLimit){
        lastLimit = nextLimit;
        nextLimit = 30;
        multiplier = 112.5;
        interval = Math.min(sectCount, nextLimit ) - lastLimit;
        result += multiplier * interval / subLimit;   
    }
    if (sectCount > nextLimit){
        lastLimit = nextLimit;
        nextLimit = 50;
        multiplier = 90;
        interval = Math.min(sectCount, nextLimit ) - lastLimit;
        result += multiplier * interval / subLimit;   
    }
    if (sectCount > nextLimit){
        lastLimit = nextLimit;
        multiplier = 75;
        interval = sectCount - lastLimit;
        result += multiplier * interval / subLimit;   
    }
    return result;
}

const calculate = () => {
    let parcelArea = Number(document.getElementById("parcel-area").value);
    let buildingCount = Number(document.getElementById("building-count").value);
    let floorCount = Number(document.getElementById("floor-count").value);
    let baseArea = Number(document.getElementById("base-area").value);
    let sectCount = Number(document.getElementById("sect-count").value);
    let baseArea5c = Number(document.getElementById("base-area-5c").value);
    console.log([buildingCount,floorCount, baseArea ]);
    let resultEtut = 1.1 * calculateEtut(parcelArea);
    let resultProject = 1.1 * calculateProject(buildingCount, floorCount, baseArea);
    let result3D = 1.1 * calculate3D(sectCount, baseArea5c);
    document.getElementById("field-5-a-result").value = resultEtut.toFixed(2);
    document.getElementById("field-5-b-result").value = resultProject.toFixed(2);
    document.getElementById("field-5-c-result").value = result3D.toFixed(2);
    document.getElementById("total-result").value = (resultEtut + resultProject + result3D).toFixed(2);
}

document.addEventListener("DOMContentLoaded", onDocumentLoad);