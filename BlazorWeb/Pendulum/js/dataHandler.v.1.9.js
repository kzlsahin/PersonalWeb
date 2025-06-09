
function formatDecimal(str, opt = { seperator: ".", decimal: 3 }) {
    let seperatorChar = opt.seperator || ".";
    let decimalNum = opt.decimal || 3;
    if (typeof str !== 'string') str = str.toString();
    if (isNaN(str)) throw "formatDecimal requires number format, but input is " + str;

    let numParts = str.split(seperatorChar);
    if (!numParts[1]) {
        let ext = ".";
        for (let i = 0; i < decimalNum; i++) {
            ext += "0";
        }
        return numParts[0] + ext;
    }
    numParts[1] = numParts[1].slice(0, decimalNum);
    return numParts[0] + seperatorChar + numParts[1];
}
