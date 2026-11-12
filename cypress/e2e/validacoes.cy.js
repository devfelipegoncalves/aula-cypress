describe('Validações do cadastro', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('orienta quando o nome tem menos de 3 caracteres', () => {
    cy.get('[data-cy="nome"]').type('Al');
    cy.get('[data-cy="enviar"]').click();

    cy.get('[data-cy="mensagem"]').should('have.text', 'Informe um nome com pelo menos 3 caracteres.');
    cy.get('[data-cy="lista"] li').should('not.exist');
  });

  it('recusa uma data futura', () => {
    cy.get('[data-cy="nome"]').type('Ana Souza');
    cy.get('[data-cy="nascimento"]').type('2099-01-01');
    cy.get('[data-cy="enviar"]').click();

    cy.get('[data-cy="mensagem"]').should('have.text', 'Informe uma data de nascimento válida, até hoje.');
  });

  it('recusa telefone com poucos dígitos', () => {
    cy.get('[data-cy="nome"]').type('Ana Souza');
    cy.get('[data-cy="nascimento"]').type('2000-05-15');
    cy.get('[data-cy="email"]').type('ana.souza@example.com');
    cy.get('[data-cy="telefone"]').type('1234567');
    cy.get('[data-cy="enviar"]').click();

    cy.get('[data-cy="mensagem"]').should('have.text', 'Informe um telefone com 8 a 15 dígitos.');
  });

  it('limpa estado e cidade ao trocar o país', () => {
    cy.get('[data-cy="pais"]').select('Brasil');
    cy.get('[data-cy="estado"]').select('Goiás');
    cy.get('[data-cy="cidade"]').select('Goiânia');

    cy.get('[data-cy="pais"]').select('Portugal');

    cy.get('[data-cy="estado"]').should('have.value', '');
    cy.get('[data-cy="cidade"]').should('have.value', '').and('be.disabled');
  });
});
