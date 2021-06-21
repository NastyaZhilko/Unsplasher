'use strict';

const searchButton = document.querySelector('.search__button');
const searchInput = document.querySelector('.search__input');
const resultBlock = document.querySelector('.resultBlock');

function generateItem(res) {
    if (res.length === 0) {
        inputError('Not found');
        return;
    }
    res.forEach(el => {
        const element = document.createElement('div')
        element.classList.add('section__item')
        const imageElement = document.createElement('img')
        imageElement.src = el.urls.thumb
        imageElement.classList.add('section__image')
        const aElement = document.createElement('a')
        aElement.href = el.urls.full
        aElement.target = '_blank'
        aElement.insertAdjacentElement('beforeend', imageElement)
        element.insertAdjacentElement('afterbegin', aElement)
        resultBlock.insertAdjacentElement('beforeend', element)
    })
}

function inputError(message) {
    let errorText = document.createElement('span')
    errorText.textContent = message
    resultBlock.insertAdjacentElement('afterbegin', errorText)
}

async function getPictures() {
    resultBlock.innerHTML = ''
    const request = searchInput.value
    if (request.trim() === '') {
        inputError('Empty query')
        return;
    }
    searchButton.disabled = true
    searchButton.classList.add('search__button_disabled')

    try {
        let res = await fetch(`https://api.unsplash.com/search/photos?&query=${request}`, {
            method: 'GET',
            headers: {
                "Authorization": "Client-ID UjQgYfvCOp5GpxEdpZu2vZvOEotNg2578sdEl2F3x1c",
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        let result = await res.json()
        searchInput.value = ''
        searchButton.disabled = false
        if (!result.results) {
            inputError(result.error)
        } else {
            generateItem(result.results)
        }

    } catch (e) {
        inputError(e.message)

    } finally {
        searchButton.disabled = false
        searchButton.classList.remove('search__button_disabled')
    }
}

searchButton.addEventListener('click', getPictures);