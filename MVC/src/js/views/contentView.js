import View from './view.js';

class ContentView extends View {
  _parentElement = document.querySelector('.MVC');
  _errorMessage = 'This is Error message';
  _message = 'This is a Message';

  _generateMarkup() {
    const contentShow = this._parentElement.querySelector('.content');
    return `${this._data}`;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn');

      const additionalText = '--Hello--';

      if (!btn) return;

      const contentShow = this._parentElement.querySelector('.content');

      // Generate contentData
      const contentData = btn.dataset.content
        ? btn.dataset.content
        : `${contentShow.textContent}${additionalText}`;

      contentShow.textContent = contentData;

      // Pass contentData to handler to carry to Controller
      handler(contentData);
    });
  }

  _generateMarkup() {
    return ``;
  }
}

export default new ContentView();
