export class CategoriaDto {

    private _IdCategoria: number;
    private _Descricao : String;

    constructor() {
  
    }

    get descricao () : String {
      return this._Descricao ;
    }

    get idCategoria() : number {
      return this._IdCategoria;
    }

    set descricao (p:String)
    {
      this._Descricao  = p;
    }

    set idCategoria(p:number)
    {
      this._IdCategoria = p;
    }

  }