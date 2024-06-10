import card from "./card";

const selectors = {
    //Registration form Locators
    registrationForm: '#CheckoutStep--ACCOUNT',
    accountForm: '#CheckoutStep--ACCOUNT',
    shippingForm: '#CheckoutStep--SHIPPING',
    payment: '#CheckoutStep--PAYMENT',
    firstName: '[name="firstName"]',
    lastName: '[name="lastName"]',
    email: '[name="email"]',
    password: '[name="plainPassword"]',
    phoneNumber: '[name="phoneNumber"]',
    birthDay: '[name="birthday"]',
    acceptPolicy: '.checkbox > .checkbox__label',
    createAccount: '.form--wrapper [data-qa]',
    accountComplete: '[alt="checked"]',

    //Shipping Locators
    postCode: '[data-test="lName"]',
    addressLine1: '[name="shipping-company"]',
    town: '[name="shipping-city"]',
    submittedPostCode: 'input[name="shipping-postcode"]',
    continuePayment: '[data-qa="createAccountBtn"]',

    //payment locators

    creditCardCardNumberIframe: '.adyen-checkout__field--cardNumber .js-iframe',
    creditCardFieldsCardNumber:"[data-fieldtype='encryptedCardNumber']",
    creditCardExpirationDateIframe:'.adyen-checkout__field--expiryDate .js-iframe, .adyen-checkout__card__exp-date__input .js-iframe',
    creditCardFieldsExpirationDate: "[data-fieldtype='encryptedExpiryDate']",
    creditCardSecurityCodeIframe: '.adyen-checkout__card__cvc__input .js-iframe',
    creditCardFieldsSecurityCode: "[data-fieldtype='encryptedSecurityCode']",
    creditCardFieldsCardOwner: "[name='holderName']",
    paynowBtn: '#CheckoutStep--PAYMENT [data-qa]',

    //order Summary 
    orderSummarySection : ".review_CheckoutReviewSummary__6g2S3 div.OrderItem_column_right__details_container__F0NdN",

    //order confirmation
    orderConfirmation: '[data-qa="ThankYouOrderHeader"]'

       
};

class CheckoutPage {

    action = {
        generateRandomEmail() {
            const prefix = 'pparitam';
            const domain = 'gmail.com';
            const randomNumber = Math.floor(Math.random() * 10000); // Generates a random number between 0 and 9999
            const email = `${prefix}+${randomNumber}12@${domain}`;
            return email;
        },

        fillInRegisterForm(firstname, lastname, phone, birthday) {
            const registrationForm = selectors.registrationForm;
            const firstName = selectors.firstName;
            const lastName = selectors.lastName;
            const email = selectors.email;
            const phoneNumber = selectors.phoneNumber;
            const birthDay = selectors.birthDay;
            const password = selectors.password;
            const acceptPolicy = selectors.acceptPolicy;

            cy.wait(1000)
            cy.get(registrationForm).should('be.visible');
            cy.get(firstName).type(firstname);
            cy.get(lastName).type(lastname);
            cy.get(email).type(this.generateRandomEmail());
            cy.get(password).type("menofmanual");
            cy.get(phoneNumber).type(phone);
            cy.get(birthDay).type(birthday);
            cy.get(acceptPolicy + `:eq(0)`).click();
            cy.get(acceptPolicy + `:eq(1)`).click();
        },

        completeShipping() {
            const postCode = selectors.postCode;
            cy.get(postCode).type('N1 7LQ')
            cy.get(postCode).siblings('button').click()
            cy.wait(1000)
            cy.get(postCode).parents('form').find('select').select('0');
        }, 
        
        selectCreditCard() {
               cy.intercept("GET", "**/order-thankyou/**").as('orderConfirmation');
               const creditCardCardNumberIframe = selectors.creditCardCardNumberIframe;
               const creditCardFieldsCardNumber= selectors.creditCardFieldsCardNumber;
               const creditCardExpirationDateIframe= selectors.creditCardExpirationDateIframe;
               const creditCardFieldsExpirationDate= selectors.creditCardFieldsExpirationDate;
               const creditCardSecurityCodeIframe= selectors.creditCardSecurityCodeIframe;
               const creditCardFieldsSecurityCode= selectors.creditCardFieldsSecurityCode;
               const creditCardFieldsCardOwner= selectors.creditCardFieldsCardOwner;
               const paynowBtn= selectors.paynowBtn;
                cy.frameLoaded('.js-iframe[title="Iframe for card number"]')
                cy.get('iframe').invoke('show')//Added as iframe element was not visible
                cy.iframe(creditCardCardNumberIframe).find(creditCardFieldsCardNumber).type(card.master.cardNo, { force: true });
                cy.iframe(creditCardExpirationDateIframe).find(creditCardFieldsExpirationDate).type(card.master.date, { force: true });
                cy.iframe(creditCardSecurityCodeIframe).find(creditCardFieldsSecurityCode).type(card.master.code, { force: true });
                cy.get(creditCardFieldsCardOwner).type(card.master.owner, { force: true });
                cy.get(paynowBtn).should('be.visible',{timeout:10000}).dblclick({ force: true });
          },
        

    };

    click = {
        submitForm() {
            const createAccount = selectors.createAccount;
            cy.get(createAccount).click();
        },

        continuepayment() {
            const continuePayment = selectors.continuePayment;
            cy.get(continuePayment).click();
        }
    };

    assertion = {
        accountCreated() {
            const accountComplete = selectors.accountComplete;
            cy.wait(25000)
            cy.get(accountComplete).should('be.visible', { timeout: 10000 });
        },

        addressForm() {
            const addressLine1 = selectors.addressLine1;
            const town = selectors.town;
            const submittedPostCode = selectors.submittedPostCode;

            cy.get(addressLine1).invoke('val').should('not.be.empty');
            cy.get(town).invoke('val').should('not.be.empty');
            cy.get(submittedPostCode).invoke('val').should('not.be.empty');
        },
        orderSummary() {
            const orderSummarySection = selectors.orderSummarySection;
            cy.get(orderSummarySection).should('be.visible').then((el)=>{
                cy.wrap(el).invoke('text').should('contain', "Power Shampoo")
            })
        },

        orderConfirmation () {
            const orderConfirmation = selectors.orderConfirmation;
            cy.get(orderConfirmation).should('be.visible')
        }
    };

}

export default new CheckoutPage();