// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

  Cypress.Commands.add('fillPaymentForm', (cardNumber, expiryDate, cvv) => {
    cy.get('input[name="cardNumber"]').type(cardNumber);
    cy.get('input[name="expiryDate"]').type(expiryDate);
    cy.get('input[name="cvv"]').type(cvv);
  });

  Cypress.Commands.add('getIframeBody', () => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    cy.wait(1000)
    return cy
    .get('iframe.js-iframe')
    .wait(1000)
    .its('0.contentDocument.body').should('not.empty')
    .then(cy.wrap)
  })

  Cypress.Commands.add(
    "cardAndExpiry",
    (cardNumber) => {
    // Card number iFrame
    cy.get(".adyen-checkout__input-wrapper span")
       .iframe("[title='Iframe for card number']")
       .find('input:eq(0)')
       .should("be.visible")
       .type(cardNumber);
     // Expiry date is not an iframe
    //cy.get("[data-cy=expiryDate]").type(expiry);
   }
  );


  Cypress.Commands.add(
    'iframeLoaded',
    { prevSubject: 'element' },
    ($iframe) => {
      const contentWindow = $iframe.prop('contentWindow')
      return new Promise(resolve => {
        if (
          contentWindow &&
          contentWindow.document.readyState === 'complete'
        ) {
          resolve(contentWindow)
        } else {
          $iframe.on('load', () => {
            resolve(contentWindow)
          })
        }
      })
    })



Cypress.Commands.add(
  'getInDocument',
  {prevSubject: 'document'},
  (document, selector) => Cypress.$(selector, document)
);

Cypress.Commands.add(
  'getWithinIframe',
  (targetElement) => cy.get('iframe').iframeLoaded().its('document').getInDocument(targetElement)
);
Cypress.Commands.add('getIframe', (iframe) => {
  return cy.get(iframe)
           .iframeLoaded()
           .its('document')
           .should('be.visible')
          .then(cy.wrap);
})