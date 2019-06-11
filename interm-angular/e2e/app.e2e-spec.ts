/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for interm-angular', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be interm-angular', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('interm-angular');
    })
  });

  it('network-name should be intermm@0.0.9',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('intermm@0.0.9.bna');
    });
  });

  it('navbar-brand should be interm-angular',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('interm-angular');
    });
  });

  
    it('Container component should be loadable',() => {
      page.navigateTo('/Container');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Container');
      });
    });

    it('Container table should have 7 columns',() => {
      page.navigateTo('/Container');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('Truck component should be loadable',() => {
      page.navigateTo('/Truck');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Truck');
      });
    });

    it('Truck table should have 5 columns',() => {
      page.navigateTo('/Truck');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('ACMENetworkAdmin component should be loadable',() => {
      page.navigateTo('/ACMENetworkAdmin');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ACMENetworkAdmin');
      });
    });

    it('ACMENetworkAdmin table should have 3 columns',() => {
      page.navigateTo('/ACMENetworkAdmin');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('ACMEPersonnel component should be loadable',() => {
      page.navigateTo('/ACMEPersonnel');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ACMEPersonnel');
      });
    });

    it('ACMEPersonnel table should have 4 columns',() => {
      page.navigateTo('/ACMEPersonnel');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('B2BPartner component should be loadable',() => {
      page.navigateTo('/B2BPartner');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('B2BPartner');
      });
    });

    it('B2BPartner table should have 3 columns',() => {
      page.navigateTo('/B2BPartner');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('CreateContainer component should be loadable',() => {
      page.navigateTo('/CreateContainer');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateContainer');
      });
    });
  
    it('AssignTruck component should be loadable',() => {
      page.navigateTo('/AssignTruck');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AssignTruck');
      });
    });
  
    it('ClearContainer component should be loadable',() => {
      page.navigateTo('/ClearContainer');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ClearContainer');
      });
    });
  
    it('LoadContainer component should be loadable',() => {
      page.navigateTo('/LoadContainer');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('LoadContainer');
      });
    });
  
    it('addTruck component should be loadable',() => {
      page.navigateTo('/addTruck');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('addTruck');
      });
    });
  
    it('getContainer component should be loadable',() => {
      page.navigateTo('/getContainer');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('getContainer');
      });
    });
  

});