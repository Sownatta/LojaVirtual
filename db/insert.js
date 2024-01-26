function registrar(tabela, item) {

    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./database.db');

    const colunas = Object.keys(item).join(', ');
    const valores = Array(Object.values(item).length).fill('?').join(', ');

    const sqlRegistrar = `INSERT INTO ${tabela} (${colunas}) VALUES (${valores})`;

    db.run(sqlRegistrar, Object.values(item), function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Registro inserido com ID: ${this.lastID}`)
        console.log(item);
    });
    
    db.close();
}

module.exports = registrar;