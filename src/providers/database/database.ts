import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
 
@Injectable()
export class DatabaseProvider {
 
  public MensagemDeErro : String = "";

  constructor(private sqlite: SQLite) { 

  }  
  
  public getDB() {
    this.MensagemDeErro = "Provider getBD";
    let db = this.sqlite.create({
      name: 'produto.db',
      location: 'default'
    });
    this.MensagemDeErro = "Banco antes return";
    return db;
  }
  
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
 
        // Criando as tabelas
        this.createTables(db);
  
      })
      .catch(e => console.log(e));
  }
  
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS categoria ' + 
       ' (idCategoria integer primary key AUTOINCREMENT NOT NULL, ' + 
       ' descricao VARCHAR (100))'],
      ['CREATE TABLE IF NOT EXISTS ' + 
       ' produto (idProduto INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,' + 
       ' nomeProduto VARCHAR (100)   NOT NULL COLLATE NOCASE,' +
       ' valorProduto DECIMAL (10, 2) NOT NULL, ' +
       ' quantidadeEstoque INTEGER NOT NULL,' +
       ' ativo BOOLEAN not null,' +
       ' dataValidadeProduto date not null, ' +
       ' fotoProduto text not null, ' +
       ' idCategoria INTEGER NOT NULL REFERENCES categoria (IdCategoria) );']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  } 
    
}