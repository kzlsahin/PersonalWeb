const clearResults_Ch6 = () => {
    document.getElementById("total-result-ch6").value = "";
}

const calculate_Ch6 = () => {
    let floorCount = Number(document.getElementById("ch6-floor-count").value);
    let parcelArea = Number(document.getElementById("ch6-parcel-area").value);
    let isCanalNoteRequested = document.getElementById("ch6-kanal-notu").checked;
    console.log([parcelArea,floorCount, isCanalNoteRequested ]);
    let result_ch6 = 1.1 * getResult_Ch6(parcelArea, floorCount, isCanalNoteRequested);
    document.getElementById("total-result-ch6").value = result_ch6.toFixed(2);
}

const getResult_Ch6 = (parcelArea, floorCount, isCanalNoteRequested) => {
    let subLimit = 100;
    let multiplier = 1;
    let result = 0;
    let lastLimit;
    let nextLimit = 0;
    let interval;

    if (parcelArea > nextLimit) {
        lastLimit = nextLimit;
        nextLimit = 100;
        result = 2058;
        
    }
    if (parcelArea > nextLimit) {
        lastLimit = nextLimit;
        nextLimit = 200;
        result = 2475;
        
    }
    if (parcelArea > nextLimit) {
        lastLimit = nextLimit;
        nextLimit = 300;
        result = 2858;        
    }

    if (parcelArea > nextLimit) {
        lastLimit = nextLimit;
        nextLimit = 750;
        multiplier = 338;
        interval = Math.min(parcelArea, nextLimit) - lastLimit;
        result += multiplier * interval / subLimit;
        
    }
    if (parcelArea > nextLimit) {
        lastLimit = nextLimit;
        nextLimit = 1500;
        multiplier = 221;
        interval = Math.min(parcelArea, nextLimit) - lastLimit;
        result += multiplier * interval / subLimit;
    }
    if (parcelArea > nextLimit) {
        lastLimit = nextLimit;
        nextLimit = 3000;
        multiplier = 117;
        interval = Math.min(parcelArea, nextLimit) - lastLimit;
        result += multiplier * interval / subLimit;
    }
    if (parcelArea > nextLimit) {
        lastLimit = nextLimit;
        nextLimit = 5000;
        multiplier = 63;
        interval = Math.min(parcelArea, nextLimit) - lastLimit;
        result += multiplier * interval / subLimit;
    }
    if (parcelArea > nextLimit) {
        lastLimit = nextLimit;
        multiplier = 39;
        interval = parcelArea - lastLimit;
        result += multiplier * interval / subLimit;
    }

    result += 248 * floorCount;
    if(isCanalNoteRequested){
        result += 1193;
    }
    return result;
}