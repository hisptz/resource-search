import { ResourceBrowserPage } from './app.po';

describe('resource-browser App', function() {
  let page: ResourceBrowserPage;

  beforeEach(() => {
    page = new ResourceBrowserPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
