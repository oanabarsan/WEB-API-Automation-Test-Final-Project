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

  getCouponCodeField(){
    return cy.get('#coupon_code');
  }

  getApplyCouponLink(){
    return cy.get('#block-discount-heading');
  }

  getApplyCouponBtn(){
    return cy.get("button.action.apply.primary").contains("Apply Discount");
  }

}

export default new ShoppingCartPage();