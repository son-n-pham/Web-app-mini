import * as model from './model.js';
import contentView from './views/contentView.js';

export const loadContent = function (contentData) {
  // Load dataset from the button to state
  model.updateContent(contentData);
  console.log(model.state);

  // Render new content to content DIV
  contentView.render(model.state.temporaryContent);
};

const init = function () {
  contentView.addHandlerClick(loadContent);
};

init();
