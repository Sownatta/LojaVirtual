function createNewDb(){
    
    const sqlite3 = require('sqlite3').verbose();

    const db = new sqlite3.Database('./database.db');

    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS produtos (ID INTEGER PRIMARY KEY AUTOINCREMENT, Nome TEXT, Estoque INTEGER, Categoria TEXT, Preco REAL, Descricao TEXT, ImgURL TEXT)');
        
        db.run('CREATE TABLE IF NOT EXISTS clientes (ID INTEGER PRIMARY KEY AUTOINCREMENT, Nome TEXT, CPF TEXT, DataDeNascimento TEXT)');
    });

    db.close();
};

module.exports = createNewDb;