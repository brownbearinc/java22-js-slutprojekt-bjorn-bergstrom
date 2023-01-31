let search
let amount
let size
let sort

runJavaScript()

// Add eventlistener on 'search'-button
function runJavaScript() {
    document.querySelector('button').addEventListener('click', getUserInput)
}

// Get the values of the search form 
function getUserInput(event) {
    event.preventDefault()

    // Search text
    search = document.getElementById('inputText').value

    // Amount
    amount = document.getElementById('inputNumber').value

    // Image size
    const imgSize = document.getElementById('imgSize')
    size = imgSize.options[imgSize.selectedIndex].value

    // Sort images
    const imgSort = document.getElementById('imgSort')
    sort = imgSort.options[imgSort.selectedIndex].value

    div.innerHTML = ''

    // Output the values
    console.log('search: ' + search)
    console.log('amount: ' + amount)
    console.log('sizevalue: ' + size)
    console.log('sort: ' + sort)

    // Check if there's values
    if (search) {
        if (amount > 0) {
            addUrlToFetch()
        } else {
            alert('Enter amount!')
        }
    } else {
        alert('Enter your search term!')
    }
}

function addUrlToFetch() {

    const apiKey = 'b1f026c41476d35c0f9305bbe6e3b3e3'
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${search}&sort=${sort}&format=json&nojsoncallback=1`

    // Output url
    console.log(url)

    fetch(url)
        .then(response => {

            if (response.status >= 200 && response.status < 300) {
                return response.json()
            }
            else {
                throw `:-( Something went wrong please try again later.`
            }
        })
        .then(createImgUrl)
        .catch(error => {

            console.log(error)

            // Add error messages on index.html
            if (error == 'TypeError: info.photos.photo[i] is undefined') {

                div.innerHTML = `<h1>:-( The search term could not be found.</h1>`

            } else if (error == 'TypeError: NetworkError when attempting to fetch resource.') {

                div.innerHTML = `<h1>:-( Couldn't add images due to a network error.</h1>`

            } else {
                div.innerHTML = `<h1>:-( Something went wrong, please try again later.</h1>`
            }
        })
}

function createImgUrl(info) {

    for (let i = 0; i < amount; i++) {
        const id = info.photos.photo[i].id
        const server = info.photos.photo[i].server
        const secret = info.photos.photo[i].secret

        const url = `https://live.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`

        createElementImg(url)
    }
}

function createElementImg(url) {

    const div = document.getElementById('div')
    const img = document.createElement('img')

    // Add eventlistner on img elements
    img.addEventListener('click', event => {
        event.preventDefault();
        window.open(url)
    })

    img.src = url
    div.append(img)
} 