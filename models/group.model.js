const { connection } = require("../config/database");

//them mot group moi
module.exports.create = (groupObj) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO groupuser SET ?', groupObj, (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result));
                let res = {
                    ...groupObj
                }
                resolve(res);
            }
        });
    });
}

//cap nhat thong tin nhom
module.exports.update = (updateGroupObj, id) => {
    return new Promise((resolve, reject) => {
        let sql = "UPDATE groupuser SET ? where id=?";
        connection.query(sql, [updateGroupObj, id], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(updateGroupObj);
            }
        });
    });
}

//lay thong tin cua mot nhom theo id
module.exports.get = (id) => {
    return new Promise((resolve, reject) => {
        const sql =  `SELECT * FROM groupuser WHERE id = '${id}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

//xoa du lieu trong bang bang group theo id
module.exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM groupuser WHERE id = '${id}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}