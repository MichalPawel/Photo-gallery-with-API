import '../scss/index.scss';

class Doggo {
    constructor() {
        this.apiUrl = 'https://dog.ceo/api';
        this.imgElement = document.querySelector('.container img');
        this.bgcElement = document.querySelector('.featured-dog__background');
        this.tiles = document.querySelector('.tiles');
        this.spinnerEl = document.querySelector('.spinner');
        this.init();
        this.showAllBreeds();
    }
    showImgWhenReady(img) {
        this.imgElement.setAttribute('src', img);
        this.bgcElement.style.backgroundImage = `url(${img})`;
        this.spinnerEl.classList.remove('spinner--visible');
    }
    listBreeds() {
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
        this.spinnerEl.classList.add('spinner--visible')
        this.getRandomImage()
            .then(img => this.showImgWhenReady(img))
    }
    addBreed(breed, subBreed) {
        let name = '';
        let type = '';
        if (typeof subBreed === 'undefined') {
            name = breed;
            type = breed;
        } else {
            name = `${breed}<br>${subBreed}`;
            type = `${breed}/${subBreed}`;
        }
        const tile = document.createElement('div');
        tile.classList.add('tiles__tile');
        const tileContent = document.createElement('div');
        tileContent.classList.add('tiles__tile-content');
        if (typeof subBreed === 'undefined') tileContent.style.lineHeight = '40px';
        tileContent.innerHTML = name;
        tileContent.addEventListener('click', () => {
            window.scrollTo(0, 0);
            this.spinnerEl.classList.add('spinner--visible');
            this.getRandomImageByBreed(type)
                .then(img => this.showImgWhenReady(img))
        })
        tile.appendChild(tileContent);
        this.tiles.appendChild(tile);
    }
    showAllBreeds() {
        this.listBreeds()
            .then(breeds => {
                for (const breed in breeds) {
                    if (breeds[breed].length === 0) {
                        this.addBreed(breed);
                    } else {
                        for (const subBreed of breeds[breed]) {
                            this.addBreed(breed, subBreed);
                        }
                    }
                }
            }
            )
    }
}
document.addEventListener('DOMContentLoaded', () => new Doggo())