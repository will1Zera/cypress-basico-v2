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
        cy.get('#phone-checkbox').check();
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

    it('seleciona um produto (YouTube) por seu texto', function() { 
        cy.get('#product').select('YouTube').should('have.value', 'youtube');
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', function() { 
        cy.get('#product').select('mentoria').should('have.value', 'mentoria');
    });

    it('seleciona um produto (Blog) por seu índice', function() { 
        cy.get('#product').select(1).should('have.value', 'blog');
    });

    it('seleciona o tipo de atendimento "Feedback', function() { 
        cy.get('input[value="ajuda"]').check().should('have.value', 'ajuda');
    });

    it('marca cada tipo de atendimento', function() { 
        cy.get('input[type="radio"]').should('have.length', 3).
        each(function($radio) {
            cy.wrap($radio).check();
            cy.wrap($radio).should('be.checked');
        });
    });

    it('marca ambos checkboxes, depois desmarca o último', function() { 
        cy.get('#check input[type="checkbox"]').check().last().uncheck().should('not.be.checked');
    });

    it('seleciona um arquivo da pasta fixtures', function() { 
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json').
        then(input => {expect(input[0].files[0].name).to.equal('example.json');});
    });

    it('seleciona um arquivo simulando um drag-and-drop', function() { 
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json', {action:'drag-drop'}).
        then(input => {expect(input[0].files[0].name).to.equal('example.json');});
    });
    
});
  
