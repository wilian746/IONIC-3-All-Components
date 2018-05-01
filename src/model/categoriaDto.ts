export class CategoriaDto {

  private _IdCategoria: number;
  private _Descricao: String;

  constructor() {
  }

  get descricao(): String {
    return this._Descricao;
  }

  set descricao(p: String) {
    this._Descricao = p;
  }

  get idCategoria(): number {
    return this._IdCategoria;
  }

  set idCategoria(p: number) {
    this._IdCategoria = p;
  }
}
