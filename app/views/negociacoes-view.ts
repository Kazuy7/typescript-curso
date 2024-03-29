import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./view.js";

// Tipo definido no extends
export class NegociacoesView extends View<Negociacoes> {

  // É necessário usar o protected aqui também para que o template protected não seja sobrescrito pelo template public
  protected template(model: Negociacoes): string {
    return `
        <table class="table table-hoover table-bordered text-white">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                </tr>
            </thead>

            <tbody>
                ${model
                  .lista()
                  .map((negociacao) => {
                    return `
                    <tr>
                        <td>${this.formatar(negociacao.data)}</td>
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                    </tr>
                    `;
                  })
                  .join('')}
            </tbody>
        </table>
        `;
  }

  // Método privado para que só possa ser acessado pela própria classe
  private formatar(data: Date) {
    return new Intl.DateTimeFormat().format(
        data
    )
  }
}
