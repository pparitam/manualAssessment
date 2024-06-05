class Navigation {
    //Navigates to Homepage
    toHomePage() {
        cy.visit('/');
        // Check if the cookie banner is visible
        cy.get('div#CookieBanner').then($banner => {
            // If the banner is visible, click the "I accept" button
            if ($banner.is(':visible')) {
                cy.get('#CookieBanner button').click();
            } else {
                cy.log('Cookie banner is not visible');
            }
        })
    }
     

    //Navigates to Product detailed page
    toProductDetailsPage() {
        cy.intercept('GET', '/hair-loss/power-shampoo').as('productPage');
        this.toHomePage();
        cy.visit('/hair-loss/power-shampoo');
        //check page loading 
        cy.wait('@productPage')
        //scroll to the top of the page
        cy.scrollTo('top');
      }
}

export default  new Navigation();