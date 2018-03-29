var Nightmare = require("nightmare");
var expect = require("chai").expect;
describe("Renter Search", function() {
  // The default tests in mocha is 2 seconds.
  // Extending it to 30 seconds to have time to load the pages
  this.timeout(30000);
  it("should send user to the renter page", function(done) {
    // ID for the login button.
    Nightmare({ show: true })
      .goto("https://rec-rentals.herokuapp.com")
      // Click the Renter link
      .click("a[href='/renter']")
      // Evaluate the title
      .evaluate(function() {
        return document.title;
      })
      // Asset the title is as expected
      .then(function(title) {
        expect(title).to.equal("Rec-Rentals | Renter");
        done();
      });
  });
  it("should present a form asking a user what recreation equipment they'd like to rent", function(done) {
    new Nightmare({ show: true })
      .goto("https://rec-rentals.herokuapp.com/renter")
      // Enter search item.
      .type("#itemSearch", "SearchItem")
      // Enter location.
      .type("#locationSearch", "LocationSearch")
      // Click the login button
      .click("#submit")
      // Evaluate the following selector
      .evaluate(function() {
        // Return the items available to rent
        return document.querySelector("a[href='/renter']");
      })
      .then(function(link) {
        expect(link).to.not.equal(undefined);
        done();
      });
  });
  it("should throw an error for fun", function() {
    throw new Error("Failed on purpose, just to make the Mocha output more interesting.");
  // });
});