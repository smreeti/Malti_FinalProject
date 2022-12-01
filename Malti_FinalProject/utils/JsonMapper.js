const parseObjectValues = (object) => Object.values(JSON.parse(JSON.stringify(object)));

module.exports = {parseObjectValues};