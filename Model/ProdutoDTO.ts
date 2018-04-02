export class ProdutoDTO {
    private _IdProduto: Number;
    private _NomeProduto: String;
    private _ValorProduto: Number;
    private _IdCategoria: Number;
    private _QuatnidadeEstoque: Number;
    private _Ativo: Boolean;
    private _DataValidadeProduto: String;
    private _FotoProduto: String;


    /**
     * Getter IdProduto
     * @return {Number}
     */
	public get IdProduto(): Number {
		return this._IdProduto;
	}

    /**
     * Setter IdProduto
     * @param {Number} value
     */
	public set IdProduto(value: Number) {
		this._IdProduto = value;
	}

    /**
     * Getter NomeProduto
     * @return {String}
     */
	public get NomeProduto(): String {
		return this._NomeProduto;
	}

    /**
     * Setter NomeProduto
     * @param {String} value
     */
	public set NomeProduto(value: String) {
		this._NomeProduto = value;
	}

    /**
     * Getter ValorProduto
     * @return {Number}
     */
	public get ValorProduto(): Number {
		return this._ValorProduto;
	}

    /**
     * Setter ValorProduto
     * @param {Number} value
     */
	public set ValorProduto(value: Number) {
		this._ValorProduto = value;
	}

    /**
     * Getter IdCategoria
     * @return {Number}
     */
	public get IdCategoria(): Number {
		return this._IdCategoria;
	}

    /**
     * Setter IdCategoria
     * @param {Number} value
     */
	public set IdCategoria(value: Number) {
		this._IdCategoria = value;
	}

    /**
     * Getter QuatnidadeEstoque
     * @return {Number}
     */
	public get QuatnidadeEstoque(): Number {
		return this._QuatnidadeEstoque;
	}

    /**
     * Setter QuatnidadeEstoque
     * @param {Number} value
     */
	public set QuatnidadeEstoque(value: Number) {
		this._QuatnidadeEstoque = value;
	}

    /**
     * Getter Ativo
     * @return {Boolean}
     */
	public get Ativo(): Boolean {
		return this._Ativo;
	}

    /**
     * Setter Ativo
     * @param {Boolean} value
     */
	public set Ativo(value: Boolean) {
		this._Ativo = value;
	}

    /**
     * Getter DataValidadeProduto
     * @return {String}
     */
	public get DataValidadeProduto(): String {
		return this._DataValidadeProduto;
	}

    /**
     * Setter DataValidadeProduto
     * @param {String} value
     */
	public set DataValidadeProduto(value: String) {
		this._DataValidadeProduto = value;
	}

    /**
     * Getter FotoProduto
     * @return {String}
     */
	public get FotoProduto(): String {
		return this._FotoProduto;
	}

    /**
     * Setter FotoProduto
     * @param {String} value
     */
	public set FotoProduto(value: String) {
		this._FotoProduto = value;
	}
    
}