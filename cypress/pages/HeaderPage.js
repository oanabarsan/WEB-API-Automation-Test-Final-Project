class HeaderPage{
  getCreateAccountLink(){
    return cy.get(
      "a[href='https://magento.softwaretestingboard.com/customer/account/create/']").contains("Create an Account");
  }
}

export default new HeaderPage();