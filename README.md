# Projeto QA básico com Cypress

Este projeto contém um formulário simples e testes E2E para uma aula introdutória de QA.

## Início rápido

No terminal, dentro desta pasta:

```bash
npm install
npm run aula
```

O comando `npm run aula` inicia o site local e abre o Cypress em modo E2E com o Chrome. O projeto usa apenas Node.js e Cypress, sem framework ou servidor extra.

Para executar os testes sem abrir a interface do Cypress:

```bash
npm run verificar
```

## Estrutura

- `site/`: formulário que será testado.
- `cypress/e2e/cadastro.cy.js`: fluxo principal de cadastro.
- `cypress/e2e/validacoes.cy.js`: cenários de validação.
- `cypress.config.js`: configura o endereço local usado por `cy.visit('/')`.
