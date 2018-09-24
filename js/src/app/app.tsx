import { MenuManager } from './MenuManager';

const els = document.getElementsByTagName('menu-editor');
Array.prototype.forEach.call(els, el => {
  const options = { menu_id: el.getAttribute('data-id'), api_url: el.getAttribute('data-url') };
  new MenuManager(el, options);
});
