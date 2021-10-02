import '../scss/index.scss';

class Doggo {
    constructor() {
        this.apiUrl = 'https://dog.ceo/api'
        this.imgElement = document.querySelector('.container img')
        this.bgcElement = document.querySelector('.featured-dog__background')
        this.init()
    }
    listAllBreeds() {
        return fetch(`${this.apiUrl}/breeds/list/all`)
            .then(response => response.json())
            .then(data => data.message)
            .catch(err => console.log(err))
    }
    getRandomImage() {
        return fetch(`${this.apiUrl}/breeds/image/random`)
            .then(response => response.json())
            .then(data => data.message)
    }
    getRandomImageByBreed(breed) {
        return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
            .then(res => res.json())
            .then(data => data.message)
    }
    init() {
        this.getRandomImage()
            .then(img => {
                this.imgElement.setAttribute('src', img)
                this.bgcElement.style.backgroundImage = `url(${img})`
            })
        this.listAllBreeds()
            .then(list => console.log(list))
    }
}
document.addEventListener('DOMContentLoaded', () => new Doggo())