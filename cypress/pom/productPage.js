const selectors = {
  pageHeading: '[data-qa="pageTitle"]',
  subscriptionPlan : '.Styles__Wrapper-sc-417d53d7-0.ljKmqh li.Styles__Selector-sc-f56d912a-0',
  subscriptionPrice: '.Styles__Subtitle-sc-f56d912a-8',
  totalPrice: '[data-qa="pagePrice"] strong'
};
class ProductPage {
    click = {

    };
    
    actions = {
    };
    assertions = {
        pageHeading(text) {
            const pageHeading = selectors.pageHeading;
            cy.get(pageHeading).invoke('text').then((pageHeadingText) => {
                expect(pageHeadingText).to.eq(text)
            })
        },

        subscriptionPlan(number) {
            const subscriptionPlan = selectors.subscriptionPlan;
            cy.get(subscriptionPlan).should('have.length', number);
        },
        productTotalPrice(){
            const subscriptionPrice = selectors.subscriptionPrice;
            const totalPrice = selectors.totalPrice;
            cy.get(subscriptionPrice).each((subscriptionPriceText,index) => {
                cy.wrap(subscriptionPriceText).then(text =>{
                    const subscrictionPrice  = text
                    cy.get(subscriptionPrice+`:eq(${index})`).click()
                    cy.get(totalPrice).invoke('text').then(price =>{
                    expect(subscrictionPrice).contain(price)
                    })
                })

                
            })

          }
    };


    

}

export default new ProductPage();