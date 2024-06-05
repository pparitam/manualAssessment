/// <reference types="cypress" />
import navigation from "../pom/navigation"
import productPage from "../pom/productPage";
describe('Iterate over elements', () => {
    it('Verify that prices differ correctly between the subscription and one-off purchase options.', () => {
        navigation.toProductDetailsPage();
        productPage.assertions.pageHeading('Power Shampoo');
        productPage.assertions.subscriptionPlan(2)
        productPage.assertions.productTotalPrice()
    })

    

})