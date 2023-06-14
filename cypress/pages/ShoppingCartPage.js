class ShoppingCartPage{

  getQtyField(){
    return cy.get("input[data-role='cart-item-qty']");
  }

  getUpdatedCartBtn(){
    return cy.get("button").contains("Update Shopping Cart");
  }

  getCheckoutBtn(){
    return cy.get('button').contains('Proceed to Checkout');
  }

}

export default new ShoppingCartPage();