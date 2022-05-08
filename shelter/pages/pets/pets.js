/* slider */

let pets = [];
let petsAll = [];
let subPetsAll = [];
let sliderDraw = [];
let count = 1
let slideNumber = 0
let cards = 0
let petsAllNew = []

const fetchJson = async () => {
  try {
    const data = await fetch('../../../pets.json');
    const response = await data.json();
    pets = response
  } catch (error) {
    console.log(error);
  }
};
fetchJson()

if (screen.width < 1280 && screen.width >= 768) {
  slideNumber = 8, cards = 6
} else if (screen.width < 768) {
  slideNumber = 16, cards = 3
} else {
  slideNumber = 6, cards = 8
}

function random() {
	min = Math.ceil(0);
	max = Math.floor(7);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function makePets() {
  while (petsAll.length !== slideNumber) {
    el = pets[random()]
    if (subPetsAll.indexOf(el) === -1) {
      subPetsAll.push(el)
    }
    if (subPetsAll.length === cards) {
      petsAll.push(subPetsAll)
      subPetsAll = []
    }
  }
  return petsAll.flat()
}

async function innerHTML() {
  await fetchJson()
  petsAllNew = makePets()
}

const slider = document.querySelector(".slider");

async function innerSlider() {
  await innerHTML()
  let petsDraw = petsAllNew.slice((count - 1) * cards, count * cards)
  sliderDraw = petsDraw;
  while (slider.firstChild) {
    slider.removeChild(slider.firstChild);
  }
  petsDraw.forEach((e) => {
    let div = document.createElement('div')
    div.className = 'slide'
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
  sliderControlActive(count)
}
innerSlider(count)

const sliderLeft = document.querySelector('.slider-btn__left')
const sliderBack = document.querySelector('.slider-btn__back')
const sliderNext = document.querySelector('.slider-btn__next')
const sliderRight = document.querySelector('.slider-btn__right')
const counter = document.querySelector('.counter')
const sliderControls = document.querySelectorAll('.slider-btn')

function sliderControlActive(count) {
	if (count == slideNumber) {
		sliderRight.classList.remove('slider-btn__active');
		sliderNext.classList.remove('slider-btn__active');
		sliderBack.classList.add('slider-btn__active');
		sliderLeft.classList.add('slider-btn__active');
	} else if (count == 1) {
		sliderBack.classList.remove('slider-btn__active');
		sliderLeft.classList.remove('slider-btn__active');
		sliderRight.classList.add('slider-btn__active');
		sliderNext.classList.add('slider-btn__active');
	} else {
		sliderBack.classList.add('slider-btn__active');
		sliderLeft.classList.add('slider-btn__active');
		sliderRight.classList.add('slider-btn__active');
		sliderNext.classList.add('slider-btn__active');
	}
}

function btnDisable() {
	sliderControls.forEach(btn => {
		btn.classList.contains('slider-btn__active') ? btn.disabled = false : btn.disabled = true
	})
}

sliderNext.addEventListener('click', function () {
	count++
	counter.innerHTML = count
	sliderControlActive(count)
	btnDisable()
	innerSlider()
})
sliderBack.addEventListener('click', function () {
	if (count !== 1) {
		count--
		counter.innerHTML = count
	}
	sliderControlActive(count)
	btnDisable()
	innerSlider()
})
sliderRight.addEventListener('click', function () {
	count = slideNumber
	counter.innerHTML = count
	sliderControlActive(count)
	btnDisable()
	innerSlider()
})
sliderLeft.addEventListener('click', function () {
	count = 1
	counter.innerHTML = count
	sliderControlActive(count)
	btnDisable()
	innerSlider()
})

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

  if (e.target.parentElement.className === 'slide') {
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







/* burger */

const burger = document.querySelector('.nav-toggle')
const nav = document.querySelector('.nav')
const logo = document.querySelector('.logo')
const navBack = document.querySelector('.nav-background')
const body = document.querySelector('body')
const petsNav = document.querySelector('.pets-nav')
burger.addEventListener('click', showBurger)
navBack.addEventListener('click', showBurger)

function showBurger() {
  burger.classList.toggle('nav-toggle__active')
  nav.classList.toggle('nav-active')
  logo.classList.toggle('logo-open')
  navBack.classList.toggle('nav-background__open')
  body.classList.toggle('off-scroll')
}


