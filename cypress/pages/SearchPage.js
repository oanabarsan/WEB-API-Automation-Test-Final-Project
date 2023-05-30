class SearchPage{
  getSearchField(){
    return  cy.get("#search");
  }
}

export default new SearchPage();