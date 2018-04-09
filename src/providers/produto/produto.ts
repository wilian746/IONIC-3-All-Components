import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { ProdutoDto } from '../../Model/produtoDto';

/*
  Generated class for the ProdutoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProdutoProvider {

  Mensagem : String = "";

  constructor(private dbProvider: DatabaseProvider) { 
    
  } 
   
  public update(produtoDto) {
      
    //let dataValidade = new Date(produtoDto.dataValidadeProduto); 
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {        

      let ativo = 0;
      if (produtoDto.ativo == true)
         ativo = 1;
      let sql = 'update produto set nomeProduto = "' + produtoDto.nomeProduto + '",' +
                ' valorProduto = ' + produtoDto.valorProduto + ' , ' +
                ' idCategoria = ' + produtoDto.idCategoria + ' , ' + 
                ' ativo = ' + ativo + ' , ' +
                ' fotoProduto = "' + produtoDto.fotoProduto + '", ' +
                ' dataValidadeProduto = "' + produtoDto.dataValidadeProduto.substring(0,10) + '",' +
                ' quantidadeEstoque = ' + produtoDto.quantidadeEstoque +                 
                ' where idProduto = ' + produtoDto.idProduto;
      this.Mensagem = sql;

      return db.executeSql(sql, [])
        .then((data: any) => {
        }).catch((e) => {return("Erro (1) " + e)});
      })
      .catch((e) => {return("Erro (2) " + e)});

}

  public add(produtoDto) {
      
      //let dataValidade = new Date(produtoDto.dataValidadeProduto); 

      return this.dbProvider.getDB()
      .then((db: SQLiteObject) => { 
        let sql = 'insert into produto (nomeProduto,valorProduto,' + 
          'idCategoria, quantidadeEstoque, ativo, fotoProduto, ' +
          ' dataValidadeProduto) ' +
           ' values (?, ?, ?, ?, ?, ?, ?)';
        return db.executeSql(sql, 
          [produtoDto.nomeProduto, 
          produtoDto.valorProduto,
          produtoDto.idCategoria ,
          produtoDto.quantidadeEstoque, 
          produtoDto.ativo,
          produtoDto.fotoProduto,
          produtoDto.dataValidadeProduto.substring(0,10)])
          .then((data: any) => {
          }).catch((e) => {return("Erro (1) " + e)});
        })
        .catch((e) => {return("Erro (2) " + e)});   
  }

  public delete(id) {
    
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('delete from produto where idProduto = ?', [id])
        .then( )
        .catch((e) => {return("Erro (1) " + e)});
    })
    .catch((e) => {return("Erro (2) " + e)});
  }
 
  public get(id) {
    
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      let produtoDto: ProdutoDto;
      produtoDto = new ProdutoDto();

      return db.executeSql('select * from produto where idProduto = ?', [id])
        .then((data: any) => {
          if (data.rows.length > 0) {
             produtoDto = this.montarProduto(data.rows.item(0));
             return produtoDto;
          } else {
              return produtoDto;
          }
        })
        .catch((e) => {return("Erro (1) " + e)});
    })
    .catch((e) => {return("Erro (2) " + e)});
  }
 
  public getAll(nomeProduto : String) {

     
    let produtos: Array<ProdutoDto>;
    produtos = new Array<ProdutoDto>();  

    let sql = "select * from produto order by nomeProduto";
    if (nomeProduto.trim() != "")
       sql = "select * from produto " + 
             " where nomeProduto like '%" + nomeProduto.trim() + 
             "%' order by nomeProduto";

    return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {

          return db.executeSql(sql,[]).then((data: any) => {
             if (data.rows.length > 0) {            
              for (var i = 0; i < data.rows.length; i++) {
  
                let produtoDto: ProdutoDto;
                produtoDto = new ProdutoDto();
                produtoDto = this.montarProduto(data.rows.item(i));
                produtos.push(produtoDto);                
              }
              return produtos;
            } else {
              return produtos;
            }
        })
        .catch((e) => {return("Erro (1) " + e)});
    })
    .catch((e) => {return("Erro (2) " + e)});
  }

  montarProduto (item : any)
  {
      let produtoDto: ProdutoDto;
      produtoDto = new ProdutoDto();

      produtoDto.idProduto = item.idProduto;
      produtoDto.nomeProduto = item.nomeProduto;
      produtoDto.valorProduto = item.valorProduto;
      produtoDto.idCategoria = item.idCategoria;
      produtoDto.quantidadeEstoque = item.quantidadeEstoque;
      produtoDto.dataValidadeProduto = item.dataValidadeProduto.toString();
      produtoDto.fotoProduto = item.fotoProduto;
      produtoDto.ativo = item.ativo;

      return produtoDto;
  }
}
