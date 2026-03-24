let routes = {};
const appContent = document.getElementById('appContent');

function getTemplateByPath(path) {
  const templateId = routes[path] ?? 'notFountTemplate';
  return document.getElementById(templateId);
}

function cloneTemplate(path) {
  const template = getTemplateByPath(path);
  return template.content.cloneNode(true);
}

function render(path, callback) {
  const fragment = cloneTemplate(path);
  setup(callback);
  appContent.replaceChildren(fragment);
}

function setup(callback) {
  callback();
}

function navigate(path) {
  history.pushState({}, '', path);
  render(path);
}

function addRoutes(path, templateId) {
  if (Object.keys(routes).includes(path)) {
    return;
  }

  routes[path] = templateId;
  console.log(routes);
}

export default { render, navigate, addRoutes };
