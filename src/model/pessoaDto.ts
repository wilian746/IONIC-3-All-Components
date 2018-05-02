export class PessoaDto {

  private _IdPessoa: number;
  private _Nome: string;
  private _Email: string;
  private _Senha: string;

  constructor(){}

    /**
     * Getter IdPessoa
     * @return {number}
     */
	public get IdPessoa(): number {
		return this._IdPessoa;
	}

    /**
     * Getter Nome
     * @return {string}
     */
	public get Nome(): string {
		return this._Nome;
	}

    /**
     * Getter Email
     * @return {string}
     */
	public get Email(): string {
		return this._Email;
	}

    /**
     * Getter Senha
     * @return {string}
     */
	public get Senha(): string {
		return this._Senha;
	}

    /**
     * Setter IdPessoa
     * @param {number} value
     */
	public set IdPessoa(value: number) {
		this._IdPessoa = value;
	}

    /**
     * Setter Nome
     * @param {string} value
     */
	public set Nome(value: string) {
		this._Nome = value;
	}

    /**
     * Setter Email
     * @param {string} value
     */
	public set Email(value: string) {
		this._Email = value;
	}

    /**
     * Setter Senha
     * @param {string} value
     */
	public set Senha(value: string) {
		this._Senha = value;
	}

}
