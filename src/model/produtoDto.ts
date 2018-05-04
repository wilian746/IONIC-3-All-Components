export class ProdutoDto {

  private _IdProduto: Number;
  private _NomeProduto: String;
  private _ValorProduto: Number;
  private _IdCategoria: Number;
  private _QuantidadeEstoque: Number;
  private _Ativo: Boolean;
  private _DataValidadeProduto: String;
  private _FotoProduto: String;
  private _CodBarra: String;

  constructor() {

  }

	public get codBarra(): String {
		return this._CodBarra;
	}

	public set codBarra(value: String) {
		this._CodBarra = value;
	}

  get nomeProduto(): String {
    return this._NomeProduto;
  }

  get idProduto(): Number {
    return this._IdProduto;
  }

  get valorProduto(): Number {
    return this._ValorProduto;
  }

  get idCategoria(): Number {
    return this._IdCategoria;
  }
  get quantidadeEstoque(): Number {
    return this._QuantidadeEstoque;
  }

  get ativo(): Boolean {
    return this._Ativo;
  }

  get dataValidadeProduto(): String {
    return this._DataValidadeProduto;
  }
  get fotoProduto(): String {
    return this._FotoProduto;
  }

  set valorProduto(p: Number) {
    this._ValorProduto = p;
  }


  set idProduto(p: Number) {
    this._IdProduto = p;
  }

  set nomeProduto(p: String) {
    this._NomeProduto = p;
  }

  set idCategoria(p: Number) {
    this._IdCategoria = p;
  }

  set quantidadeEstoque(p: Number) {
    this._QuantidadeEstoque = p;
  }

  set ativo(p: Boolean) {
    this._Ativo = p;
  }


  set dataValidadeProduto(p: String) {
    this._DataValidadeProduto = p;
  }

  set fotoProduto(p: String) {
    this._FotoProduto = p;
  }
}
