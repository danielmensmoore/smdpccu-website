// ===== LOGO INJECTION =====
const LOGO_SRC = 'images/logo.jpg';

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ===== SCROLL SPY (active nav link) =====
(function () {
  const sectionIds = ['home', 'about', 'services', 'loans-savings', 'calculators', 'gallery', 'news', 'contact'];

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    let current = 'home';
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });
    document.querySelectorAll('.nav-links > li > a').forEach(a => {
      a.classList.remove('active');
      const href = a.getAttribute('href');
      if (href === '#' + current) a.classList.add('active');
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
})();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('navLinks').classList.remove('open');
    }
  });
});

// ===== HERO SLIDER =====
(function () {
  let current = 0;
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  let timer;

  window.goToHeroSlide = function (n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  };

  window.moveHeroSlide = function (dir) {
    goToHeroSlide(current + dir);
    resetTimer();
  };

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goToHeroSlide(current + 1), 5500);
  }

  resetTimer();
})();

// ===== REVEAL ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== LOAN/SAVINGS TABS =====
function switchTab(tab) {
  document.querySelectorAll('.ls-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.ls-content').forEach(c => c.classList.remove('active'));
  if (tab === 'loans') {
    document.querySelectorAll('.ls-tab')[0].classList.add('active');
    document.getElementById('loans-tab').classList.add('active');
  } else {
    document.querySelectorAll('.ls-tab')[1].classList.add('active');
    document.getElementById('savings-tab').classList.add('active');
  }
}

// ===== LOAN RULES DATA (per official Loans Policy, December 2024) =====
const loanRules = {
  within_savings: { type: 'cap_at_savings', method: 'reducing_balance', monthly_rate: 0.01, label: 'Loan Within Savings', maxTenor: 12 },
  normal_2x:      { multiplier: 2, basis: 'savings', method: 'reducing_balance', monthly_rate: 0.03, label: 'Normal Loan (2× savings)', maxTenor: 24 },
  normal_3x:      { multiplier: 3, basis: 'savings', method: 'reducing_balance', monthly_rate: 0.04, label: 'Normal Loan (3× savings)', maxTenor: 24 },
  susu_2x:        { multiplier: 2, basis: 'savings', method: 'straight_line', monthly_rate: 0.03, label: 'Susu Loan (2× savings)', maxTenor: 12, ceiling: 150000 },
  susu_3x:        { multiplier: 3, basis: 'savings', method: 'straight_line', monthly_rate: 0.04, label: 'Susu Loan (3× savings)', maxTenor: 12, ceiling: 150000 },
  business:       { multiplier: 5, basis: 'savings', method: 'reducing_balance', monthly_rate: 0.05, label: 'Business Loan', maxTenor: 24 },
  salary:         { type: 'dsr', dsr: 0.4, method: 'reducing_balance', monthly_rate: 0.04, label: 'Salary Workers Loan', maxTenor: 18 },
  controller:     { type: 'affordability', method: 'reducing_balance', monthly_rate: 0.04, label: 'Controller / DAS Loan', maxTenor: 18 },
  emergency:      { type: 'total_assets', assets_pct: 0.20, method: 'reducing_balance', monthly_rate: 0.05, label: 'Emergency Loan', maxTenor: 6, ceiling: 500000 },
  special:        { type: 'total_assets', assets_pct: 0.20, method: 'reducing_balance', monthly_rate: 0.05, label: 'Special Purpose Loan', maxTenor: 6, ceiling: 500000 }
};

// ===== FD TIERED RATES =====
const fdTiers = [
  { min: 2000, max: 499999.99, rates: { 91: 5, 182: 5.5, 365: 6 } },
  { min: 500000, max: 999999.99, rates: { 91: 6, 182: 6.5, 365: 7 } },
  { min: 1000000, max: null, rates: { 91: 6.5, 182: 7, 365: 8 } }
];

function updateLoanFields() {
  const type = document.getElementById('loanType').value;
  const rule = loanRules[type];
  document.getElementById('savingsGroup').style.display = 'none';
  document.getElementById('salaryGroup').style.display = 'none';
  document.getElementById('assetsGroup').style.display = 'none';

  if (type === 'salary' || type === 'controller') {
    document.getElementById('salaryGroup').style.display = 'block';
    document.getElementById('salaryLabel').textContent =
      type === 'controller' ? 'Monthly Deduction Amount (GH₵)' : 'Net Monthly Salary (GH₵)';
  } else if (type === 'emergency' || type === 'special') {
    document.getElementById('assetsGroup').style.display = 'block';
  } else {
    document.getElementById('savingsGroup').style.display = 'block';
    document.getElementById('savingsLabel').textContent =
      type.startsWith('susu') ? 'Total Susu Savings (GH₵)' : 'Total Savings with Us (GH₵)';
  }

  // Disable tenor options that exceed this loan's max
  const termSelect = document.getElementById('loanTerm');
  Array.from(termSelect.options).forEach(opt => {
    opt.disabled = parseInt(opt.value) > rule.maxTenor;
  });
  if (parseInt(termSelect.value) > rule.maxTenor) {
    const valid = Array.from(termSelect.options).filter(o => !o.disabled);
    if (valid.length) termSelect.value = valid[valid.length - 1].value;
  }

  document.getElementById('loanResult').classList.remove('show');
}

