import * as fm from "./FileManager.v.0.1.js";
export { DirectoryManager }
let root;
let surveyData = {};
const AppState = {
    ongoingSurvey: false,
    modified: true,
    folderName: "",
}
const setData = () => {
    surveyData = {};
    let inputs = document.getElementsByClassName("text-state");
    for (let inp of inputs) {
        surveyData[inp.id] = inp.value;
    }
    let multilineTexts = document.getElementsByClassName("text-state-multiline");
    for (let textDiv of multilineTexts) {
        surveyData[textDiv.id] = textDiv.innerHTML;
    }
    let selectables = document.getElementsByClassName("selection-state");
    for (let selectable of selectables) {
        surveyData[selectable.id] = selectable.value;
    }
};

const importData = (state) => {
    console.log("input fields are being set");
    let inputs = document.getElementsByClassName("text-state");
    for (let inp of inputs) {
        inp.value = state[inp.id] ?? "";
    }
    let multilineTexts = document.getElementsByClassName("text-state-multiline");
    for (let textDiv of multilineTexts) {
        textDiv.innerHTML = surveyData[textDiv.id] ?? "";
    }
    let selectables = document.getElementsByClassName("selection-state");
    for (let selectable of selectables) {
        console.log(state[selectable.id]);
        console.log(selectable);
        selectable.value = state[selectable.id] ?? "0";
    }
    console.log("input fields are set");
};

const GetImage = (qID) => {
    console.log("get image");
    let inp = document.getElementById("img-inp-1");
    console.log(inp);
    inp.dataset.qId = qID;
    inp.click();
};

const saveImage = async (event) => {
    let element = event.target;
    let file = element.files[0];
    let fileName = "EK-" + element.dataset.qId + "/" + file.name;
    await DirectoryManager.saveFile(fileName, file);
};

const showForm = () => {
    let root = document.getElementById("root");
    root.style.display = "block";
};

const hideForm = () => {
    let root = document.getElementById("root");
    root.style.display = "none";
};

const getRootDirectory = (path) => {
    let index = path.indexOf("/");
    let root = path;
    if (index > -1) {
        root = path.slice(0, index);
    }
    console.log(`directory is created as ${root}`);
    return root;
}
const getPathUnderRootDirectory = (path) => {
    let index = path.indexOf("/");
    let root = path;
    if (index > -1) {
        root = path.slice(index + 1, path.length);
    }
    return root;
}
const clearMemory = async () => {
    let opfsRoot = await navigator.storage.getDirectory();
    await fm.RemoveDirectory(opfsRoot);
}

const newSurveyDirectory = async (name = "") => {
    let opfsRoot = await navigator.storage.getDirectory();
    if (name == "") {
        name = Date.now().toString();
    }
    let handle = await fm.GetDirectory(name, opfsRoot, true);
    return handle;
};
const newSurveyForm = () => {
    if (root) {
        let emptyData = {};
        importData(emptyData);
    }
    else {
        root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(SurveyForm());
    }
    console.log("new form is created");
}

const loadSurvey = async () => {
    console.log("form data is being imported...");
    let res = false;
    try {
        let directoryHandle = DirectoryManager.handler;
        let file = await fm.GetFile(directoryHandle, "survey.json");
        if (file) {
            console.log("survey.json file is found.");
            console.log(file);
            let content = await file.text();
            surveyData = JSON.parse(content) ?? {};
            console.log("data is deserialized");
            console.log(surveyData);
            res = true;
        }
    } catch (err) {
        console.log("Error:", err);
        console.log("the document couldn't be read!");
    }
    newSurveyForm();
    importData(surveyData);
    showForm();
    return res;
};
const _openNewSurvey = async () => {
    surveyData = {};
    const directoryHandle = await newSurveyDirectory();
    await DirectoryManager.newDirectory(directoryHandle);
    newSurveyForm();
    AppState.ongoingSurvey = true;
    showForm();
    AppState.ongoingSurvey = true;
}

const _loadSurveyFromFile = async () => {
    let element = document.getElementById("directory-input");
    console.log("loading..");
    await clearMemory();
    console.log("memory is cleared.");
    let files = element.files;
    console.log(`${files?.length} files are found`);
    if (files?.length > 0) {
        let rootDirName = getRootDirectory(files[0].webkitRelativePath);
        const directoryHandle = await newSurveyDirectory(rootDirName);
        await DirectoryManager.newDirectory(directoryHandle);
        console.log("directory handle is set.");
        console.log(directoryHandle);
        for (let file of files) {
            console.log("writing");
            console.log(file);
            try {
                let destPath = getPathUnderRootDirectory(file.webkitRelativePath);
                await DirectoryManager.saveFile(destPath, file);
            } catch (err) {
                console.log("Error:", err);
                console.log("the document couldn't be read!");
            }
        }
        AppState.ongoingSurvey = true;
        setTimeout(loadSurvey, 50);
    }
    else{
        window.alert("no file is found!");
    }
};

