export { SaveFile, GetFile, GetFiles, LogDirectory, DownloadFilesAsZip, GetDirectory, RemoveDirectory, GetNameWithoutExtension, ReplaceExtension, GetExtension };
import * as jszip from "../lib/jszip.js";

const SaveFile = async (directoryHandler, fileName, file) => {
    if(fileName?.includes("/")){
        let i = fileName.indexOf("/");
        let dirName = fileName.slice(0,i);
        let subFileName = fileName.slice(i+1, fileName.length);
        let subDir = await directoryHandler.getDirectoryHandle(dirName, {create:true} );
        await SaveFile(subDir, subFileName, file);
    }
    else{
        let fHandle = await directoryHandler.getFileHandle(fileName, {create: true});
          let writable = await fHandle.createWritable();
          await writable.write(file);
          writable.close();
    }
}

const GetFile = async (directoryHandler, fileName) => {
    if(fileName.includes("/")){
        let i = fileName.indexOf("/");
        let dirName = fileName.slice(0,i);
        let subFileName = fileName.slice(i+1, fileName.length);
        let subDir = await directoryHandler.getDirectoryHandle(dirName, {create:false} );
        let file = await GetFile(subDir, subFileName);
        return file;
    }
    else{
        try{
        let fHandle = await directoryHandler.getFileHandle(fileName, {create: false});
          let file = await fHandle.getFile();
          return file;
        }
        catch(ex){
            console.log(ex);
        }
    }
}

const GetFiles = async (dirHandle, iterative = false, path = "") => {
    let files = [];
    for await (let [name, handle] of dirHandle.entries()) {
        if(handle.kind === "directory"){
            if(iterative){
                let subFiles = await GetFiles(handle, iterative);
                files = files.concat(subFiles);
            }            
        }
        else{
            path += dirHandle.name;
            let newFile = await handle.getFile();
            newFile.name = `${path}/${newFile.name}`;
            files.push(newFile);
        }
    }
    return files;
}

const DownloadFilesAsZip = async (dirHandle, name) => {
    console.log("creating zip file...");
    let zip = new JSZip();
    await FillZip(dirHandle, zip);
    console.log("creating blob...");
    let blob = await zip.generateAsync({ type: 'blob' });
    console.log("saving blob...");
    saveAs(blob, name);
}

const FillZip = async (dirHandle, folder) => {
    for await (let [name, handle] of dirHandle.entries()) {
        if (handle.kind === "directory") {
            console.log(`directory: ${handle.name}`);
                let subFolder = folder.folder(handle.name);
                await FillZip(handle, subFolder);                  
        }
        else {
            console.log(`getting file...`);
            let newFile = await handle.getFile();
            console.log(`file: ${newFile.name}`);
            folder.file(newFile.name, newFile);
            console.log("file is added.");
        }
    }
}

const LogDirectory = async (dirHandle, prefix="") => {    
    console.log(`D: ${prefix}> ${dirHandle.name}`);
    prefix += "  ";
    for await (let [name, handle] of dirHandle.entries()) {
        if(handle.kind === "directory"){
            await LogDirectory(handle, prefix);
        }
        else{
            let file = await handle.getFile();
            console.log(`F: ${prefix}| ${name} size:${file.size}`);
        }
    }
}

const GetDirectory = async (path, directoryHandler, isCreate = false) => {
    if(path.includes("/")){
        let i = path.indexOf("/");
        let dirName = path.slice(0,i);
        let subPath = path.slice(i+1, path.length);
        let subDir = await directoryHandler.getDirectoryHandle(dirName, {create: isCreate } );
        let dirHandle = await GetDirectory(subDir, subPath);
        return dirHandle;
    }
    else{
        try{
            let handle = await directoryHandler.getDirectoryHandle(path, {create: isCreate });
            return handle;
        }
        catch(ex){
            console.log(ex);
        }
    }
}

const RemoveDirectory = async (dirHandle) => {
    await dirHandle.remove({ recursive: true });
}

const GetNameWithoutExtension = (fileName) => {
    let index = fileName.lastIndexOf('.');
    let indexOfDirSeperator = fileName.lastIndexOf('/');
    if (index > indexOfDirSeperator) {
        let newFileName = fileName.slice(0, index);
        return newFileName;
    }
    return fileName;
}

const GetExtension = (fileName) => {
    let index = fileName.lastIndexOf('.');
    let indexOfDirSeperator = fileName.lastIndexOf('/');
    if (index > indexOfDirSeperator) {
        let extension = fileName.slice(index+1, fileName.length);
        return extension;
    }
    return "";
}
const ReplaceExtension = (fileName, extensionWithoutDot) => {
    let newFileName = GetNameWithoutExtension(fileName);
    newFileName = newFileName + '.' + extensionWithoutDot;
    return newFileName;
}