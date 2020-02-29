const API_TOKEN = "iuSDG654809LKSGG.JKCGµ£A/"
const URL_BASE = 'https://www.topicality.fr/api/'

export function getAllCategoriesFromAPI () {
    return fetch(URL_BASE + API_TOKEN + 'categorie.php').then((response) => response.json())
        .catch((error) => console.error(error));
}
