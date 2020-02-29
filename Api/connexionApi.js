const API_TOKEN = "iuSDG654809LKSGG.JKCGµ£A/"
const URL_BASE = 'https://www.topicality.fr/api/'

export function getUserIfConnected (mail, password) {
    return fetch(URL_BASE + API_TOKEN + 'authentification.php?pw=' + password + '&userMail=' + mail).then((response) => response.json())
        .catch((error) => console.error(error));
}
