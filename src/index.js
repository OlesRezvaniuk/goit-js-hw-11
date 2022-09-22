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

const newPop = new searchQuery(); // impor from searchQuery

const refs = {
  form: document.querySelector('#search-form'),
};
const inputEl = refs.form.querySelector('input[type=text]');
const btnEl = refs.form.querySelector('button[type=submit]');
const gallery = document.querySelector('.gallery');
const hiddenBtn = document.querySelector('.button-hidden');

refs.form.addEventListener('submit', onSearchInput);
hiddenBtn.addEventListener('click', onButtonOfNextPage);

//Кнопка пошуку-------------------------------------------
async function onSearchInput(e) {
  e.preventDefault();

  newPop.query = e.currentTarget.elements.searchQuery.value.trim();

  // console.log(newPop.searchQuery);

  newSearchQuery();
  if (newPop.page > 0) {
    removeGallery();
    hiddenBtn.style.visibility = 'hidden';
  }
  if (!newPop.searchQuery) {
    btnEl.disabled = true;
  }
}

// Визов промісів-----------------------------------------
async function newSearchQuery() {
  const data = await newPop.request();

  let pageLength = data.hits.length;

  if (pageLength <= 0) {
    console.log('pishov nahyi!');
  } else if (pageLength > 1) {
    hiddenBtn.style.visibility = 'visible';
  }
  initializeName(data.hits);
  const totalPage = Math.ceil(data.totalHits / 40);
  // console.log(totalPage); // Total value of page
  // console.log(newPop.page); // Current value of page
  const currentPAge = Math.ceil((newPop.page * pageLength) / 40);

  if (newPop.page === totalPage) {
    console.log('hvatit'); // Let insert to this Nitifix
    hiddenBtn.disabled = true;
  }
}
// Кнопка наступної сторінки---------------------------------
async function onButtonOfNextPage() {
  newPop.updatePage();
  newSearchQuery();
}

function removeGallery() {
  gallery.innerHTML = '';
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
