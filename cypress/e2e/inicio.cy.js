describe('Pruebas de la sección de inicion', () => {
    
    beforeEach(() => {
        cy.visit('');
    });

    it('Debe mostrar la información de inicio', () => {
        cy.get('div').should('be.visible');
        cy.get('a').contains('Explora Nuestros Productos').should('be.visible');
    });

    it('Debe redirigir a la seccion de productos', () => {
        cy.get('a').contains('Explora Nuestros Productos').click();
        cy.url().should('include', '/productos');
    });
});
