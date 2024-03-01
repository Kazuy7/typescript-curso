// Essa é a view pai, que passa herança para mensagem-view e negociacoes-view, por isso ela precisa ser do tipo 'T'(genérica)
// Essa view é feita com métodos para reutilizar, porém, alguns parâmetros são definidos na classe filha

export abstract class View<T> {
  // Só a própria classe ou as filhas que herdarem dessa classe podem ter acessa às propriedades protegidas
  protected elemento: HTMLElement;
  private escapar = false;

  // Recebendo no seletor o ID do elemento
  constructor(seletor: string, escapar?: boolean) {
    this.elemento = document.querySelector(seletor);
    if(escapar) {
      this.escapar = escapar;
    }
  }

  // Chamando o update do modelo e também o template para adicionar no HTML
  public update(model: T): void {
    let template = this.template(model);
    if(this.escapar) {
      template = template.replace(/<script>[\s\S]*?<\/script>/, '');
    }
    this.elemento.innerHTML = template;
  }

  // O método se torna abstrato para que não possa ser instanciado diretamente, ele dever ser instanciado pela classe filha
  // Usa-se o protected para que o método só possa ser acessado pela classe pai e seus herdeiros(mensagem-view e negociacoes-view)
  protected abstract template(model: T): string;
}
