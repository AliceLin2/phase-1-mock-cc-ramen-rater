// write your code here
document.addEventListener('DOMContentLoaded',()=>{
    let ramenId
    let ramenIdArr = []
    const menu = document.querySelector('#ramen-menu')
    const allRamen = menu.getElementsByTagName('img')
    const form = document.querySelector('#new-ramen')
    const breakLine = document.querySelector('br')
    const editForm = document.querySelector('#edit-ramen')
    const newDiv = document.createElement('div')
    const editBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')
    editBtn.id = 'edit-button'
    editBtn.innerText = 'Edit'
    deleteBtn.id = 'delete-button'
    deleteBtn.innerText = 'Delete'
    newDiv.append(editBtn, deleteBtn)
    breakLine.after(newDiv)

    editForm.style.display = "none"

    fetchMenu()

    setTimeout(()=>{
        Array.from(allRamen).forEach((ramen)=>{
            ramenIdArr.push(parseInt(ramen.id))
        })
        ramenDetail(Math.min(...ramenIdArr))
    },200)

    setTimeout(()=>{
        Array.from(allRamen).forEach((ramen)=>{
            ramen.addEventListener('click',(e)=>{
                ramenId = e.target.id
                ramenDetail(ramenId)
            })
        })
    },500)

    editBtn.addEventListener('click',(e)=>{
        editForm.style.display = "block"
    })

    editForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const newObj = {
            'rating': editForm.elements['rating'].value,
            'comment': editForm.elements['new-comment'].value
        }
        updateRamen(ramenId,newObj)
        editForm.reset()
        editForm.style.display = "none"
    })

    deleteBtn.addEventListener('click',(e)=>{
        deleteRamen(ramenId)
        location.reload()
    })

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

function updateRamen(id,newObj){
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
            Accepter: 'application/json'
        },
        body: JSON.stringify(newObj)
    })
    .then(res => res.json())
    .then(data => {
        const rating = document.querySelector('#rating-display')
        const comment = document.querySelector('#comment-display')
        rating.innerText = data.rating
        comment.innerText = data.comment
    })
}

function deleteRamen(id){
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => {
        const detail = document.querySelector('#ramen-detail')
        console.log(data)
    })
}