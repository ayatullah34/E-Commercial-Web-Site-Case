const searchFilterFunction = (text, type, arr) => {
    if (text?.length >= 2 || text?.length === 0) {
        const newData = arr.filter(function (item) {
            const itemData = item[type].toLowerCase()
            const textData = text.toLowerCase()
            return itemData.indexOf(textData) > -1;
        });
        return newData
    } else {
        return arr
    }
};

export {
    searchFilterFunction
}