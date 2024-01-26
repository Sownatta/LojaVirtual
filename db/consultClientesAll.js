async function listClientesAll(){

    const sqlite3 = require('sqlite3').verbose();

    const db = new sqlite3.Database('./database.db');

    const sqlConsultaTodos = 'SELECT Nome, cpf, DataDeNascimento FROM clientes';

    try {
        const list = await new Promise((resolve, reject) => {
            db.all(sqlConsultaTodos, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        db.close();

        return list;
    } catch (err) {
        console.error(err);
        db.close();
        throw err;
    }
};

module.exports = listClientesAll;