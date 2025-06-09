window.addEventListener("beforeprint", prepareDocForPrint);

window.addEventListener("afterprint", resetDocAfterPrint);



function prepareDocForPrint(){
    console.log("printing");
    chartsNode.updateValues();
    setDates();
    chartsNode.updateValues();
    openAllPendulums();
}

function resetDocAfterPrint(){
    closeAllPendulums();
}

function setDates(){
    let date = new Date(Date.now());
    let options = {year: 'numeric', month: 'long', day: 'numeric' };
    let dateStr = date.toLocaleDateString('en', options);
    console.log(dateStr);
    let nodes = document.getElementsByClassName("date");
    Array.from(nodes).forEach(element => {
        element.innerText = dateStr; 
    });
}

function openAllPendulums(){
    let pends = document.getElementsByClassName("pendulum");
    Array.from(pends).forEach(elem => elem.setAttribute("open", true));
}

function closeAllPendulums(){
    let pends = document.getElementsByClassName("pendulum");
    Array.from(pends).forEach(elem => elem.removeAttribute("open"));
}
