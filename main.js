const API_KEY = '563492ad6f91700001000001e786f171ff8a473da6d5cb22f15e353c'

const loadMore = document.querySelector('.load-more')
const searchform = document.querySelector('.header form')
const searchButton = document.querySelector('.search-button')
const searchResult = document.querySelector('.gallery')

let pageIndex = 1
let search = false
let query = ''

//take what is inside the search form as input
searchform.addEventListener('input', (e) =>{
    e.preventDefault()
    query = e.target.value
})

//load photos by default button
async function Gallery(pageIndex){
    const baseUrl = `https://api.pexels.com/v1/curated?per_page=15&page=${pageIndex}`
    const response = await fetch(baseUrl, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: API_KEY,
        }
    })
    const data = await response.json()
    console.log(data)

    data.photos.forEach((photo)=>{
        const pic = document.createElement('div')
        pic.innerHTML = `
        <a href="${photo.src.original}" target="_blank" >
            <img src="${photo.src.large}" alt="img">
            <h3>${photo.photographer}</h3>
        </a>`
        document.querySelector(' .gallery').appendChild(pic)
    })

}

//search for photos function
async function SearchPhotos(query, pageIndex){
    const baseUrl = `https://api.pexels.com/v1/search?per_page=15&page=${pageIndex}&query=${query}`
    const response = await fetch(baseUrl, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: API_KEY,
        }
    })
    const data = await response.json()

    data.photos.forEach((photo)=>{
        const pic = document.createElement('div')
        pic.innerHTML = `
        <a href="${photo.src.original}" target="_blank" >
            <img src="${photo.src.large}" alt="img">
            <h3>${photo.photographer}</h3>
        </a>`
        document.querySelector(' .gallery').appendChild(pic)
    })
}

//search button
searchButton.addEventListener('click', ()=>{
    if(searchform.value === '') return
    clear()
    search = true
    SearchPhotos(query, pageIndex)
})

function clear(){
    document.querySelector('.gallery').innerHTML = ''
    pageIndex = 1
}

//loadmore button
loadMore.addEventListener('click',(e)=>{
    e.preventDefault()
    if(!search){
        pageIndex++
        Gallery(pageIndex)
    }else{
        if(query.value==='') return
            pageIndex++,
            SearchPhotos(query, pageIndex)
        
    }
})


Gallery(pageIndex)
