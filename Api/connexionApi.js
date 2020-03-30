const API_TOKEN = 'iuSDG654809LKSGG.JKCGµ£A/'
const URL_BASE = 'https://www.topicality.fr/api/'

export function getUserIfConnected (mail, password) {
    let data = new FormData()
    data.append('pw', password)
    data.append('userMail', mail)
    return fetch(URL_BASE + API_TOKEN + 'authentification.php',{
        method: 'post',
        body: data
    }).then((response) => response.json())
        .catch((error) => console.error(error));
}

export function updateUserInfos(idUser, nom, prenom, password) {
    return fetch(URL_BASE + API_TOKEN + 'user.php?idUser=' + idUser + '&nom=' + nom + '&prenom=' + prenom + '&pw=' + password ).then((response) => response.json())
        .catch((error) => console.error(error));
}

export function verifOldPassword(id, oldPw) {
    return fetch(URL_BASE + API_TOKEN + 'user.php?id=' + id +'&pw=' + oldPw).then((response) => response.json())
        .catch((error) => console.error(error));
}
