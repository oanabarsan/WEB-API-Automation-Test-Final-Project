class RegisterPage{
  getFirstName(){
    return cy.get("#firstname");
  }

  getLastName(){
    return cy.get("#lastname");
  }

  getEmail(){
    return cy.get("#email_address");
  }

  getPassword(){
    return cy.get("#password");
  }

  getPassConfirmation(){
    return cy.get("#password-confirmation");
  }

  getCreateAccountBtn(){
    return cy.get("button");
  }

}

export default new RegisterPage();