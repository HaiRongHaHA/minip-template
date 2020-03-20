const path = require("path");

function getAttrRegExp(attr) {
    return new RegExp(`${attr}\\s*=\\s*('[^']*'|\"[^\"]*\")`);
}

function wxsUrlLoader(source) {
    const wxsTagReg = /<wxs[^>]+>/g;
    const processedSource = source.replace(wxsTagReg, (...args) => {
        const root = process.cwd();
        const needMatchUrl = args[0]
            .match(getAttrRegExp("src"))[1]
            .split("@")[1];
        const moduleValue = args[0].match(getAttrRegExp("module"))[1];
        if (needMatchUrl) {
            const relativeUrl = path.relative(
                this.resourcePath,
                root + "/src" + needMatchUrl
            );
            //匹配的相对路径多了一层，替换为./**，小程序里\不识别，再替换为/
            const replaceFirst = relativeUrl
                .replace(/(\.\.)?/, ".")
                .replace(/\\/g, "/");
            return `<wxs src="${replaceFirst} module=${moduleValue} />`;
        }
    });
    // loader的参数就是源代码
    return processedSource;
}
module.exports = wxsUrlLoader;
