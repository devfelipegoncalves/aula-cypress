describe('Cadastro de participantes', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('cadastra uma participante com dados válidos', () => {
    cy.get('[data-cy="nome"]').type('Ana Souza');
    cy.get('[data-cy="nascimento"]').type('2000-05-15');
    cy.get('[data-cy="email"]').type('ana.souza@example.com');
    cy.get('[data-cy="telefone"]').type('(62) 99999-1234');
    cy.get('[data-cy="pais"]').select('Brasil');
    cy.get('[data-cy="estado"]').select('Goiás');
    cy.get('[data-cy="cidade"]').select('Goiânia');
    cy.get('[data-cy="enviar"]').click();

    cy.get('[data-cy="mensagem"]').should('have.text', 'Cadastro realizado com sucesso.');
    cy.get('[data-cy="lista"] li')
      .should('have.length', 1)
      .and('contain.text', 'Ana Souza')
      .and('contain.text', 'Goiânia, Goiás, Brasil');
  });
});
