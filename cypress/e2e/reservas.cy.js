describe("Pruebas de la selección de reservas", () => {

    beforeEach(() => {
        cy.visit("/reservas");
    });

    it("Debe mostrar el formulario de reservas", () => {
        cy.get("form").should("be.visible");
    });

    it("Debe de validar que los campos obligatorios no pueden estar vacios", () => {
        cy.get('button[type="submit"]').click();
        cy.contains("El nombre es obligatorio");
        cy.contains("El correo es obligatorio");
        cy.contains("La fecha es obligatoria");
        cy.contains("Selecciona un servicio");
    });

    it("Debería mostrar un error de validación para un correo electrónico no válido", () => {
        cy.get('input[name="email"]').type("invalidemail");
        cy.get('button[type="submit"]').click();
        cy.contains("Correo electrónico no válido");
    });

    it("Debe permitir escribir una fecha", () => {
        cy.get('[data-testid="date-picker"]').type("30-09-2024");
    });

    it("Debería mostrar un error de validación para la fecha, debe ser mayor a la actual", () => {
        cy.get('[data-testid="date-picker"]').type("30-09-2023");
        cy.get('button[type="submit"]').click();
        cy.contains("La fecha debe ser de hoy o en adelante");
    });

    it("Debe enviar el formulario correctamente", () => {
        cy.get('input[name="name"]').type("John Doe");
        cy.get('input[name="email"]').type("john.doe@example.com");
        cy.get('[data-testid="date-picker"]').type("09-30-2024");
        cy.get('[data-testid="service-select"]').click();
        cy.get('[data-slot="listbox"]').should('be.visible');
        cy.get('[data-slot="listbox"]').find('li').contains('Tour por la Hacienda').click(); 
        cy.get('[data-testid="service-select"]').should("contain.text", "Tour");
        cy.get('input[name="details"]').type("tour");
        cy.get('button[type="submit"]').click();
        cy.contains("Reserva enviada con éxito!");
    });
});
