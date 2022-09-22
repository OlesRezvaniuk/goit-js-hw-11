// const axios = require('axios').default;
import './css/styles.css';
import { searchQuery } from './js/searchQuery';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  docClose: true,
});

const newPop = new searchQuery();

const refs = {
  form: document.querySelector('#search-form'),
};
const inputEl = refs.form.querySelector('input[type=text]');
const btnEl = refs.form.querySelector('button[type=submit]');
const gallery = document.querySelector('.gallery');

refs.form.addEventListener('submit', onSearchInput);

async function onSearchInput(e) {
  e.preventDefault();

  newPop.query = e.currentTarget.elements.searchQuery.value.trim();
  newSearchQuery();
}

async function newSearchQuery() {
  const data = await newPop.request();
  // console.log(data);
  initializeName(data.hits);
  console.log(data.hits);
}

function initializeName(resHits) {
  const privet = resHits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="gallery__item post" style='overflow: hidden; position: relative'>
           <a href="${largeImageURL}">
            <img
              class="gallery__image"
              src="${webformatURL}"
              alt="${tags}"
              loading="lazy"

            />
            </a>
            <div class="info">
                <p class="info-item" style='display: flex; flex-direction: column'>
                    <b>Likes</b><span>${likes}</span>
                </p>
                <p class="info-item" style='display: flex; flex-direction: column'>
                    <b>Views</b><span>${views}</span>
                </p>
                <p class="info-item" style='display: flex; flex-direction: column'>
                    <b>Comments</b><span>${comments}</span>
                </p>
                <p class="info-item" style='display: flex; flex-direction: column'>
                    <b>Downloads</b><span>${downloads}</span>
                </p>
            </div>
        </div>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', privet);
}
