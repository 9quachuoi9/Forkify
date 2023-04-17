import View from './Views.js';
import icons from 'url:../../img/icons.svg';

class resultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query, please try again!';
    _message = '';

    _generateMarkUp() {
        return this._data.map(this._generateMarkUpPreview).join('');
    }

    _generateMarkUpPreview(result) {
        return `
          <li class="preview">
            <a class="preview__link preview__link--active" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
        `;
    }
}

export default new resultsView();
