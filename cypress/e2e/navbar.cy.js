describe("Pruebas de la sección navbar", () => {
    beforeEach(() => {
        cy.visit("");
    });

    it("Debe de redirigir a inicio", () => {
        cy.get("a").contains("Inicio").click();
        cy.url().should('include', '/');
    });

    it("Debe de redirigir a productos", () => {
        cy.get("a").contains("Productos").click();
        cy.url().should('include', '/productos');
    });

    it("Debe de redirigir a reservas", () => {
        cy.get("a").contains("Reservas").click();
        cy.url().should('include', '/reservas');
    });

    it("Debe de redirigir a contacto", () => {
        cy.get("a").contains("Contacto").click();
        cy.url().should('include', '/contacto');
    });

    it("Debe de redirigir a incio de sesión", () => {
        cy.get("a").contains("Iniciar Sesión").click();
        cy.url().should('include', '/login');
    });
});
