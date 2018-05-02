import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {
  public MensagemDeErro = ''
  constructor(private sqlite: SQLite) {}

  public getDB(){
    let db = this.sqlite.create({
      name: 'banco',
      location: 'default'
    });
    return db;
  }

  public createDatabase(){
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db)
      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS pessoa ' +
       ' (idPessoa INTEGER primary key AUTOINCREMENT NOT NULL, ' +
       ' nome VARCHAR(100) NOT NULL, ' +
       ' email VARCHAR(50) NOT NULL, ' +
       ' senha VARCHAR(25) NOT NULL, ' +
       ' foto VARCHAR )' ]
    ]).then((result) => {
      console.log('Tabelas criadas', result)
    }).catch((err) => {
      console.error('Erro ao criar as tabelas', err)
    });
    // db.sqlBatch([
    //   ['DROP DATABASE banco']
    // ]).then((result) => {
    //   console.log('Banco deletado', result)
    //   return result
    // }).catch((err) => {
    //   console.error('Erro ao deletar Banco', err)
    //   return err
    // });
  }

}
