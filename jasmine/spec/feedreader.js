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

    /* TODO: Write a test that loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */

    describe('Defined and populated URLs', function(){
      it('each feed should have a URL that is not empty', function(){
        //make sure that each feed has a url and that the url is not blank
        for(var counter=0; counter <allFeeds.length; counter++){
          expect(allFeeds[counter].url).toBeDefined();
          expect(allFeeds[counter].url).not.toBe("");
        }
      });
    });

    /* TODO: Write a test that loops through each feed
    * in the allFeeds object and ensures it has a name defined
    * and that the name is not empty.
    */

    describe('Defined and populated feed names', function(){
      it('each feed should have a name that is not empty', function(){
        // make sure that each feed has a name and it is not blank
        for(var counter=0; counter <allFeeds.length; counter++){
          expect(allFeeds[counter].name).toBeDefined();
          expect(allFeeds[counter].name).not.toBe("");
        }
      });
    });
  });

  /* TODO: Write a new test suite named "The menu" */

  describe('The menu', function(){

    /* TODO: Write a test that ensures the menu element is
    * hidden by default. You'll have to analyze the HTML and
    * the CSS to determine how we're performing the
    * hiding/showing of the menu element.
    */

    it('should be hidden by default', function(){
      //make sure that the body.class is set to menu-hidden
      expect($('body').attr('class')).toBe('menu-hidden');
    });

    /* TODO: Write a test that ensures the menu changes
    * visibility when the menu icon is clicked. This test
    * should have two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */

    it('should toggle display / hidden when menu icon is clicked', function(){
      // make sure that each click toggles the body class between menu-hidden and blank
      var classState = $('body').attr('class');
      $('.menu-icon-link').trigger('click');
      expect($('body').attr('class')).not.toBe(classState);
      $('.menu-icon-link').trigger('click');
      expect($('body').attr('class')).toBe(classState);
    });
  });

  /* TODO: Write a new test suite named "Initial Entries" */
  // run the loadFeed function with the first 0th feed
  // use Jasmine done to cause app to wait on the the asynchronous request completion

  describe('Initial Entries', function(){
    beforeEach(function(done){
      loadFeed(0, done);
    });

    /* TODO: Write a test that ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    * Remember, loadFeed() is asynchronous so this test will require
    * the use of Jasmine's beforeEach and asynchronous done() function.
    */

    it('should verify that article.entry is poplulated', function(done){
      // make sure that the article is populated
      var articleEntrySize = $('article.entry').size();
      expect(articleEntrySize).toBeGreaterThan(0);
      done();
    });
  });

  /* TODO: Write a new test suite named "New Feed Selection"*/

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

    /* TODO: Write a test that ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    * Remember, loadFeed() is asynchronous.
    */

    it('should verify that the header-title changes when a menu item is clicked to load a new feed',
    // get the new header title and article title from the new feed
    function(done){
      var secondHeaderTitle = $('.header-title').html();
      expect(firstHeaderTitle).not.toBe(secondHeaderTitle);
      done();
    });

    it('article titles in the new feed should be different than the previous feed.', function(done){
      var secondArticleTitle = $('article.entry h2:first-child').html();
      expect(firstArticleTitle).not.toBe(secondArticleTitle);
      done();
    });
  });
}());
