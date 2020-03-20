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
const URL_TEST = 'http://10.0.2.2/Topicality/API/'

export function addArticle(user, categ, titre, sousTitre, contenu, source, image) {
    let uploadData = new FormData()
    uploadData.append('insert', 'ok')
    if(image == undefined){
        uploadData.append('haveImage', 'non')
    }else{
        uploadData.append('haveImage', 'oui')
        uploadData.append('file', { type: image.type, uri: image.uri, name: image.fileName})
    }
    uploadData.append('user', user)
    uploadData.append('categorie', categ)
    uploadData.append('titre', titre)
    uploadData.append('sousTitre', sousTitre)
    uploadData.append('contenu', contenu)
    uploadData.append('source', source)
    return fetch(URL_TEST + API_TOKEN + 'article.php', {
        method: 'post',
        body: uploadData
    }).then(response => response.json()).catch((error) => console.error(error));
}

