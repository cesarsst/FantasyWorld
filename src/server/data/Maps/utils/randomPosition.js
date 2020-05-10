module.exports.positionX = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.positionY = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}