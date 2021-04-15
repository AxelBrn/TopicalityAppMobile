const API_TOKEN = 'iuSDG654809LKSGG.JKCGµ£A/';
const URL_TEST = 'http://10.0.2.2/API/';

export function getAllCategoriesFromAPI() {
  return fetch(URL_TEST + API_TOKEN + 'categorie.php')
    .then(response => response.json())
    .catch(error => console.error(error));
}
