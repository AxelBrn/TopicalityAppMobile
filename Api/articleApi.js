const API_TOKEN = "iuSDG654809LKSGG.JKCGµ£A/"
const URL_BASE = 'https://www.topicality.fr/api/'

export function getAllArticlesFromAPI () {
    return fetch(URL_BASE + API_TOKEN + 'article.php').then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getArticleByIdFromAPI (id) {
    return fetch(URL_BASE + API_TOKEN + 'article.php?id=' + id).then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getArticleByCategorie (idCateg) {
    return fetch(URL_BASE + API_TOKEN + 'article.php?idCat=' + idCateg).then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getArticleByUser (idUser) {
    return fetch(URL_BASE + API_TOKEN + 'article.php?idUser=' + idUser).then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getImageFromAPI (name) {
    return 'https://www.topicality.fr/uploads/images/' + name
}

export function getCountArticlesByUser (idUser) {
    return fetch(URL_BASE + API_TOKEN + 'article.php?countById=' + idUser).then((response) => response.json())
        .catch((error) => console.error(error));
}
