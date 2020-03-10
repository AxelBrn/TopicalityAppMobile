const API_TOKEN = "iuSDG654809LKSGG.JKCGµ£A/"
const URL_BASE = 'https://www.topicality.fr/api/'

export function uploadImage(image) {
    let uploadData = new FormData()
    uploadData.append('submit', 'ok')
    uploadData.append('file', { type: image.type, uri: image.uri, name: image.fileName})
    return fetch(URL_BASE + API_TOKEN + 'uploadImage.php', {
        method: 'post',
        body: uploadData
    }).then(response => response.json()).catch((error) => console.error(error));
}
