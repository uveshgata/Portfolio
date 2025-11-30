// update year and simple subscribe logic (no server)
document.getElementById('yearFooter').textContent = new Date().getFullYear();

// simple views counter stored locally (optional)
const viewsKey = 'cw_views';
let views = Number(localStorage.getItem(viewsKey) || 0);
views += 1;
localStorage.setItem(viewsKey, views);
document.getElementById('viewsCount').textContent = views.toLocaleString() + ' views';

// subscribe button logic
const subBtn = document.getElementById('subscribeBtn');
const subEmail = document.getElementById('subscribeEmail');
const subMsg = document.getElementById('subMsg');

function isEmailValid(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

subBtn.addEventListener('click', ()=> {
  const email = subEmail.value.trim();
  if(!email){
    subMsg.textContent = 'Please enter your email address.';
    return;
  }
  if(!isEmailValid(email)){
    subMsg.textContent = 'Please enter a valid email address.';
    return;
  }

function setSubMessage(text, type = 'info') {
  subMsg.textContent = text;
  subMsg.className = 'sub-message ' + type;
}

subBtn.addEventListener('click', ()=> {
  const email = subEmail.value.trim();

  if (!email) {
    setSubMessage('Please enter your email address.', 'error');
    return;
  }
  if (!isEmailValid(email)) {
    setSubMessage('Please enter a valid email address.', 'error');
    return;
  }

  const existing = JSON.parse(localStorage.getItem('cw_subscribers') || '[]');
  if (!existing.includes(email)) {
    existing.push(email);
    localStorage.setItem('cw_subscribers', JSON.stringify(existing));
    setSubMessage('Thanks! You are subscribed locally.', 'success');
  } else {
    setSubMessage('This email is already subscribed.', 'error');
  }

  const mailto =
    'mailto:uveshgata@gmail.com' +
    '?subject=Data%20Science%20Query' +
    '&body=Hi%20Uvesh%2C%0A%0AI%20have%20a%20question%20about%20...';
  window.open(mailto, '_blank');
});


// small email validation allow copy paste with Enter key too
subEmail.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter') { subBtn.click(); }
});


x
