class NavBarPage{
  getSaleLink(){
    return  cy.get('a[href="https://magento.softwaretestingboard.com/sale.html"]').contains("Sale");
  }
}

export default new NavBarPage();