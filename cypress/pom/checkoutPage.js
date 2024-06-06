const selectors = {
    registrationForm: '#CheckoutStep--ACCOUNT',
    accountForm : '#CheckoutStep--ACCOUNT',
    shippingForm : '#CheckoutStep--SHIPPING',
    payment: '#CheckoutStep--PAYMENT',
    firstName: '[name="firstName"]',
    lastName: '[name="lastName"]',
    email: '[name="email"]',
    password: '[name="plainPassword"]',
    phoneNumber: '[name="phoneNumber"]',
    birthDay: '[name="birthday"]',
    acceptPolicy : '.checkbox > .checkbox__label',
   // subscribedToNewsletter: '[name="subscribedToNewsletter"]',
    createAccount: '.form--wrapper [data-qa]',
    accountComplete: '[alt="checked"]'

};

class CheckoutPage {
    
    action = {
        generateRandomEmail() {
            const prefix = 'pparitam';
            const domain = 'gmail.com';
            const randomNumber = Math.floor(Math.random() * 10000); // Generates a random number between 0 and 9999
            const email = `${prefix}+${randomNumber}@${domain}`;
            return email;
          },
        fillInRegisterForm (firstname, lastname, phone, birthday){
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
            cy.get(acceptPolicy+`:eq(0)`).click();
            cy.get(acceptPolicy+`:eq(1)`).click();
        },
    };
    click = {
        submitForm(){
            const  createAccount = selectors.createAccount;
            cy.get(createAccount).click();
        }
    };
    assertion = {
        accountCreated (){
            const accountComplete = selectors.accountComplete;
            cy.wait(20000)
            cy.get(accountComplete).should('be.visible', {timeout:10000});
        }
    };

}

export default new CheckoutPage();