let routes = {};
const appContent = document.getElementById('appContent');

function getTemplateByPath(path) {
  const templateId = routes[path].id ?? 'notFountTemplate';
  return document.getElementById(templateId);
}

function cloneTemplate(path) {
  const template = getTemplateByPath(path);
  return template.content.cloneNode(true);
}

function render(path) {
  const fragment = cloneTemplate(path);
  setup(fragment, routes[path].setup);
  appContent.replaceChildren(fragment);
}

function setup(fragment, callback) {
  callback(fragment);
}

function navigate(path) {
  history.pushState({}, '', path);
  render(path);
}

function addRoutes(path, templateId, setup) {
  if (Object.keys(routes).includes(path)) {
    return;
  }

  routes[path] = { id: templateId, setup: setup };
}

export default { render, navigate, addRoutes };
