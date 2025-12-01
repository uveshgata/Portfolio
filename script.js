// ========== FOOTER YEAR ========== //
const yearFooter = document.getElementById('yearFooter');
if (yearFooter) {
  yearFooter.textContent = new Date().getFullYear();
}

// ========== VIEWS COUNTER (LOCAL) ========== //
const viewsCountEl = document.getElementById('viewsCount');
if (viewsCountEl && typeof Storage !== 'undefined') {
  const viewsKey = 'cw_views';
  let views = Number(localStorage.getItem(viewsKey) || 0);
  views += 1;
  localStorage.setItem(viewsKey, views);
  viewsCountEl.textContent = views.toLocaleString() + ' views';
}

// ========== THEME TOGGLE ========== //
const themeToggle = document.getElementById('themeToggle');

function getStoredTheme() {
  try {
    return localStorage.getItem('cw_theme');
  } catch {
    return null;
  }
}

function setStoredTheme(value) {
  try {
    localStorage.setItem('cw_theme', value);
  } catch {
    // ignore if storage blocked
  }
}

// Apply saved theme on load
if (themeToggle) {
  const savedTheme = getStoredTheme();
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    document.querySelectorAll("nav a").foreach(link=>{link.style.color="#071226";});
    themeToggle.textContent = '☾';
  } else {
    themeToggle.textContent = '☼';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');
    themeToggle.textContent = isLight ? '☾' : '☼';
    setStoredTheme(isLight ? 'light' : 'dark');
  });
}

// ========== SUBSCRIBE LOGIC ========== //
const subBtn = document.getElementById('subscribeBtn');
const subEmail = document.getElementById('subscribeEmail');
const subMsg = document.getElementById('subMsg');

function isEmailValid(email) {
  // basic email pattern
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setSubMessage(text, type = 'info') {
  if (!subMsg) return;
  subMsg.textContent = text;
  subMsg.className = 'sub-message ' + type;
}

if (subBtn && subEmail && subMsg) {
  subBtn.addEventListener('click', () => {
    const email = subEmail.value.trim();

    if (!email) {
      setSubMessage('Please enter your email address.', 'error');
      return;
    }

    if (!isEmailValid(email)) {
      setSubMessage('Please enter a valid email address.', 'error');
      return;
    }

    // store in localStorage (client-side only)
    let existing = [];
    if (typeof Storage !== 'undefined') {
      try {
        existing = JSON.parse(localStorage.getItem('cw_subscribers') || '[]');
      } catch {
        existing = [];
      }
    }

    if (!existing.includes(email)) {
      existing.push(email);
      try {
        localStorage.setItem('cw_subscribers', JSON.stringify(existing));
      } catch {
        // ignore storage errors
      }
      setSubMessage('Thanks! You are subscribed locally.', 'success');
    } else {
      setSubMessage('This email is already subscribed.', 'error');
    }

    // open mailto so user can send details
    const mailto =
      'mailto:uveshgata@gmail.com' +
      '?subject=Data%20Science%20Query' +
      '&body=Hi%20Uvesh%2C%0A%0AI%20have%20a%20question%20about%20...';
    window.open(mailto, '_blank');
  });

  // allow Enter key on email input
  subEmail.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      subBtn.click();
    }
  });
}

