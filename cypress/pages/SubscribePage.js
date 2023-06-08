class SubscribePage{
  getSubscribeField(){
    return cy.get('#newsletter');
  }
  getSubscribeBtn(){
    return cy.get('button').contains("Subscribe");
  }

}

export default new SubscribePage();