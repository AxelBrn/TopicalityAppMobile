const API_TOKEN = "iuSDG654809LKSGG.JKCGµ£A/"
const URL_BASE = 'https://www.topicality.fr/Topicality/api/'

export function getAllArticlesFromAPI () {
    return fetch(URL_BASE + API_TOKEN + 'article.php').then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getImageFromAPI (name) {
    return fetch('https://www.topicality.fr/Topicality/public/uploads/images/' + name).then((response) => response.json())
        .catch((error) => console.error(error));
}
