// import { select } from "inquirer/prompts";
// Não encontra "/prompts".

const {select, input} = require("@inquirer/prompts")

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

const start = async () => {
  while (true) {
    let opcao = await select({
      message: "Menu de atividades >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "Cadastrar"
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

      case "Sair":
        console.log("Ok, saindo")
        return
    }
  }
}

start()
