import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProdutosProvider {

  constructor(public http: Http) {
  }

  getProdutos(){
    return new Promise((resolve, reject) => {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');

      this.http.get('http://18.231.106.54:9000/produto/', {headers: headers})
        .map(res=> res.json())
        .subscribe(data => {
          console.log('PROVIDER 1: ', data)
          resolve(data);
        }, (err) => {
          console.log('PROVIDER 2: ', err)
          reject(err);
        });
    });
  }

  deleteProdutos(id){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
        headers.append('Content-Type', 'application/json');

      this.http.delete('http://18.231.106.54:9000/produto/' + id, {headers: headers})
        .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  getOneProduto(id){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
        headers.append('Content-Type', 'application/json');

      this.http.get('http://18.231.106.54:9000/produto/' + id, {headers: headers})
        .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  alterarProdutos(id, credential){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
        headers.append('Content-Type', 'application/json');

      this.http.put('http://18.231.106.54:9000/produto/' + id, JSON.stringify(credential), {headers: headers})
        .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  criarProdutos(credential){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
        headers.append('Content-Type', 'application/json');

      this.http.post('http://18.231.106.54:9000/produto/', JSON.stringify(credential), {headers: headers})
        .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

}
