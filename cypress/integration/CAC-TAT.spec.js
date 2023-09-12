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

    Cypress._.times(3, function() {
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
        cy.clock(); 
        cy.get('.button').click();
        cy.get('.error').should('be.visible');
        cy.tick(3000);
        cy.get('.error').should('not.be.visible');
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

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() { 
        cy.get('a').should('have.attr', 'target', '_blank');
    });

    it('testa a página da política de privacidade de forma independente', function() { 
        cy.visit('./src/privacy.html');
        cy.contains('#title', 'CAC TAT - Política de privacidad').should('be.visible');
    });

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    });

    it('faz uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').
        should(function(response) {
            const { status, statusText, body } = response;
            expect(status).to.equal(200);
            expect(statusText).to.equal('OK');
            expect(body).to.include('CAC TAT');
        });
    });

    it('encontra e exibe o gato escondido', function() {
        cy.get('#cat')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .invoke('hide')
            .should('not.be.visible')
    })
});
  
