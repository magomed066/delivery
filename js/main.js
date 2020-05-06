"use strict";
//? UI elements
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const btnAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardRestaurant = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector('.cards-menu');

let login = JSON.parse(localStorage.getItem("user"));

//? Events
cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
btnAuth.addEventListener("click", toggleModalAuth);
closeAuth.addEventListener("click", toggleModalAuth);
checkAuth();
cardRestaurant.addEventListener("click", openGoods);
logo.addEventListener("click", closeGoods);

createCardrestaurant();
createCardrestaurant();
createCardrestaurant();

//! Main functions

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
}

function autorized() {
  function logOut() {
    login = null;
    localStorage.removeItem("user");
    btnAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";

    buttonOut.removeEventListener("click", logOut);
    checkAuth();
  }

  console.log("Авторизован!");
  btnAuth.style.display = "none";

  userName.textContent = login;

  userName.style.display = "inline";
  buttonOut.style.display = "block";

  buttonOut.addEventListener("click", logOut);
}

function notAutorized() {
  console.log("Не авторизован!");

  function logIn(e) {
    e.preventDefault();

    if (!loginInput.value) {
      alert("Введите пароль!");
      return;
    }
    // Присваиваем значение из инпута в переменную
    login = loginInput.value;

    //! Добавляем пользователя в LC
    localStorage.setItem("user", JSON.stringify(login));

    toggleModalAuth();
    logInForm.removeEventListener("submit", logIn);
    logInForm.reset();
    checkAuth();
  }

  logInForm.addEventListener("submit", logIn);
}

function checkAuth() {
  login ? autorized() : notAutorized();
}

function createCardrestaurant() {
  const card = `
    <a class="card card-restaurant">
      <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image" />
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title">Пицца плюс</h3>
                <span class="card-tag tag">50 мин</span>
            </div>
            <div class="card-info">
              <div class="rating">
                4.5
              </div>
              <div class="price">От 900 ₽</div>
             <div class="category">Пицца</div>
            </div>
        </div>
    </a>`;

  cardRestaurant.insertAdjacentHTML("beforeend", card);
}

function openGoods(e) {
  let target = e.target;
  let restaurant = target.closest(".cards-restaurants");

  if (!login) {
    toggleModalAuth();
    return;
  } else {
    containerPromo.classList.add("hide");
    restaurants.classList.add("hide");
    menu.classList.remove("hide");
  }



  createCardGood();
  createCardGood();
  createCardGood();
}

function closeGoods() {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
  cardsMenu.textContent = '';
}

function createCardGood() {
  const card = document.createElement("div");
  card.className = "card";

  card.insertAdjacentHTML(
    "beforeend",
    
    `
    <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image" />
		<div class="card-text">
			<div class="card-heading">
				<h3 class="card-title card-title-reg">Пицца Классика</h3>
			</div>
			<div class="card-info">
				<div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями, грибы.</div>
			</div>
			<div class="card-buttons">
				<button class="button button-primary button-add-cart">
				  <span class="button-card-text">В корзину</span>
					<span class="button-cart-svg"></span>
				</button>
				<strong class="card-price-bold">510 ₽</strong>
			</div>
		</div>
  `
  );

  cardsMenu.insertAdjacentElement('beforeend', card);
}
