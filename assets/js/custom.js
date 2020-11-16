const cookieWrapper = document.getElementById('fortuneCookie');
const cookie = document.getElementById('cookie');
const getNew = document.getElementById('new');
const flip = document.getElementById('flip');
const fortune = document.body.querySelector('.fortune');
const numbers = document.body.querySelector('.numbers');
const paper = document.body.querySelector('.paper-wrapper');
const speed = 500;
// http://fortunecookieapi.herokuapp.com/v1/cookie
const fetchFortune = () => {
  fetch('https://fortunecookieapi.herokuapp.com/v1/cookie')
  .then(response => {
    return response.json();
  })
  .then( c => {
    console.log(c[0].fortune.message)
    fortune.innerHTML = c[0].fortune.message;
    numbers.innerHTML = 'Lucky numbers: ' + c[0].lotto.numbers;
  });
}
const showFortune = () => {
  cookieWrapper.classList.add('open');
  cookie.disabled = true;
};
fetchFortune();
cookie.addEventListener('click', showFortune, false);
flip.addEventListener('click', e => {
  paper.classList.toggle('flip');
  flip.classList.toggle('front');
  flip.classList.toggle('back');
});
getNew.addEventListener('click', e => {
  cookieWrapper.classList.add('clear');
  window.setTimeout(() => {
    paper.classList.remove('flip');
    flip.className = 'small front';
    cookieWrapper.classList.remove('clear');
    cookieWrapper.classList.remove('open');
    cookieWrapper.classList.add('drop');
    window.setTimeout(() => {
      cookieWrapper.classList.remove('drop');
      fortune.innerHTML = '';
      numbers.innerHTML = '';
      fetchFortune();
    }, speed);
  }, speed);
  cookie.disabled = false;
}, false);