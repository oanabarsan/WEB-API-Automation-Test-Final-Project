class SaleCategoryMenuPage{
  getBrasAndTanksLink(){
    return cy.get('a[href="https://magento.softwaretestingboard.com/women/tops-women/tanks-women.html"]').contains("Bras & Tanks");
  }

}

export default new SaleCategoryMenuPage();