// ===== LOAN ELIGIBILITY =====
function checkLoanEligibility() {
  const type = document.getElementById('loanType').value;
  const rule = loanRules[type];
  const savings = parseFloat(document.getElementById('loanSavings').value) || 0;
  const salary  = parseFloat(document.getElementById('loanSalary').value)  || 0;
  const assets  = parseFloat(document.getElementById('loanAssets').value)  || 0;
  const term    = parseInt(document.getElementById('loanTerm').value);

  // Validation
  const salaryTypes = ['salary', 'controller'];
  const assetsTypes = ['emergency', 'special'];
  if (salaryTypes.includes(type) && !salary) {
    alert('Please enter your ' + (type === 'controller' ? 'monthly deduction amount' : 'net monthly salary') + '.');
    return;
  }
  if (assetsTypes.includes(type) && !assets) {
    alert('Please enter your total assets with us.'); return;
  }
  if (!salaryTypes.includes(type) && !assetsTypes.includes(type) && !savings) {
    alert('Please enter your total savings.'); return;
  }
  if (term > rule.maxTenor) {
    alert('Maximum repayment period for ' + rule.label + ' is ' + rule.maxTenor + ' months.'); return;
  }

  const r = rule.monthly_rate;
  let maxAmount = 0;
  let eligibilityNote = '';

  // Calculate max eligible amount
  if (type === 'salary') {
    const maxMonthly = salary * rule.dsr;
    maxAmount = maxMonthly * (1 - Math.pow(1 + r, -term)) / r;
    eligibilityNote = `Based on 40% DSR of net salary (GH₵ ${salary.toLocaleString('en')})`;
  } else if (type === 'controller') {
    // User enters monthly deduction; back-calculate max loan
    maxAmount = salary * (1 - Math.pow(1 + r, -term)) / r;
    eligibilityNote = `Based on monthly deduction of GH₵ ${salary.toLocaleString('en')}`;
  } else if (rule.type === 'cap_at_savings') {
    maxAmount = savings;
    eligibilityNote = `Up to 100% of your savings (GH₵ ${savings.toLocaleString('en')})`;
  } else if (rule.type === 'total_assets') {
    const raw = assets * rule.assets_pct;
    maxAmount = Math.min(raw, rule.ceiling);
    eligibilityNote = `20% of total assets (GH₵ ${assets.toLocaleString('en')})` +
      (raw > rule.ceiling ? ` — capped at GH₵ ${rule.ceiling.toLocaleString('en')}` : '');
  } else {
    // savings × multiplier with optional ceiling
    const raw = savings * rule.multiplier;
    maxAmount = rule.ceiling ? Math.min(raw, rule.ceiling) : raw;
    eligibilityNote = `${rule.multiplier}× your savings (GH₵ ${savings.toLocaleString('en')})` +
      (rule.ceiling && raw > rule.ceiling ? ` — capped at GH₵ ${rule.ceiling.toLocaleString('en')}` : '');
  }

  // Calculate repayment schedule
  let monthlyPayment = 0;
  let totalInterest = 0;
  let rateDisplay = '';
  if (rule.method === 'reducing_balance') {
    monthlyPayment = maxAmount * r * Math.pow(1 + r, term) / (Math.pow(1 + r, term) - 1);
    totalInterest = (monthlyPayment * term) - maxAmount;
    rateDisplay = (r * 100).toFixed(0) + '% per month (reducing balance)';
  } else {
    // straight-line (flat): interest on full principal each month
    const interest = maxAmount * r;
    monthlyPayment = (maxAmount / term) + interest;
    totalInterest = interest * term;
    rateDisplay = (r * 100).toFixed(0) + '% per month (straight-line)';
  }

  document.getElementById('loanResultValue').textContent = 'GH₵ ' + maxAmount.toLocaleString('en', {maximumFractionDigits: 2});
  document.getElementById('loanResultDetails').innerHTML =
    `<strong>${rule.label}</strong><br>
     ${eligibilityNote}<br>
     Est. monthly repayment: <strong>GH₵ ${monthlyPayment.toLocaleString('en', {maximumFractionDigits: 2})}</strong><br>
     Total interest: <strong>GH₵ ${totalInterest.toLocaleString('en', {maximumFractionDigits: 2})}</strong><br>
     Rate: <strong>${rateDisplay}</strong> &bull; Term: <strong>${term} months</strong><br>
     <small style="color:var(--gray-400)">*Estimate only. Final approval subject to SMDPCCU policy and credit assessment.</small>`;
  document.getElementById('loanResult').classList.add('show');
}

