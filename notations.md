...Anotações de coisas que até o momento me confundo ou não sei algumas vezes:...

## funções e métodos:

Getalmente, função está fora de um opjeto enquanto método está dentro.
- console.log() -> console = objeto; .log() = método.
- console = {
  ...
  ...
  log: () => {

  }
}



## Await e Async

async -> declaração de função assíncrona/separada. Deve ser declarado em uma arrow function antes do "()" e
em uma função nomeada antes do nome da função. Deve existir toda vez que houver um "await".
await -> Aguardar. Toda declaração de função/promisse deve ter o await.

Ex:
const start = async () => {
  while (true) {
    let opcao = await select({
      message: "Menu de atividades >",
      choices: [ ...
Se não esperar a pessoa selecionar, o while vai rodar tudo de uma vez, gerando erro ou bug.
Sempre que há um "await", significa que a função é uma Promisse.



## Bug encontrado da linha 20 a 35 em index.js

  if (respostas.length == 0) {
    console.log("Nenhuma escolha foi feita")
    return
  }

  metas.forEach((meta) => {
    meta.checked = false
  })

Se houvesse um item já marcado, e eu desmarcasse o mesmo, a variável "respostas" teria o [] vazio, assim entrando
em "if (respostas.length == 0)". Mas o valor do item desmarcado com essa ordem de lógica, seria mantido como
"true" já que há um "return" dentro do "if". Para correção, foi invertido a ordem da lógica.
