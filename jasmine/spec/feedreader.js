/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/

$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */

  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
    * allFeeds variable has been defined and that it is not
    * empty. Experiment with this before you get started on
    * the rest of this project. What happens when you change
    * allFeeds in app.js to be an empty array and refresh the
    * page?
    */

    it('are defined', function() {
      // make sure allFeeds exists
      expect(allFeeds).toBeDefined();
      //make sure allFeeds is populated
      expect(allFeeds.length).not.toBe(0);
    });

    /* Loop through each feed in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */


    describe('Defined and populated URLs', function(){
      it('each feed should have a URL that is not empty', function(){
        //make sure that each feed has a url and that the url is not blank
        for(var counter=0; counter <allFeeds.length; counter++){
          expect(allFeeds[counter].url).toBeDefined();
          expect(allFeeds[counter].url).not.toBe('');
        }
      });
    });

    /* Loop through each feed in the allFeeds object and ensure it has a name defined
    * and that the name is not empty.
    */

    describe('Defined and populated feed names', function(){
      it('each feed should have a name that is not empty', function(){
        // make sure that each feed has a name and it is not blank
        for(var counter=0; counter <allFeeds.length; counter++){
          expect(allFeeds[counter].name).toBeDefined();
          expect(allFeeds[counter].name).not.toBe('');
        }
      });
    });
  });



  describe('The menu', function(){

    // Ensure the menu element is hidden by default.

    it('should be hidden by default', function(){
      //make sure that the body.class contains menu-hidden class
      expect($('body').hasClass('menu-hidden')).toBeTruthy();
    });

    /* Ensures the menu changes visibility when the menu icon is clicked.
    * This test has two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */

    it('should toggle display / hidden when menu icon is clicked', function(){
      // make sure that each click toggles the presence of body menu-hidden class
      var classState = $('body').hasClass('menu-hidden');

      $('.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).not.toBe(classState);
      $('.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(classState);
    });
  });

  // run the loadFeed function with the first 0th feed
  // use Jasmine done to cause app to wait on the the asynchronous request completion

  describe('Initial Entries', function(){
    beforeEach(function(done){
      loadFeed(0, done);
    });

    /* Eensure when the loadFeed function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    */

    it('should verify that article.entry is poplulated', function(){
      // make sure that the article is populated
      var articleEntrySize = $('article.entry').size();
      expect(articleEntrySize).toBeGreaterThan(0);
    });
  });


  describe('New Feed Selection', function(){
    // declare these variables outside the beforeEach and it functions to allow all it functions to have access to them
    var firstHeaderTitle,
        firstArticleTitle;

    beforeEach(function(done){
      loadFeed(0, function(){
        // populate the first header title and article title from feed 0
        firstHeaderTitle = $('.header-title').html();
        firstArticleTitle = $('article h2:first-child').html();
        // load feed 2
        loadFeed(2, function(){
          done();
        });
      });
    });

    // Ensure when a new feed is loaded by the loadFeed function that the content actually changes.


    it('should verify that the header-title changes when a menu item is clicked to load a new feed',
    // get the new header title and article title from the new feed
    function(){
      var secondHeaderTitle = $('.header-title').html();
      expect(firstHeaderTitle).not.toBe(secondHeaderTitle);
    });

    it('article titles in the new feed should be different than the previous feed.', function(){
      var secondArticleTitle = $('article.entry h2:first-child').html();
      expect(firstArticleTitle).not.toBe(secondArticleTitle);
    });
  });
}());
