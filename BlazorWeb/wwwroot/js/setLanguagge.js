const languageState = {

    currentLang: "en",
}

function setlanguage() {
    // !!only for event call!!
    languageState.currentLang = event.target.value;
    setLocalStorageLangState(languageState.currentLang);
    checkLang();
}

function checkLang() {
    let localStorageLang = localStorage.getItem("kzlsahin-lang");

    if (!localStorageLang) {
        setLocalStorageLangState(languageState.currentLang);
        localStorageLang = languageState.currentLang;
    }
    else {
        languageState.currentLang = localStorageLang;
    }
    
    let elem = document.getElementById("lang-selector");
    if (elem) {
        elem.value = localStorageLang;
    }

    let elems = document.getElementsByClassName("lang-dependant");
    for (elem of elems) {
        elem.style.display = elem.id == localStorageLang ? (elem.tagName == "SPAN" ? "inline" : "block") : "none";
    }

}


function setLocalStorageLangState(lang) {

    localStorage.setItem("kzlsahin-lang", lang);

}