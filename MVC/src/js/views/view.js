export default class View {
  _data;

  render(data) {
    this._data = data;

    // Use _data to update markup when _generateMarkup use _data
    const markup = this._generateMarkup();
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    // Create newDOM from newMarkup in memory
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // Select all elements in newDOM
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    // Select all elements in current this._parentElement DOM
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElements.forEach((newElement, index) => {
      const currentElement = currentElements[index];

      // Update changed TEXT rendered in the browser
      if (
        !newElement.isEqualNode(currentElement) &&
        newElement.firstChild?.nodeValue.trim() !== ''
      )
        currentElement.textContent = newElement.textContent;

      // Update changed TEXT rendered in the browser
      if (!newElement.isEqualNode(currentElement))
        Array.from(newElement.attributes).forEach(attribute =>
          currentElement.setAttribute(attribute.name, attribute.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {}

  renderError(errorMessage = this._errorMessage) {}

  renderMessage(message = this._message) {}
}