// ===== FD RATE AUTO-DETECTION =====
function getFDRate(amount, days) {
  for (const tier of fdTiers) {
    if (amount >= tier.min && (tier.max === null || amount <= tier.max)) return tier.rates[days];
  }
  return null;
}

function updateFDRate() {
  const amount = parseFloat(document.getElementById('fdAmount').value) || 0;
  const days = document.getElementById('fdTerm').value;
  const rateInput = document.getElementById('fdRate');
  const rateLabel = document.getElementById('fdRateAuto');

  if (amount < 2000) {
    rateInput.value = 'Minimum deposit: GH₵ 2,000';
    rateLabel.textContent = 'below minimum';
    return;
  }
  const rate = getFDRate(amount, days);
  if (rate !== null) {
    rateInput.value = rate + '% per annum';
    rateLabel.textContent = rate + '% auto-detected';
  }
}

// ===== FIXED DEPOSIT CALCULATOR =====
function calculateFD() {
  const amount = parseFloat(document.getElementById('fdAmount').value);
  const days = parseInt(document.getElementById('fdTerm').value);

  if (!amount) { alert('Please enter a deposit amount.'); return; }
  if (amount < 2000) { alert('Minimum fixed deposit is GH₵ 2,000.'); return; }

  const rate = getFDRate(amount, days);
  const interest = amount * (rate / 100) * (days / 365);
  const maturity = amount + interest;

  // Maturity date
  const startDate = new Date();
  const maturityDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);
  const d = maturityDate.getDate();
  const ordinal = d + (d % 10 === 1 && d !== 11 ? 'st' : d % 10 === 2 && d !== 12 ? 'nd' : d % 10 === 3 && d !== 13 ? 'rd' : 'th');
  const month = maturityDate.toLocaleDateString('en-GB', { month: 'long' });
  const year = maturityDate.getFullYear();
  const maturityDateStr = ordinal + ' ' + month + ', ' + year;

  // Find tier label
  let tierLabel = '';
  for (const t of fdTiers) {
    if (amount >= t.min && (t.max === null || amount <= t.max)) {
      tierLabel = t.max === null
        ? 'GH₵ ' + t.min.toLocaleString('en') + ' and above'
        : 'GH₵ ' + t.min.toLocaleString('en') + ' – ' + t.max.toLocaleString('en');
      break;
    }
  }

  document.getElementById('fdResultValue').textContent = 'GH₵ ' + maturity.toLocaleString('en', {maximumFractionDigits: 2});
  document.getElementById('fdResultDetails').innerHTML =
    `Deposit: <strong>GH₵ ${amount.toLocaleString('en')}</strong> &bull; Tier: <strong>${tierLabel}</strong><br>
     Interest earned: <strong>GH₵ ${interest.toLocaleString('en', {maximumFractionDigits: 2})}</strong><br>
     Rate: <strong>${rate}% p.a.</strong> &bull; Term: <strong>${days} days</strong><br>
     Maturity date: <strong>${maturityDateStr}</strong><br>
     <small style="color:var(--gray-400)">*Rates effective February 2026. Simple interest basis.</small>`;
  document.getElementById('fdResult').classList.add('show');
}

// Init FD rate on load
updateFDRate();

// ===== GALLERY =====
let currentLightboxIndex = 0;
let visibleItems = [];
let currentAlbum = null;
let currentAlbumIndex = 0;

const albums = {
  'community-outreach': [
    'images/Yaase%20Community%20Outreach/1.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0220.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0221.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0222.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0223.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0226.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0229.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0230.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0234.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0239.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0240.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0242.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0243.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0244.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0245.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0247.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0248.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0249.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0250.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0251.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0252.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0253.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0254.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0256.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0257.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0258.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0259.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0260.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0261.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0263.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0264.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0265.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0266.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0267.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0268.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0269.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0270.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0271.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0272.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0280.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0286.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0293.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0295.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0299.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0301.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0303.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0304.jpg',
    'images/Yaase%20Community%20Outreach/IMG_0306.jpg'
  ]
};

