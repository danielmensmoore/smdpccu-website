// Shared scripts for every page: scroll fade-in, Tawk.to live chat, cookie consent.
// Load at the end of <body>, after any page-specific inline script.

// Scroll fade-in
(function(){
  var els = document.querySelectorAll('.sf');
  if (!els.length) return;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(x){ if (x.isIntersecting) x.target.classList.add('in'); });
  }, { threshold: .1 });
  els.forEach(function(el){ obs.observe(el); });
})();

// Tawk.to live chat — only loaded once cookies are accepted
function loadTawkTo(){
  if (window.Tawk_API) return;
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='https://embed.tawk.to/69ac98e14be8191c38d13a77/1jj53ad12';
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
}

// Cookie consent — pages without a #cookieBanner (e.g. 404) skip chat entirely
(function(){
  var KEY='smdpccu_cookie_consent';
  var banner=document.getElementById('cookieBanner');
  if (!banner) return;
  var accepted=false;
  try { accepted = localStorage.getItem(KEY)==='accepted'; } catch(e){}
  if (accepted) { loadTawkTo(); }
  else { banner.classList.add('show'); }
  var btn=document.getElementById('cookieAccept');
  if (btn) btn.addEventListener('click', function(){
    try { localStorage.setItem(KEY,'accepted'); } catch(e){}
    banner.classList.remove('show');
    loadTawkTo();
  });
})();
