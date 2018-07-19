const creds = require("./creds");

describe('create attribute', function() {
    var addAttr = element(by.css("h1>a"));
    var newAttr = element(by.css("h1[class*=header_root]"));
    var newRootItem = element(by.css("form[class*='new-list-item-modal-form_root'] h1[class*='header_root']"));
    var matchCount = element(by.css("div[class*='pagination_pageSizeControl'] span"));

    beforeEach(function() {
        browser.ignoreSynchronization = true;
      });

    it('should login to home page', function() {
        browser.ignoreSynchronization = true;
        browser.get('http://localhost:7000/');
        browser.element(by.css("#userName")).clear();
        browser.element(by.css("#userName")).sendKeys(creds.userName);
        browser.element(By.css("#firstName")).clear();
        browser.element(By.xpath(".//input[@id='firstName']")).sendKeys(creds.firstName);
        browser.element(By.css("#lastName")).clear();
        browser.element(By.css("#lastName")).sendKeys(creds.lastName);
        browser.element(By.css("#email")).clear();
        browser.element(By.css("#email")).sendKeys(creds.email);
        browser.element(By.css("#role")).sendKeys(creds.role);
        browser.element(By.xpath(".//span[text()='Sign in']")).click();
        browser.sleep(3000);
    });
    
    it('should add details for attribute', function() {
        browser.element(by.css("div[class*='dropdown-menu_header']")).click();
        browser.element(by.xpath(".//a[@href='/admin/attributes']")).click();
        browser.sleep(1000);
        expect(addAttr.getText()).toEqual("Add Attribute");
        browser.element(by.xpath(".//a[@href='/admin/attributes/new']")).click();
        browser.sleep(1000);
        expect(newAttr.getText()).toEqual("New Attribute");
        browser.element(By.css("div[class*='with-field_root'] input[class*='text-input_input']")).sendKeys("!name_for_protractor_ak_module");
        browser.element(By.css("textarea[class*='text-input_textarea']")).sendKeys("description_for_protractor_ak_module");
        browser.element(By.xpath(".//span[text()='Please select...']")).click();
        browser.element(By.xpath(".//div[text()='List']")).click();
        browser.element(By.xpath(".//span[text()='Use for Filtering']")).click();
    });
  
    it('should add root item for attribute', function(){
        browser.element(By.xpath(".//button[text()='Add Root Item']")).click();
        browser.sleep(1000);
        expect(newRootItem.getText()).toEqual("Add Item");
        browser.element(By.css("div[class*='new-list-item-modal-form_input'] input[class*='text-input_input']")).sendKeys("new_test_root");
        browser.element(By.xpath(".//button[text()='Add']")).click();
        browser.sleep(1000);
        browser.element(By.css("i[data-qa-id='mode-edit']")).click();
        browser.sleep(1000);
        browser.element(By.css("div[class*='new-list-item-modal-form_input'] input[class*='text-input_input']")).clear();
        browser.element(By.css("div[class*='new-list-item-modal-form_input'] input[class*='text-input_input']")).sendKeys("edit_test_root");
        browser.element(By.xpath(".//button[text()='Save']")).click();
        browser.sleep(1000);
    });

    it('should create and remove attribute', function() {
        browser.element(By.xpath(".//button[text()='Create']")).click();
        browser.sleep(3000);
        expect(matchCount.getText()).toEqual("10");
        browser.element(By.css("div[class*='pagination_pageSizeControl']>div")).click();
        browser.element(By.xpath(".//div[contains(@class, 'pagination_pageSizeControl')]//div[text()='20']")).click();
        browser.findElement(By.xpath(".//td[text()='!name_for_protractor_ak_module']/..//i[@data-qa-id='delete']")).click();
        browser.findElement(By.xpath(".//button[text()='Yes']")).click();
        browser.sleep(3000);
        expect(matchCount.getText()).toEqual("20");
    });
});