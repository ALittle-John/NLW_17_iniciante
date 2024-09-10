// import { select } from "inquirer/prompts";
// Não encontra "/prompts".

const {select} = require("@inquirer/prompts")

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
        console.log("Então vamos começar o cadastro")
        break;

      case "Sair":
        console.log("Ok, saindo")
        return
    }
  }
}

start()
