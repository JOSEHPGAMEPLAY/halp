describe('Pruebas de la sección login', () => {
    beforeEach(() => {
        cy.visit('/login');
    });
    
    it('Deberia mostrar errores de validación si los campos están vacíos', () => {
        cy.get('button[type="submit"]').click();
        cy.contains('El correo es obligatorio');
        cy.contains('La contraseña es obligatoria');
    });

    it("Debería mostrar un error de validación para un correo electrónico no válido", () => {
        cy.get('input[name="email"]').type("invalidemail");
        cy.get('button[type="submit"]').click();
        cy.contains("Correo electrónico no válido");
    });

    it("Debería mostrar un error de validación contraseña mayor de 6 caracteres", () => {
        cy.get('input[name="password"]').type("0123");
        cy.get('button[type="submit"]').click();
        cy.contains("La contraseña debe tener al menos 6 caracteres");
    });

    it("Debería mostrar un error de credenciales incorrectas", () => {
        cy.get('input[name="email"]').type("invalidemai@invalid.com");
        cy.get('input[name="password"]').type("0123456");
        cy.get('button[type="submit"]').click();
        cy.wait(500);
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Error al iniciar sesión. Verifica tus credenciales.')
        });
    });
    
    it("Debería enviarse el formulario", () => {
        cy.get('input[name="email"]').type("jose.kj11@hotmail.com");
        cy.get('input[name="password"]').type("Jose-2005");
        cy.get('button[type="submit"]').click();
        cy.wait(500);
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Inicio de sesión exitoso')
        });
    });

});
