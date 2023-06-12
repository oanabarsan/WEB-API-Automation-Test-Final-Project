class ShoppingCartPage{
  getCheckoutBtn(){
    return cy.get('button').contains('Proceed to Checkout');
  }

  getQtyField(){
    return cy.get("input[data-role='cart-item-qty']");
  }

  getUpdatedCartBtn(){
    return cy.get("button").contains("Update Shopping Cart");
  }

}

export default new ShoppingCartPage();