// Arquivo que contém os testes da aplicação
// Comando que possibilita habilitar o auto complete para os comandos em cypress
/// <reference types="Cypress" />

// Suite de teste, seu nome e função
describe('Central de Atendimento ao Cliente TAT', function() {
    // Roda antes de todos os testes
    beforeEach(() => {
        // Visita a aplicação local ou a url remotamente
        cy.visit('./src/index.html');
    });

    // Caso de teste, seu nome e função
    it('verifica o título da aplicação', function() {
        // Verifica o title da aplicação, se é exatamente esse descrito no teste
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('preenche os campos obrigatórios e envia o formulário', function() {
        // Teste que utiliza comando customizado para preencher os campos e validar, clica no botão e verifica mensagem
        cy.fillFieldAndValidate('#firstName', 'William');
        cy.fillFieldAndValidate('#lastName', 'Bierhals');
        cy.fillFieldAndValidate('#email', 'william@gmail.com');
        cy.fillFieldAndValidate('#open-text-area', 'Estou com uma dúvida');
        // Pega o botão pela class dele e realiza o click
        cy.get('.button').click();
        // Verifica se a mensagem de sucesso foi exibida
        cy.get('.success').should('be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.fillFieldAndValidate('#firstName', 'William');
        cy.fillFieldAndValidate('#lastName', 'Bierhals');
        cy.fillFieldAndValidate('#email', 'william#gmail.com');
        cy.fillFieldAndValidate('#open-text-area', 'Estou com uma dúvida'); 
        cy.get('.button').click();
        cy.get('.error').should('be.visible');
    });

    it('preenche o campo telefone com uma palavra e permanece vazio', function() { 
        cy.get('#phone').should('be.visible').type('numero', { delay: 0}).should('be.empty');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.fillFieldAndValidate('#firstName', 'William');
        cy.fillFieldAndValidate('#lastName', 'Bierhals');
        cy.fillFieldAndValidate('#email', 'william#gmail.com');
        cy.fillFieldAndValidate('#open-text-area', 'Estou com uma dúvida');  
        cy.get('#phone-checkbox').click();
        cy.get('.button').click();
        cy.get('.error').should('be.visible');
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() { 
        cy.fillFieldAndValidate('#firstName', 'William').clear().should('be.empty');
        cy.fillFieldAndValidate('#lastName', 'Bierhals').clear().should('be.empty');
        cy.fillFieldAndValidate('#email', 'william#gmail.com').clear().should('be.empty');
        cy.fillFieldAndValidate('#open-text-area', 'Estou com uma dúvida').clear().should('be.empty');
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() { 
        cy.get('.button').click();
        cy.get('.error').should('be.visible');
    });
});
  
