// import { select } from "inquirer/prompts";
// Não encontra "/prompts".

const {select, input, checkbox} = require("@inquirer/prompts")

let metas = []

const cadastrarMetas = async () => {
  let meta = await input({message: "Digite uma meta: "})
  if (meta.length == 0) {
    console.log("A meta não pode ser vazia")
    return
  }

  metas.push({
    value: meta,
    checked: false
  })
}

const marcarMetas = async () => {
  // respostas -> ["...", "...", "..."]. checkbox() retorna um array de strings.
  const respostas = await checkbox({
    message: "Use as Setas para mudar onde deve ser selecionado, utilize a tecla de Espaço para marcar ou desmarcar e a tecla Enter para enviar as respostas.",
    choices: [...metas],
    instructions: false
  })
  if (respostas.length == 0) {
    console.log("Nenhuma escolha foi feita")
    return
  }

  metas.forEach((meta) => {
    meta.checked = false
  })
  // Por padrão os checked de "metas" estarão como false. Desmarcar totas as metas, garante que apenas as metas selecionadas estarão marcadas no final.
  // Se mandar marcar novamente sem sair da sessão, o array de respostas ainda manterá as respostas marcadas anteriormente, assim mantendo o checked como true, enquanto,
  // ao desmarcar, checked será marcado como false e sairá da lista de respostas.

  respostas.forEach((resposta) => {
    // metas -> [{...}, {...}, {...}]. find entre os valores das "metas" e "resposta".
    const metaEscolhida = metas.find((meta) => {
      return meta.value == resposta
      // Valida se a resposta selecionada é igual a um dos itens durante a separação dos objetos do array.
      // Sem essa correspondência, não seria possível atualizar o estado de checked corretamente. Sem contar que "resposta" é uma string e não um objeto, ou seja,
      // precisava de uma maneira de acessar o objeto correto equivalente.
    })
      metaEscolhida.checked = true
  })
}

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    // filter() -> Sempre que o retorno for verdadeiro, vai armazenar o achado na variável.
    return meta.checked
    // Se o checked está como true, quarda na variável.
  })

  if (realizadas.length == 0) {
    console.log('Não há metas realizadas')
    return
  }

  await select({
    message: "Metas realizadas",
    choices: [...realizadas]
  })
}

const start = async () => {
  while (true) {
    // while gera um funcionamento constante de algo (nesse caso o menu) até a parada forçada, break ou return.
    // Declaração de "let opcao" dentro de while permite que o valor da mesma seja atualizada em toda interação com o menu.
    let opcao = await select({
      message: "Menu de atividades >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "Cadastrar"
        },
        {
          name: "Marcar meta",
          value: "Marcar"
        },
        {
          name: "Metas realizadas",
          value: "Realizadas"
        },
        {
          name: "Sair do menu",
          value: "Sair"
        }
      ]
    })

    switch (opcao) {
      case "Cadastrar":
        await cadastrarMetas();
        console.log(metas)
        break;
      case "Marcar":
        await marcarMetas();
        break;
      case "Realizadas":
        await metasRealizadas();
        break;

      case "Sair":
        console.log("Ok, saindo")
        return
    }
  }
}

start()
