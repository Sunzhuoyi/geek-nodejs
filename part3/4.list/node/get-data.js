const listClient = require('./list-client')

module.exports = async function (sortType = 0, fileType = 0) {

    const data = await new Promise((resolve, reject) => {
        listClient.write({
            sortType,
            fileType
        }, function (err, res) {
            err ? reject(err) : resolve(res.dom);
        })
    });

    return data

}