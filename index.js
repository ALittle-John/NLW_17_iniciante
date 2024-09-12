// import { select } from "inquirer/prompts";
// Não encontra "/prompts".

const {select, input, checkbox} = require("@inquirer/prompts")

let mensagem = "App de metas iniciado"
let metas = []

const cadastrarMetas = async () => {
  let meta = await input({message: "Digite uma meta: "})
  if (meta.length == 0) {
    mensagem = "A meta não pode ser vazia"
    return
  }

  metas.push({
    value: meta,
    checked: false
  })

  mensagem = `Meta "${meta}" cadastrada com sucesso`
}

const marcarMetas = async () => {
  // respostas -> ["...", "...", "..."]. checkbox() retorna um array de strings.
  const respostas = await checkbox({
    message: "Use as Setas para mudar onde deve ser selecionado, utilize a tecla de Espaço para marcar ou desmarcar e a tecla Enter para enviar as respostas.",
    choices: [...metas],
    instructions: false
  })

  metas.forEach((meta) => {
    meta.checked = false
  })
  // Por padrão os checked de "metas" estarão como false. Desmarcar totas as metas, garante que apenas as metas selecionadas estarão marcadas no final.
  // Se mandar marcar novamente sem sair da sessão, o array de respostas ainda manterá as respostas marcadas anteriormente, assim mantendo o checked como true, enquanto,
  // ao desmarcar, checked será marcado como false e sairá da lista de respostas.

  if (respostas.length == 0) {
    mensagem = "Nenhuma escolha foi feita"
    return
  }

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
    mensagem = `Foi marcado a(s) metas(s): ${respostas}`
}

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    // filter() -> Sempre que o retorno for verdadeiro, vai armazenar o achado na variável.
    return meta.checked
    // Se o checked está como true, quarda na variável.
  })

  if (realizadas.length == 0) {
    mensagem = 'Não há metas realizadas'
    return
  }

  await select({
    message: "Metas realizadas: " + realizadas.length,
    choices: [...realizadas]
  })
}

const metasAbertas = async () => {
  const abertas = metas.filter((meta) => {
    return meta.checked != true
    // Se o checked está como false, quarda na variável.
  })

  if (abertas.length == 0) {
    mensagem = 'Não há metas abertas'
    return
  }

  await select({
    message: "Metas abertas: " + abertas.length,
    choices: [...abertas]
  })
}

const deletarMetas = async () => {
  const metasDesmarcadas = metas.map((meta) => {
    return {
      value: meta.value,
      checked: false
    }
  })

  const escolhidasADeletar = await checkbox({
    message: "Use as Setas para mudar onde deve ser selecionado, utilize a tecla de Espaço para marcar ou desmarcar e a tecla Enter para enviar as respostas.",
    choices: [...metasDesmarcadas],
    instructions: false
  })

  if (escolhidasADeletar.length == 0) {
    mensagem = "Não há itens selecionados para deletar"
    return
  }

  escolhidasADeletar.forEach((item) => {
    naoDeletar = metas.filter((meta) => {
      return meta.value != item
    })
  })
  mensagem = `Metas ${escolhidasADeletar} deletadas com sucesso!`
}

const mostrarMensagem = () => {
  console.clear()

  if (mensagem != "") {
    console.log(mensagem)
    console.log("")
    mensagem = ""
  }
}

const start = async () => {
  while (true) {
    mostrarMensagem()
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
          name: "Metas abertas",
          value: "Abertas"
        },
        {
          name: "Deletar metas",
          value: "Deletar"
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
        break;
      case "Marcar":
        await marcarMetas();
        break;
      case "Realizadas":
        await metasRealizadas();
        break;
      case "Abertas":
        await metasAbertas();
        break;
      case "Deletar":
        await deletarMetas();
        break;

      case "Sair":
        console.log("Até mais!")
        return
    }
  }
}

start()
