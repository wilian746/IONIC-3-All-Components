import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { CategoriaDto } from '../../Model/categoriaDto';
 
@Injectable()

export class CategoriaProvider {
 
  Mensagem : String = "";

  constructor(private dbProvider: DatabaseProvider) { 
  
  }
   
  public update(categoriaDto) {
      
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => { 
      let sql = 'update categoria set descricao = ? where idCategoria = ?';
      return db.executeSql(sql, [categoriaDto.descricao, categoriaDto.idCategoria])
        .then((data: any) => {
        }).catch((e) => {return("Erro (1) " + e)});
      })
      .catch((e) => {return("Erro (2) " + e)});

}

  public add(categoriaDto) {
      
      return this.dbProvider.getDB()
      .then((db: SQLiteObject) => { 
        let sql = 'insert into categoria (descricao) values (?)';
        return db.executeSql(sql, [categoriaDto.descricao])
          .then((data: any) => {
          }).catch((e) => {return("Erro (1) " + e)});
        })
        .catch((e) => {return("Erro (2) " + e)});    
  }

  public delete(id) {
    
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('delete from categoria where idCategoria = ?', [id])
        .then( )
        .catch((e) => {return("Erro (1) " + e)});
    })
    .catch((e) => {return("Erro (2) " + e)});
  }
 
  public get(id) {
    
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      let categoriaDto: CategoriaDto;
      categoriaDto = new CategoriaDto();

      return db.executeSql('select * from categoria where idCategoria = ?', [id])
        .then((data: any) => {
          if (data.rows.length > 0) {
             categoriaDto.descricao = data.rows.item(0).descricao;
             categoriaDto.idCategoria = data.rows.item(0).idCategoria;
             return categoriaDto;
          } else {
              return categoriaDto;
          }
        })
        .catch((e) => {return("Erro (1) " + e)});
    })
    .catch((e) => {return("Erro (2) " + e)});
  }
 
  public getAll() {

    this.Mensagem = "getAll";

    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      this.Mensagem = "getDB";
      let categorias: Array<CategoriaDto>;

      categorias = new Array<CategoriaDto>();

      return db.executeSql('select * from categoria order by descricao', [])
        .then((data: any) => {
          this.Mensagem = "executeSql";
          if (data.rows.length > 0) {
            
            for (var i = 0; i < data.rows.length; i++) {
 
              let categoriaDto = new CategoriaDto();
              categoriaDto.descricao = data.rows.item(i).descricao;
              categoriaDto.idCategoria = data.rows.item(i).idCategoria;
              categorias.push(categoriaDto);
              //categorias.length = i + 1;
              //categorias[i] = categoriaDto;
            }
            return categorias;
          } else {
            return categorias;
          }
        })
        .catch((e) => {
          this.Mensagem = this.Mensagem +  " -22- " + this.dbProvider.MensagemDeErro;
         // this.Mensagem = this.Mensagem + " " + e.toString();
          return "Erro1 : " + this.Mensagem; 
        });
    })
    .catch((e) => {
      this.Mensagem = this.Mensagem +  " ---- " + this.dbProvider.MensagemDeErro;
       return "Erro2 : " + this.Mensagem; 
      // this.Mensagem = this.Mensagem + " " + e.toString();
     // return("Erro (2) " + e)
    });
    
  }
}