function filterGallery(filter) {
  document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');

  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    const type = item.getAttribute('data-type') || '';
    if (filter === 'all' || type.includes(filter)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

function getVisibleItems() {
  return Array.from(document.querySelectorAll('.gallery-item')).filter(
    item => item.style.display !== 'none'
  );
}

function renderAlbumItem(item) {
  const files = albums[currentAlbum];
  const file = files[currentAlbumIndex];
  const title = item.getAttribute('data-title') || '';
  const date = item.getAttribute('data-date') || '';
  const isVideo = /\.(mov|mp4|webm)$/i.test(file);
  const content = document.getElementById('lightboxContent');

  if (isVideo) {
    content.innerHTML = `<video controls style="max-width:90vw;max-height:80vh;border-radius:var(--radius-md);outline:none;">
      <source src="${file}">
    </video>`;
  } else {
    content.innerHTML = `<img src="${file}" alt="${title}" style="max-width:90vw;max-height:80vh;object-fit:contain;border-radius:var(--radius-md);display:block;">`;
  }

  document.getElementById('lightboxCaption').textContent =
    title + (date ? ' \u2022 ' + date : '') + '  (' + (currentAlbumIndex + 1) + ' / ' + files.length + ')';
}

function openLightbox(index) {
  visibleItems = getVisibleItems();
  currentLightboxIndex = index;
  const item = visibleItems[index];
  if (!item) return;

  const album = item.getAttribute('data-album');
  if (album && albums[album]) {
    currentAlbum = album;
    currentAlbumIndex = 0;
    renderAlbumItem(item);
  } else {
    currentAlbum = null;
    const title = item.getAttribute('data-title') || '';
    const date = item.getAttribute('data-date') || '';
    const type = item.getAttribute('data-type') || '';
    const content = document.getElementById('lightboxContent');
    if (type.includes('videos')) {
      content.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:70vw;max-width:800px;height:50vh;background:var(--primary-dark);border-radius:var(--radius-md);">
        <i class="fas fa-video" style="font-size:64px;color:rgba(255,255,255,0.2);margin-bottom:16px;"></i>
        <p style="color:rgba(255,255,255,0.5);font-size:14px;">Video placeholder — upload your video to replace this</p>
      </div>`;
    } else {
      content.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:70vw;max-width:800px;height:60vh;background:linear-gradient(135deg,#0e2240,#2a5298);border-radius:var(--radius-md);">
        <i class="fas fa-image" style="font-size:80px;color:rgba(255,255,255,0.15);margin-bottom:16px;"></i>
        <p style="color:rgba(255,255,255,0.4);font-size:14px;">Photo placeholder — upload your image to replace this</p>
      </div>`;
    }
    document.getElementById('lightboxCaption').textContent = title + (date ? ' \u2022 ' + date : '');
  }

  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  currentAlbum = null;
}

function navLightbox(dir) {
  if (currentAlbum && albums[currentAlbum]) {
    const files = albums[currentAlbum];
    currentAlbumIndex = (currentAlbumIndex + dir + files.length) % files.length;
    renderAlbumItem(visibleItems[currentLightboxIndex]);
    return;
  }
  visibleItems = getVisibleItems();
  currentLightboxIndex += dir;
  if (currentLightboxIndex < 0) currentLightboxIndex = visibleItems.length - 1;
  if (currentLightboxIndex >= visibleItems.length) currentLightboxIndex = 0;
  openLightbox(currentLightboxIndex);
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navLightbox(-1);
  if (e.key === 'ArrowRight') navLightbox(1);
});
// ===== CONTACT FORM =====
const FORMSPREE_ID = 'mzdalber';

async function submitContactForm(event) {
  event.preventDefault();
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('contactSubmitBtn');
  const success = document.getElementById('contactSuccess');
  const error = document.getElementById('contactError');

  btn.disabled = true;
  btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin" style="margin-left:8px"></i>';
  success.style.display = 'none';
  error.style.display = 'none';

  try {
    const response = await fetch('https://formspree.io/f/' + FORMSPREE_ID, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    const data = await response.json();

    if (response.ok && !data.errors) {
      success.style.display = 'block';
      form.querySelectorAll('input, textarea').forEach(el => el.value = '');
    } else {
      error.style.display = 'block';
    }
  } catch (e) {
    error.style.display = 'block';
  }

  btn.disabled = false;
  btn.innerHTML = 'Send Message <i class="fas fa-paper-plane" style="margin-left:8px"></i>';
}
