const buttons = document.querySelectorAll(".button");
const input = document.querySelector(".app__input-field");
const body = document.querySelector('body')
const selects = document.querySelectorAll('.select')

let output = document.querySelector('.app__output-value')

let currentDate = new Date().toLocaleDateString()
document.querySelector('.app__output').dataset.day = `Курс станом на ${currentDate}`
//====================Получение курса валют===========================

async function getCourse() {
  let selectFrom = document.querySelectorAll('.select')[0].value
  let selectTo = document.querySelectorAll('.select')[1].value
  let symbol = selectTo === 'USD' ? '$' :
    selectTo === 'UAH' ? '₴' : '€';
  console.log('From: ', selectFrom);
  console.log('To: ', selectTo);

  let itemName = `${selectFrom} to ${selectTo}`
  console.log('Item name: ', itemName);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ff7552500dmshede3f1b3edbacd8p1ed3f3jsn5ca1b30e526c',
      'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
    }
  };

  let course

  if (sessionStorage.getItem(itemName)) {
    course = +sessionStorage.getItem(itemName)
    let result = Math.round(input.value * course * 1000) / 1000
    output.innerHTML = `${result} ${symbol}`
    return
  }

  fetch(`https://currency-exchange.p.rapidapi.com/exchange?from=${selectFrom}&to=${selectTo}&q=1.0`, options)
    .then(response => response.json())
    .then(response => {
      sessionStorage.setItem(itemName, response)
      console.log(response)
      let result = Math.round(input.value * response * 1000) / 1000
      console.log(result)
      output.innerHTML = `${result} ${symbol}`

    })
    .catch(err => console.error(err));

}


//=======================Заполнение формы ввода============================

buttons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    if (!button.classList.contains("reset")) {
      input.value += this.innerText
      getCourse()
      console.log(input.value);
    } else if (button.classList.contains("reset")) {
      input.value = '0'
      getCourse()
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

input.oninput = getCourse;
selects.forEach(select => {
  select.addEventListener('input', () => {
    getCourse()
  })
})