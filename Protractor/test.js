
/*
The describe and it syntax is from the Jasmine framework. 
browser is a global created by Protractor, which is used for browser-level commands such as navigation with browser.get.*/

//created by Sangeetha Matchanickal
describe('AreaCommunications Project', function() {
  //it('should have a title', function() {
  //    browser.get('http://localhost:3000/');
  //
  //    browser.sleep(2000);
  //
  //});

    // working
    it('should be able to login an Admin', function() {
        browser.get('http://localhost:3000/');
        browser.driver.manage().window().setSize(1280, 1024);
        element(by.model('credentials.username')).sendKeys('testuser');
        element(by.model('credentials.password')).sendKeys('testuser1');
        element(by.id('btnSubmit')).click();
        browser.sleep(2000);
  });

    // working
    it('should be able to see calender view', function() {
        element(by.linkText('Calendar View')).click();
        browser.sleep(1000);
    });

    // working
    it('should be able to create new contracts', function() {
        element(by.linkText('Create Contract')).click();

        element(by.model('name')).sendKeys('Sangeetha');
        element(by.model('tcsiteID')).sendKeys('7');
        element(by.model('address')).sendKeys('11634 SW 34th Street');
        element(by.model('city')).sendKeys('Coral Springs');
        element(by.model('state')).sendKeys('Florida');
        element(by.model('zip')).sendKeys('33065');
        element(by.model('lat')).sendKeys('120');
        element(by.model('longit')).sendKeys('30');
        element(by.model('tositeID')).sendKeys('77');
        element(by.model('StartDate')).sendKeys('11/7/2009');
        element(by.model('ntp')).click();
        element(by.model('notes')).sendKeys('Nothing much to say!');

        expect(element(by.model('name')).getAttribute('value')).toEqual('Sangeetha');
        expect(element(by.model('tcsiteID')).getAttribute('value')).toEqual('7');
        expect(element(by.model('address')).getAttribute('value')).toEqual('11634 SW 34th Street');
        expect(element(by.model('city')).getAttribute('value')).toEqual('Coral Springs');
        expect(element(by.model('state')).getAttribute('value')).toEqual('Florida');
        expect(element(by.model('zip')).getAttribute('value')).toEqual('33065');
        expect(element(by.model('lat')).getAttribute('value')).toEqual('120');
        expect(element(by.model('longit')).getAttribute('value')).toEqual('30');
        expect(element(by.model('tositeID')).getAttribute('value')).toEqual('77');
        expect(element(by.model('StartDate')).getAttribute('value')).toEqual('11/7/2009');
        expect(element(by.model('ntp')).getAttribute('value')).toEqual('on');
        expect(element(by.model('notes')).getAttribute('value')).toEqual('Nothing much to say!');

        element(by.id('btnSubmit')).click();
        browser.sleep(3000);
    });

    //// not working
    //it('should be able to update contracts', function() {
    //    element(by.link('main.calendars')).click();
    //    browser.sleep(4000);
    //});
    //
    //// not working
    //it('should be able to delete contracts', function() {
    //    element(by.link('main.calendars')).click();
    //    browser.sleep(4000);
    //});
    //
    //// not working
    //it('should be able to create users', function() {
    //    element(by.link('main.calendars')).click();
    //    browser.sleep(4000);
    //});
    //
    //// not working
    //it('should be able to update users', function() {
    //    element(by.link('main.calendars')).click();
    //    browser.sleep(4000);
    //});
    //
    //// not working
    //it('should be able to delete users', function() {
    //    element(by.link('main.calendars')).click();
    //    browser.sleep(4000);
    //});
    //

});