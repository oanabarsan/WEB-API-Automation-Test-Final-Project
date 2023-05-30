class BrassAndTanksPage{
  getFirstProduct(){
    return cy.get('li.item.product.product-item:nth-child(1)');
  }
  getProductSize(){
    return cy.get('#option-label-size-143-item-166');
  }

  getProductColor(){
    return cy.get('#option-label-color-93-item-57');
  }

  getProductQuantity(){
    return cy.get('input[type="number"]');
  }

  getAddToCartBtn(){
    return cy.get('#product-addtocart-button');
  }
}

export default new BrassAndTanksPage();