const onDocumentLoad = () => {
    document.getElementById("parcel-area").addEventListener("change", clearResults);
    document.getElementById("building-count").addEventListener("change", clearResults);
    document.getElementById("floor-count").addEventListener("change", clearResults);
    document.getElementById("base-area").addEventListener("change", clearResults);
    document.getElementById("ch6-floor-count").addEventListener("change", clearResults_Ch6);
    document.getElementById("ch6-parcel-area").addEventListener("change", clearResults_Ch6);
    document.getElementById("ch6-kanal-notu").addEventListener("change", clearResults_Ch6);
    document.getElementById("btn-calculate").addEventListener("click", calculate);
    document.getElementById("btn-calculate-VI").addEventListener("click", calculate_Ch6);
    setTimeout(() => {OpenPage(0);}, 500);
}

const pages = ["Ch-V", "Ch-VI"];
let openPageNum = 0;

const OpenPage = (i) => {
    let div = document.getElementById(pages[i]);
    ClosePage();
    openPageNum = i;
    div.classList.remove("closed");
    div.classList.add("open");
}

const ClosePage = () => {
    let openPage = document.getElementById(pages[openPageNum]);
    openPage.classList.remove("open");
    openPage.classList.add("closed");
}
