const listClient = require('./list-client')

module.exports = async function (sortType = 0, filtType = 0) {

    const data = await new Promise((resolve, reject) => {
        listClient.write({
            sortType,
            filtType
        }, function (err, res) {
            err ? reject(err) : resolve(res.columns);
        })
    });
    return data
}