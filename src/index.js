import { fetchBreeds, fetchBreedById } from './cats-api';
import iziToast from 'izitoast';
import SlimSelect from 'slim-select';
import 'izitoast/dist/css/iziToast.min.css';
import '../node_modules/slim-select/dist/slimselect.css';

const breedSelector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

const select = new SlimSelect({
  select: breedSelector,
});

select.disable();
// breedSelector.disabled = true;

getBreedsData();

async function getBreedsData() {
  const breeds = await fetchBreeds()
    .then(data => {
      const breeds = {};
      data.map(breed => (breeds[breed.name] = breed.id));
      return breeds;
    })
    .catch(error);

  const options = [
    {
      text: 'Choose breed',
      value: 'none',
    },

    ...Object.keys(breeds).map(breed => {
      return { text: breed, value: breeds[breed] };
    }),
  ];
  select.setData(options);
  select.enable();
  toggleLoader(false);
}

breedSelector.addEventListener('change', onSelect);

async function onSelect(e) {
  if (e.target.value === 'none') {
    catInfo.innerHTML = '';
    return;
  }
  toggleLoader();
  console.log(e.currentTarget.value);
  await fetchBreedById(e.currentTarget.value)
    .then(createMarkup)
    .catch(error)
    .finally(() => toggleLoader(false));
}

function createMarkup(data) {
  const imgUrl = data.url;
  const breedData = data.breeds[0];
  catInfo.innerHTML = `
    <h2 class='cat-title'>${breedData.name}</h2>
    <div class="cat-info-box">
      <img src="${imgUrl}" alt="${breedData.name}" width='600'>
      <div class="cat-info-text">
        <p>${breedData.description}</p>
        <ul>
          <li><b>Life Span:</b> ${breedData.life_span}</li>
          <li><b>Temperament:</b> ${breedData.temperament}</li>
        </ul>
      </div>
    </div>
  `;
}

function toggleLoader(show = true) {
  loader.style.display = show ? 'block' : 'none';
}

function error(err) {
  iziToast.error({
    title: 'Error',
    titleColor: 'white',
    message: err.message,
    messageColor: 'white',
    position: 'topRight',
    close: false,
    closeOnClick: true,
    progressBarColor: 'red',
    icon: null,
    messageSize: 20,
    timeout: 2000,
  });
  catInfo.innerHTML = '';
}
