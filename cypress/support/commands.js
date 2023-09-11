// Arquivo que contem os comandos personalizados para evitar a duplicação de código

Cypress.Commands.add('fillFieldAndValidate', (selector, content) => {
    cy.get(selector).should('be.visible').type(content, { delay: 0}).should('have.value', content);
});
