import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { PessoaDto } from '../../model/pessoaDto';

@Injectable()
export class PessoaSqlProvider {

  constructor(private sql: DatabaseProvider) {}

  public criarPessoa(pessoaDto) {
    return this.sql.getDB()
    .then((db: SQLiteObject) => {
      let query = `insert into pessoa (nome, email, senha)
                   values ('${pessoaDto.Nome}', '${pessoaDto.Email}', '${pessoaDto.Senha}')`;
      return db.executeSql(query, [])
        .then((data: any) => {
        }).catch((err) => {return console.error('Erro ao executar query INSERT pessoa', err)});
      })
      .catch((err) => {return console.error('Erro ao adiquirir Banco', err)});
  }

  public retornaTodasPessoas() {
    return this.sql.getDB()
    .then((db: SQLiteObject) => {

      let pessoas: Array<PessoaDto> = new Array<PessoaDto>();

      return db.executeSql('select * from pessoa', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              let pessoaDto: any = new PessoaDto();
              pessoaDto.IdPessoa = data.rows.item(i).idPessoa
              pessoaDto.Nome = data.rows.item(i).nome
              pessoaDto.Email = data.rows.item(i).email
              pessoaDto.Senha = data.rows.item(i).senha
              pessoas.push(pessoaDto)
            }
            return pessoas;
          }
        })
        .catch((err) => {
          return console.error('Erro ao executar query GETALL pessoa', err);
        });
    })
    .catch((err) => {
      return console.error('Erro ao adiquirir Banco', err);
    });
  }

  public editarPessoa(pessoaDto){
    return this.sql.getDB()
    .then((db: SQLiteObject) => {
      let query = `update pessoa set
                  nome = '${pessoaDto.Nome}',
                  email = '${pessoaDto.Email}',
                  senha = '${pessoaDto.Senha}'
                  where idPessoa = ${pessoaDto.IdPessoa}`;

      return db.executeSql(query, [])
        .then((data: any) => {
        }).catch((err) => {return console.error('Erro ao executar query UPDATE pessoa', err)});
      })
      .catch((err) => {return console.error('Erro ao adiquirir Banco', err)});
  }

  public deletarPessoa(id) {

    return this.sql.getDB()
    .then((db: SQLiteObject) => {
      let query = `delete from pessoa
        where idPessoa = ${id}`;

      return db.executeSql(query, [])
      .then((data: any) => {
      }).catch((err) => {return console.error('Erro ao executar query DELETE pessoa', err)});
    })
    .catch((err) => {return console.error('Erro ao adiquirir Banco', err)});
  }
}
