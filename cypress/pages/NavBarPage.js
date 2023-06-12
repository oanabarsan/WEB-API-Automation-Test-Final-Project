class NavBarPage{
  getSaleLink(){
    return  cy.get('a[href="https://magento.softwaretestingboard.com/sale.html"]').contains("Sale");
  }

  getMenLink(){
    return cy.get('a[href="https://magento.softwaretestingboard.com/men.html"] ').contains("Men");
  }
}

export default new NavBarPage();