const SaveSurvey = async () => {
    try {
        setData();
        let content = JSON.stringify(surveyData);
        console.log("servey data is content serialized.");
        await DirectoryManager.saveFile("survey.json", content);
        console.log("servey data is saved.");
        await fm.DownloadFilesAsZip(DirectoryManager.handler, fm.ReplaceExtension(DirectoryManager.directory, 'zip' ));
        //AppState.modified = false;
    }
    catch (err) {
        console.log("Error:", err);
        console.log("the document couldn't be saved!");
    }

};

const DirectoryManager = {
    directory: "",
    handler: null,
    async newDirectory(dirHandler) {
        if (!dirHandler) {
            console.log("DİRECTORY HANDLER İS NULL");
            return;
        }
        this.handler = dirHandler;
        this.directory = dirHandler.name;
    },
    async getSubDirectory(path) {
        if (!this.handler) {
            console.log("directory is null");
            return;
        }
        let dirHandle = await fm.GetDirectory(path, this.handler, false);
        return dirHandle;
    },
    async createSubDirectory(path) {
        if (!this.handler) {
            console.log("directory is null");
            return;
        }
        let dirHandle = await fm.GetDirectory(path, this.handler, true);
        return dirHandle;
    },
    async saveFile(fileName, file) {
        if (!this.handler) {
            console.log("directory is null");
            return;
        }
        console.log(fileName);
        console.log(file);
        await fm.SaveFile(this.handler, fileName, file);
    },
    async getFile(fileName) {
        if (!this.handler) {
            console.log("directory is null");
            return;
        }
        let f = await fm.GetFile(this.handler, fileName);
        return f;
    },
};

const onStartup = () => {
    hideForm();
    window.getImage = GetImage;
};


const OpenNewSurvey = () => {
    if (AppState.modified && AppState.ongoingSurvey) {
        showDialog(SaveSurvey, _openNewSurvey, () => { });
    }
    else {
        _openNewSurvey();
    }
}
const LoadSurveyFromFile = (event) => {
    let element = event?.target;
    console.log("LoadSurveyFromFile is called");
    console.log(event ?? "no-event");
    if (element?.id === "directory-input") {
        if (AppState.modified && AppState.ongoingSurvey) {
        //if (true) {
            showDialog(SaveSurvey, _loadSurveyFromFile, () => { });
        }
        else {
            console.log("going on without asking");
            _loadSurveyFromFile();
        }
    } else {
        let inp = document.getElementById("directory-input");
        inp.click();
    }
}

const onBeforePrint = (event) => {
    let controlDiv = document.getElementById("controls-widget");
    controlDiv.style.visibility = "hidden";
}
const onAfterPrint = (event) => {
    let controlDiv = document.getElementById("controls-widget");
    controlDiv.style.visibility = "visible";
}
const PrintSurvey = (event) => {
    window.print();
}

const _waitDialog = async (d, f) => {
    if (d.open) {
        setTimeout(_waitDialog, 10, d, f);
    }
    else {
        f();
    }
}
const showDialog = (doBefore, doJob, cancel) => {
    let dialog = document.querySelector("dialog");
    dialog.showModal();
    _waitDialog(dialog,
        () => {
            switch (dialog.returnValue) {
                case "yes":
                    doBefore();
                    doJob();
                case "no":
                    doJob();
                case "cancel":
                    cancel();
            }
        });

}

const OnClick = (event) => {
    let controlWidgetId = "#controls-widget"
    let controlWidget = document.querySelector(controlWidgetId)
    if (event.target.closest(controlWidgetId)) {
        controlWidget.setAttribute('open', true);
        console.log("open");
    }
    else {
        controlWidget.setAttribute('open', false);
    }
}

window.addEventListener("load", onStartup);
window.addEventListener("beforeprint", onBeforePrint);
window.addEventListener("afterprint", onAfterPrint);
document.body.addEventListener("click", OnClick);

document
    .getElementById("btn-new-survey-from-file")
    .addEventListener("click", (event) => LoadSurveyFromFile(event));
document
    .getElementById("btn-save-survey")
    .addEventListener("click", () => SaveSurvey());
document
    .getElementById("btn-open-survey")
    .addEventListener("click", () => OpenNewSurvey());
document
    .getElementById("btn-print-survey").
    addEventListener("click", PrintSurvey);
document
    .getElementById("img-inp-1")
    .addEventListener("change", (event) => saveImage(event));
document
    .getElementById("directory-input")
    .addEventListener("change", (event) => LoadSurveyFromFile(event));
