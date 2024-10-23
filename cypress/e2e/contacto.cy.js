describe("Pruebas de la sección de contacto", () => {
    beforeEach(() => {
        cy.visit("/contacto"); // Ruta de la página de contacto
    });

    it("Debe enviar el formulario correctamente", () => {
        cy.get('input[name="name"]').type("John Doe");
        cy.get('input[name="email"]').type("john.doe@example.com");
        cy.get('textarea[name="message"]').type(
            "Este es un mensaje de prueba."
        );
        cy.get('button[type="submit"]').click();
        cy.contains("¡Mensaje enviado con éxito!");
    });

    it("Debería mostrar errores de validación si los campos están vacíos", () => {
        cy.get('button[type="submit"]').click();
        cy.contains("El nombre es obligatorio");
        cy.contains("El correo es obligatorio");
        cy.contains("El mensaje es obligatorio");
    });

    it("Debería mostrar un error de validación para un correo electrónico no válido", () => {
        cy.get('input[name="email"]').type("invalidemail");
        cy.get('button[type="submit"]').click();
        cy.contains("Correo electrónico no válido");
    });
});
