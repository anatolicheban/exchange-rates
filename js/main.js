const buttons = document.querySelectorAll(".button");
const input = document.querySelector(".app__input-field");
const body = document.querySelector('body')
const selects = document.querySelectorAll('.select')

//====================Получение курса валют===========================

async function getCourse(from, to) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ff7552500dmshede3f1b3edbacd8p1ed3f3jsn5ca1b30e526c',
      'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
    }
  };

  let itemName = `${from} to ${to}`

  fetch(`https://currency-exchange.p.rapidapi.com/exchange?from=${from}&to=${to}&q=1.0`, options)
    .then(data => console.log(data.json()))
    .then(data => {
      return data
    })
}


//=======================Заполнение формы ввода============================

buttons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    if (!button.classList.contains("reset")) {
      input.value += this.innerText
      calcMoney()
      console.log(input.value);
    } else if (button.classList.contains("reset")) {
      input.value = '0'
    }
  });
});

function setState(index, state) {
  if (index >= 1 && index <= 9 && state === 'active') {
    buttons[index - 1].classList.add('active')
  } else if (index == 0 && state === 'active') {
    buttons[9].classList.add('active')
  } else if (index >= 1 && index <= 9 && state === 'default') {
    buttons[index - 1].classList.remove('active')
  } else if (index == 0 && state === 'default') {
    buttons[9].classList.remove('active')
  }
}

window.addEventListener('keydown', function (event) {
  setState(Number(event.key), 'active')
})

window.addEventListener('keyup', function (event) {
  setState(Number(event.key), 'default')
})

//=========================Считаем денежки====================================

// console.log(selectFrom);
// console.log(selectTo);
let output = document.querySelector('.app__output-value')


input.oninput = calcMoney;

// localStorage.setItem('UAH to USD', 'test')

async function calcMoney() {
  let selectFrom = document.querySelectorAll('.select')[0].value
  console.log(selectFrom);
  let selectTo = document.querySelectorAll('.select')[1].value
  console.log(selectTo);
  let k = getCourse(selectFrom, selectTo)
  console.log(k);
  output.innerText = `${Math.round(input.value * k * 1000) / 1000}`
}

