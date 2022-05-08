/* slider */

let pets = [];
let sliderDraw = []

const slider = document.querySelector(".slider-wrapper");
const sliderLeft = document.querySelector(".slider-btn__left");
const sliderRight = document.querySelector(".slider-btn__right");


const screenWidth = () => {
  if (screen.width < 1280 && screen.width >= 768) {
    return 2
  }
  if (screen.width < 768) {
    return 1
  }
  return 3
}
let numSlides = screenWidth()

const fetchJson = async () => {
  try {
    const data = await fetch('../../../pets.json');
    const response = await data.json();
    pets = response
    innerSlider()
  } catch (error) {
    console.log(error);
  }
};
fetchJson()

const innerSlider = () => {
  let petsDraw = pets.slice(0, numSlides)
  sliderDraw = petsDraw;

  petsDraw.forEach((e) => {
    let div = document.createElement('div')
    div.className = 'slider-slide active'
    div.id = `${e.id}`

    let img = document.createElement('img')
    img.className = 'slide-item'
    img.src = `${e.img}`
    img.alt = 'slide-item'

    let p = document.createElement('p')
    p.className = 'slide-name'
    p.textContent = `${e.name}`

    let btn = document.createElement('button')
    btn.className = 'btn'
    btn.textContent = 'Learn more'

    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(btn)
    slider.appendChild(div)
  })
}

sliderLeft.addEventListener('click', () => {
  let newPets = [
    ...pets.slice(numSlides, pets.length),
    ...pets.slice(0, numSlides),
  ]
  
  pets = newPets
  slider.innerHTML = '';
  innerSlider();
})
sliderRight.addEventListener('click', () => {
  let newPets = [
    ...pets.slice(pets.length - numSlides, pets.length),
    ...pets.slice(0, pets.length - numSlides),
  ]
  pets = newPets
  slider.innerHTML = '';
  innerSlider();
})



/* burger */

const burger = document.querySelector('.nav-toggle')
const nav = document.querySelector('.nav')
const logo = document.querySelector('.logo')
const navBack = document.querySelector('.nav-background')
const body = document.querySelector('body')
burger.addEventListener('click', showBurger)
navBack.addEventListener('click', showBurger)

function showBurger() {
  burger.classList.toggle('nav-toggle__active')
  nav.classList.toggle('nav-active')
  logo.classList.toggle('logo-open')
  navBack.classList.toggle('nav-background__open')
  body.classList.toggle('off-scroll')
}

/* modal */

const modalShow = (id, modalDraw) => {
  let elem = sliderDraw.find((e) => e.id === +id)
  const img = document.createElement('img')
  img.className = 'modal-img'
  img.src = `${elem.img}`
  img.alt = 'slide-item'
  
  const div = document.createElement('div')
  div.className = 'modal-about'

  const h3 = document.createElement('h3')
  h3.className = 'modal-title title'
  h3.textContent = `${elem.name}`

  const h4 = document.createElement('h4')
  h4.className = 'modal-subtitle'
  h4.textContent = `${elem.type} - ${elem.breed}`

  const p = document.createElement('p')
  p.className = 'modal-description'
  p.textContent = `${elem.description}`

  const ul = document.createElement('ul')
  ul.className = 'modal-info'

  const li = `
    <li class="modal-info__age">
      <span>Age: </span>${elem.age}
    </li>
    <li class="modal-info__inoculations">
      <span>Inoculations: </span>${elem.inoculations.join(", ")}
    </li>
    <li class="modal-info__diseases">
      <span>Diseases: </span>${elem.diseases.join(", ")}
    </li>
    <li class="parasites">
      <span>Parasites: </span>${elem.parasites.join(", ")}
    </li>
  `
  const btn = document.createElement('button')
  btn.className = 'modal-close'
  btn.id = 'modal-close'
  
  modalDraw.appendChild(img)
  modalDraw.appendChild(div)
  div.appendChild(h3)
  div.appendChild(h4)
  div.appendChild(p)
  div.appendChild(ul)
  ul.innerHTML = li
  modalDraw.appendChild(btn)
}

slider.addEventListener('click', (e) => {
  const modalDraw = document.querySelector('.modal-container')
  const modal = document.querySelector('#modal')
  const out = document.querySelector('.modal')

  if (e.target.parentElement.className === 'slider-slide active') {
    modal.classList.add('modal-show')
    body.classList.add('off-scroll')
    modalShow(e.target.parentElement.id, modalDraw)
  }
  out.addEventListener('click', (e) => {
    if (e.target.id === "modal" || e.target.id === 'modal-close') {
      modal.classList.remove('modal-show')
      body.classList.remove('off-scroll')
      modalDraw.innerHTML = ''
    }
  })
})


const PS = ` Слайдер извменяется при изменении ширины экрана, но после перезагрузки страницы`
console.log(PS)