/// <reference types="cypress" />
import checkoutPage from "../pom/checkoutPage";
import CheckoutPage from "../pom/checkoutPage";
import navigation from "../pom/navigation"
import ProductDetailPage from "../pom/productDetailPage";
//mport user from "../fixtures/users.json";


describe('Iterate over elements', () => {
    before(() => {

    });
    it('Verify that prices differ correctly between the subscription and one-off purchase options.', () => {
        navigation.toProductDetailsPage();
        ProductDetailPage.assertions.pageHeading('Power Shampoo');
        ProductDetailPage.assertions.subscriptionPlan(2)
        ProductDetailPage.assertions.productTotalPrice()
    })
    
    it.only('Verify that prices differ correctly between the subscription and one-off purchase options.', () => {
        navigation.toProductDetailsPage();
        ProductDetailPage.click.addToCart();
        checkoutPage.action.fillInRegisterForm("Parita", "Patel", "07587403912", "30/03/1989");
        checkoutPage.click.submitForm();
        checkoutPage.assertion.accountCreated();

    })


    
})