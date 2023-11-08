const CheckExpiry = (first, second) => {
    let firstTime = first[0] * 3600 + first[1] * 60 + first[2];
    let secondTime = second[0] * 3600 + second[1] * 60 + second[2];

    return (Math.abs(secondTime - firstTime));
}

module.exports = {
    CheckExpiry 
}