/// <reference types="cypress" />
///<reference types="cypress-iframe" /> 
import checkoutPage from "../pom/checkoutPage";
import CheckoutPage from "../pom/checkoutPage";
import navigation from "../pom/navigation"
import ProductDetailPage from "../pom/productDetailPage";


describe('Iterate over elements', () => {

    beforeEach("Visit Product Page", ()=>{
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
            })
        navigation.toProductDetailsPage();
    }) 
    it('Verify that prices differ correctly between the subscription and one-off purchase options.', () => {
        ProductDetailPage.assertions.pageHeading('Power Shampoo');
        ProductDetailPage.assertions.subscriptionPlan(2)
        ProductDetailPage.assertions.productTotalPrice()
    })
    
    it('Verify that prices differ correctly between the subscription and one-off purchase options.', () => {
        ProductDetailPage.click.addToCart();
        checkoutPage.assertion.orderSummary();
        checkoutPage.action.fillInRegisterForm("Parita", "Patel", "07587403912", "30/03/1989");
        checkoutPage.click.submitForm();
        checkoutPage.assertion.accountCreated();
        checkoutPage.action.completeShipping();
        checkoutPage.assertion.addressForm();
        checkoutPage.click.continuepayment();
        checkoutPage.action.selectCreditCard();
        checkoutPage.assertion.orderConfirmation()
    })



    
})