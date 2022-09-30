const wordEl = document.querySelector(".word")
const wrongEl = document.querySelector(".wrong")
const popup = document.querySelector(".popup")
const notification = document.querySelector(".notification")
const figure = document.querySelectorAll(".figure-part")

const url = "https://random-word-api.herokuapp.com/word?lang="
const language = "it"

const wordToGuess = []
const wrongLetters = []

let word
let isLoaded = false
let isPopup = false

// event listener on keyboard
window.addEventListener("keyup", checkWord)

function getWord() {
  isLoaded = false
  fetch(url + language)
    .then((res) => res.json())
    .then((data) => {
      word = data[0]
      console.log(word)
      displayWord(word)
    })
    .finally(() => {
      isLoaded = true
    })
}

async function displayWord(myWord) {
  const arrayWord = myWord.split("")
  const html = arrayWord
    .map((letter) => {
      return `<span class="letter">${
        wordToGuess.includes(letter) ? letter : ""
      }</span>`
    })
    .join("")

  wordEl.innerHTML = html

  const innerWord = wordEl.innerText.replace(/\n/g, "")

  if (innerWord.toLowerCase() === myWord) {
    console.log("si")
    popup.style.display = "flex"
    const p = "Congratulation, you've won! 😃"
    const html = `<p>${p}</p>
    <button onclick="location.reload();" class="btn">Play Again</button>
    `
    popup.innerHTML = html

    isPopup = true
  }
}

function checkWord(event) {
  if (isPopup) {
    event.preventDefault()
    return
  }
  if (!isLoaded) return false
  // event target on letters
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    //Promise.resolve(word).then((value) => {

    if (word.includes(event.key)) {
      if (!wordToGuess.includes(event.key)) {
        wordToGuess.push(event.key)
      } else {
        showNotification()
      }
      displayWord(word)
    } else {
      if (!wrongLetters.includes(event.key)) {
        wrongLetters.push(event.key)
        checkWrongLetters(event.key)
      } else {
        showNotification()
      }
    }
    //})
  }
}

function showNotification(letter) {
  notification.classList.add("show")

  setTimeout(() => {
    notification.classList.remove("show")
  }, 1500)
}

function checkWrongLetters(event) {
  if (wrongLetters.length === 1) {
    figure[0].style.display = "block"
  } else if (wrongLetters.length === 2) {
    figure[1].style.display = "block"
  } else if (wrongLetters.length === 3) {
    figure[2].style.display = "block"
  } else if (wrongLetters.length === 4) {
    figure[3].style.display = "block"
  } else if (wrongLetters.length === 5) {
    figure[4].style.display = "block"
  } else if (wrongLetters.length === 6) {
    popup.style.display = "flex"
    const p = "Hai perso 😣, la parola era "
    popup.innerHTML = `<p>${p} ${word}</p>
    <button onclick="location.reload();" class="btn">Play Again</button>
    `
    figure[5].style.display = "block"

    isPopup = true
    if (isPopup) {
      event.preventDefault()
      return
    }
  }
  wrongEl.innerHTML = `<p>These letters are wrong!</p>
    <span>${wrongLetters}</span>
  `
}

getWord()
