// write your code here
document.addEventListener('DOMContentLoaded',()=>{
    fetchMenu()
    const menu = document.querySelector('#ramen-menu')
    const allRamen = menu.getElementsByTagName('img')
    const form = document.querySelector('#new-ramen')

    setTimeout(()=>{
        Array.from(allRamen).forEach((ramen)=>{
            ramen.addEventListener('click',(e)=>{
                ramenDetail(e.target.id)
            })
        })
    },500)

    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        addNewRamen(e)
        form.reset()
        location.reload()
    })
})

function fetchMenu(){
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data => {
        Array.from(data).forEach((ramen)=>{
            createMenu(ramen)
        })
    })
}

function createMenu(menuObj){
    const menu = document.querySelector('#ramen-menu')
    const img = document.createElement('img')
    img.src = menuObj.image
    img.id = menuObj.id
    menu.appendChild(img)
}

function ramenDetail(id){
    const img = document.querySelector('.detail-image')
    const name = document.querySelector('h2, .name')
    const rest = document.querySelector('.restaurant')
    const rating = document.querySelector('#rating-display')
    const comment = document.querySelector('#comment-display')
    fetch(`http://localhost:3000/ramens/${id}`)
    .then(res => res.json())
    .then(data => {
        img.src = data.image
        name.innerText = data.name
        rest.innerText = data.restaurant
        rating.innerText = data.rating
        comment.innerText = data.comment
    })
}

function addNewRamen(e){
    const newRamen ={
     'name': e.target.elements['name'].value,
     'restaurant': e.target.elements['restaurant'].value,
     'image': e.target.elements['image'].value,
     'rating':e.target.elements['rating'].value,
     'comment': e.target.elements['new-comment'].value
    }
    postNewRamen(newRamen).then((data)=>createMenu(data))
}

function postNewRamen(ramenObj){
    return fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            Accepter: 'application/json'
        },
        body: JSON.stringify(ramenObj)
    })
    .then(res => res.json())
    .then(data => data)
}