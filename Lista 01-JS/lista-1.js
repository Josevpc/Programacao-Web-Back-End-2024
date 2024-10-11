// José Victor Piccin - 2268256

/* Exercício 01
Escreva uma função que calcule e retorne o fatorial de um número.*/

function fatorial(numero) {
    let valor = 1;
    for (let i = 1; i <= numero; i++) {
        valor *= i;
    }
    return valor;
}

/* Exercício 02
Escreva uma função que retorne uma String contendo uma sequência de
N mensagens do texto informado pelo usuário. O valor de N e a mensagem são
informados por parâmetro.
*/

function retorna_texto(numero_mensagens, mensagem) {
    let mensagem_concatenada = mensagem;
    for (let i = 0; i < numero_mensagens - 1; i++) {
        mensagem_concatenada = mensagem_concatenada.concat(" ", mensagem);
    }
    return mensagem_concatenada;
}

/* Exercício 03
Escreva uma função que receba 2 valores e uma operação básica: adição, subtração,
multiplicação e divisão e retorne o resultado da operação.
Observação: Faça a validação para prevenir a divisão por 0 e também para garantir que
a operação informada é válida. Retorne nulo para os casos de erro.
*/

function realiza_operacao(valor_1, valor_2, operação) {
    switch (operação) {
        case "adicao":
            return valor_1 + valor_2;
        case "subtracao":
            return valor_1 - valor_2;
        case "multiplicacao":
            return valor_1 * valor_2;
        case "divisao":
            if (valor_2 == 0) {
                return null;
            } else {
                return valor_1 / valor_2;
            }
        default:
            return null;
    }
}

/* Exercício 04
Escreva uma função que retorne um vetor contendo o resultado da tabuada de um
número recebido por parâmetro. Cada resultado na respectiva posição do índice.
 */

function retorna_tabuada(valor) {
    let tabuada = [];
    for (let i = 0; i <= 10; i++) {
        tabuada[i] = valor * i;
    }

    return tabuada;
}

/* Exercício 05
Escreva uma função que retorne um número fornecido pelo usuário, porém
invertido. Por exemplo, o usuário fornece o número 875 e a função retorna o número
578. O argumento da função e o retorno deve ser um valor inteiro.
*/

function inverte_numero(valor) {
    return parseFloat(valor.toString().split("").reverse().join("")) * Math.sign(valor);
}

/* Exercício 06
Escreva uma função que permita contar o número de vogais contidas em uma string
fornecida por parâmetro. Por exemplo, o usuário informa a string “Brocolis”, e a função
retorna o número 3 (há 3 vogais nessa palavra)
 */

function conta_vogais(palavra) {
    let vogais = ["A", "E", "I", "O", "U"];
    let contador = 0;
    for (let i = 0; i < palavra.length; i++) {
        if (vogais.includes(palavra[i].toUpperCase())) {
            contador += 1;
        }
    }
    return contador;
}

/* Exercício 07
Escreva uma função que receba uma sequência de parênteses e colchetes e retorne se
a sequência está bem formada ou não. O retorno deve ser um valor lógico. Exemplo:
“(([]))” retorna true, “(([)])” retorna falso.
*/

//(([)])
function sequencia_bem_formada(sequencia) {
    const mapa_simbolos = {
        "(": ")",
        "[": "]"
    };

    let sequencia_auxiliar = [];

    if (sequencia.length % 2 != 0) {
        return false;
    }

    for (let i = 0; i < (sequencia.length / 2); i++) {
        sequencia_auxiliar.push(mapa_simbolos[sequencia[i]]);
    }

    for (let i = sequencia.length / 2; i < sequencia.length; i++) {
        if (!(sequencia_auxiliar.pop() === sequencia[i])) {
            return false;
        }
    }

    return true;
}

/* Exercício 08
Escreva uma função que receba um número e retorne uma lista de objetos (id, nome e
idade) aleatórios gerados dinamicamente. O código deve ser sequencial; use uma lista
de nomes pré-definida; e gere idades entre 18 e 90 anos.
*/

function retorna_aleatorio(valor) {
    let pessoas = [];

    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const nomes = ["Ana", "Bruno", "Carla", "Diego", "Eduarda", "Felipe", "Gabriela", "Henrique", "Isabela", "João"];

    for (let i = 0; i < valor; i++) {
        pessoa = [ids[Math.floor(Math.random() * 10)], nomes[Math.floor(Math.random() * 10)], Math.floor(Math.random() * (90 - 18 + 1)) + 18];
        pessoas.push(pessoa);
    }

    return pessoas;
}

/* Exercício 09
Escreva uma função que receba a lista de objetos gerados anteriormente e calcule a
média de idades das pessoas presentes na lista.
*/

function media_idades(pessoas) {
    let soma = 0;
    for (let i = 0; i < pessoas.length; i++) {
        soma += pessoas[i][2];
    }

    return soma / pessoas.length;
}

/* Exercício 10
Escreva uma função que receba a lista de objetos gerados anteriormente e ordene os
dados por um dos atributos informados por parâmetros.
*/

function ordena_pessoas(pessoas, atributo_ordenacao) {
    let indice;

    switch (atributo_ordenacao) {
        case "id":
            indice = 0;
            break;
        case "nome":
            indice = 1;
            break;
        case "idade":
            indice = 2;
            break;
        default:
            indice = 0;
            break;
    }

    return pessoas.sort((a, b) => {
        if (a[indice] > b[indice]) {
            return 1;
        } else if (a[indice] < b[indice]) {
            return -1
        } else {
            return 0;
        }
    });
}