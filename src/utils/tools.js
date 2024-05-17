const objectArrayDeduplication = (objects, targetKey) => {
    const uniqueKeys = [...new Set(objects.map(obj => obj[`${targetKey}`]))];
    const uniqueObjects = uniqueKeys.map(key => 
        objects.find(obj => obj[`${targetKey}`] === key)
    );
    return uniqueObjects
}

export default {
    objectArrayDeduplication
}