export class CategoriaDTO {
    private _IdCategoria: Number;
    private _Descricao: String;

    get descricao () : String {
        return this._Descricao;
    }

    set descricao (p: String) {
        this._Descricao = p;
    }

    get categoria () : Number {
        return this._IdCategoria
    }

    set categoria (p: Number) {
        this._IdCategoria = p
    }
}