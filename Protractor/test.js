
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
    it('should be able to go forward and backward in months', function() {
        //element(by.linkText('Calendar View')).click();
        element(by.id('previous')).click();
        browser.sleep(1000);
        element(by.id('next')).click();
        browser.sleep(1000);
        //element(by.id('event-indicator')).click();
        //browser.sleep(1000);

    });

    // working
    it('should be able to see list view and search for contracts', function() {
        element(by.linkText('List View')).click();
        element(by.model('searchText')).sendKeys('Jacob');
        element(by.model('searchText')).clear();
        element(by.model('searchText')).sendKeys('Contract');
        browser.sleep(2000);
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
        element(by.model('StartDate')).sendKeys('3/28/2015');
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
        //expect(element(by.model('StartDate')).getAttribute('value')).toEqual('11/07/2009');
        expect(element(by.model('ntp')).getAttribute('value')).toEqual('on');
        expect(element(by.model('notes')).getAttribute('value')).toEqual('Nothing much to say!');

        element(by.id('btnSubmit')).click();
        browser.ignoreSynchronization = true;
        browser.sleep(3000);
    });

    // not working
    it('should be able to update contracts', function() {

        element(by.id('list')).click();
        element(by.model('contract.name')).clear();
        element(by.model('contract.name')).sendKeys('update');

        element(by.model('contract.tcsiteID')).clear();
        element(by.model('contract.tcsiteID')).sendKeys('546');

        element(by.model('contract.longit')).clear();
        element(by.model('contract.longit')).sendKeys('30');

        element(by.model('contract.tositeID')).clear();
        element(by.model('contract.tositeID')).sendKeys('77');
        element(by.model('contract.StartDate')).sendKeys('3/29/2015');

        element(by.id('update')).click();
        browser.ignoreSynchronization = true;
        browser.sleep(2000);

    });

    // working
    it('should be able to delete contracts', function() {
        element(by.id('delete')).click();
        browser.ignoreSynchronization = true;
        browser.sleep(2000);
    });

    // working
    it('should be able to search users', function() {
        element(by.linkText('Area Communications')).click();
        element(by.linkText('Users')).click();
        element(by.model('searchText')).sendKeys('update');
        element(by.model('searchText')).clear();
        element(by.model('searchText')).sendKeys('Sangeetha');
        element(by.model('searchText')).clear();
        browser.sleep(2000);
    });


    //working
    it('should be able to create new users', function() {
        //element(by.linkText('Area Communications')).click();
        //element(by.linkText('Users')).click();
        element(by.id('newUser')).click();

        element(by.model('credentials.firstName')).sendKeys('Sangeetha');
        element(by.model('credentials.lastName')).sendKeys('Matchanickal');
        element(by.model('credentials.email')).sendKeys('test@test.com');
        element(by.model('credentials.username')).sendKeys('usertest');
        element(by.model('credentials.password')).sendKeys('userPassword');

        expect(element(by.model('credentials.firstName')).getAttribute('value')).toEqual('Sangeetha');
        expect(element(by.model('credentials.lastName')).getAttribute('value')).toEqual('Matchanickal');
        expect(element(by.model('credentials.email')).getAttribute('value')).toEqual('test@test.com');
        expect(element(by.model('credentials.username')).getAttribute('value')).toEqual('usertest');
        expect(element(by.model('credentials.password')).getAttribute('value')).toEqual('userPassword');

        element(by.id('saveClose')).click();
        browser.ignoreSynchronization = true;
        browser.sleep(2000);
    });

    // working
    it('should be able to update users', function() {
        element(by.linkText('Area Communications')).click();
        element(by.linkText('Users')).click();
        browser.sleep(2000);
        element(by.id('editUser')).click();

        element(by.model('customer.firstName')).clear();
        element(by.model('customer.firstName')).sendKeys('updateName');

        element(by.model('customer.email')).clear();
        element(by.model('customer.email')).sendKeys('test@test.com');

        element(by.model('customer.username')).clear();
        element(by.model('customer.username')).sendKeys('updateUser');

        element(by.id('editButton')).click();
        browser.sleep(1000);
        //browser.ignoreSynchronization = true;


    });

    // working
    it('should be able to delete users', function() {
        element(by.linkText('Area Communications')).click();
        element(by.linkText('Users')).click();
        browser.sleep(2000);
        element(by.id('delete')).click();
        element(by.linkText('Area Communications')).click();
        element(by.linkText('Users')).click();

        browser.sleep(2000);
    });

    // working
    it('should be able to logout', function() {
        element(by.linkText('admin admin')).click();
        element(by.linkText('Signout')).click();

        browser.sleep(2000);
    });


});