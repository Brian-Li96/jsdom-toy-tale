let addToy = false;
const BASE_URL = 'http://localhost:3000/toys';

document.addEventListener("DOMContentLoaded", () => {
  console.log("Hi")
  getToy()
  handleForm()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) 
    {
      toyFormContainer.style.display = "block";
    } 
    else 
    {
      toyFormContainer.style.display = "none";
    }
  });
});

const getToy = () => {
  document.querySelector('#toy-collection').innerHTML = ""
  fetch(BASE_URL)
  .then(resp => resp.json())
  .then(toyData => toyData.forEach(renderToy))
}

let renderToy = (toy) => {
  
  const collect = document.querySelector('#toy-collection')

  const card = document.createElement('div')
  card.className = 'card'


  let toyName = document.createElement('h2')
  toyName.innerText = toy.name

  let toyImg = document.createElement('img')
  toyImg.className = 'toy-avatar'
  toyImg.src = toy.image

  let toyLikes = document.createElement('p')
  toyLikes.className = 'class-likes'
  toyLikes.id = `toy-${toy.id}`
  toyLikes.innerText = `${toy.likes} likes`

  let toyButton = document.createElement('button')
  toyButton.className = 'like-btn'
  toyButton.textContent = 'I like this toy!'
  toyButton.addEventListener('click', () => {
    updateLikes(toy);
  })

  card.append(toyName, toyImg, toyLikes, toyButton)

  collect.appendChild(card)
}

const updateLikes = (toy) => {

  let likes = parseInt(document.getElementById(`toy-${toy.id}`).innerText.split(" ")[0])
  let newLikes = {
    likes: likes + 1
  }

  let reqPackage = {}
    reqPackage.headers = {"Content-type": "application/json"}
    reqPackage.method = "PATCH"
    reqPackage.body = JSON.stringify(newLikes)

    fetch(BASE_URL+`/${toy.id}`, reqPackage)
    .then(resp => resp.json())
    .then((toyObj) => {
      document.getElementById(`toy-${toy.id}`).innerText = toyObj.likes + " likes"
    })
}

const handleForm = () => {                                      
  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }

    let reqPackage = {}
    reqPackage.headers = {"Content-Type": "application/json"}
    reqPackage.method = "POST"
    reqPackage.body = JSON.stringify(newToy)
    fetch(BASE_URL, reqPackage)
    .then(resp => resp.json())
    .then(renderToy)
    toyForm.reset()
  })
}


