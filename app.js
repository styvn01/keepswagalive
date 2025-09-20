
async function loadMerch() {
  try {
    const res = await fetch('merch.json');
    const items = await res.json();
    const grid = document.getElementById('merchGrid');
    grid.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'merch-card';
      card.innerHTML = `
        <img class="merch-img" src="${item.imgFront}" alt="${item.name}">
        <div class="merch-info">
          <h4>${item.name}</h4>
          <div class="price">$${item.price.toFixed(2)}</div>
          <div class="pay-buttons">
            <button class="pay paypal" data-id="${item.id}" data-price="${item.price}">PayPal</button>
            <button class="pay paystack" data-id="${item.id}" data-price="${item.price}">Paystack</button>
            <button class="pay stripe" data-id="${item.id}" data-price="${item.price}">Stripe</button>
          </div>
        </div>`;
      grid.appendChild(card);
    });

    document.body.addEventListener('click', async (e) => {
      if (e.target.matches('.pay.paypal')) {
        e.preventDefault();
        const price = e.target.dataset.price;
        const r = await fetch('/.netlify/functions/create-paypal-order', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({amount: price})});
        const d = await r.json();
        if (d.approveUrl) window.location = d.approveUrl; else alert('PayPal error');
      }
      if (e.target.matches('.pay.paystack')) {
        e.preventDefault();
        const id = e.target.dataset.id; const price = e.target.dataset.price;
        const email = prompt('Enter your email for Paystack') || 'customer@example.com';
        const r = await fetch('/.netlify/functions/init-paystack', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, amount: price, itemId: id})});
        const d = await r.json();
        if (d.authorization_url) window.location = d.authorization_url; else alert('Paystack error');
      }
      if (e.target.matches('.pay.stripe')) {
        e.preventDefault();
        const id = e.target.dataset.id;
        const r = await fetch('/.netlify/functions/create-stripe-session', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({itemId: id})});
        const d = await r.json();
        if (d.url) window.location = d.url; else alert('Stripe error');
      }
    });
  } catch (err) { console.error(err); }
}

function smoothScrollInit() {
  document.querySelectorAll('.nav-center a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
  const loginBtn = document.getElementById('loginBtn');
  loginBtn.addEventListener('click', () => {
    if (window.netlifyIdentity) netlifyIdentity.open(); else document.getElementById('authModal').style.display='flex';
  });
  const fanBtn = document.getElementById('fanclubBtn');
  if (fanBtn) fanBtn.addEventListener('click', () => { if (window.netlifyIdentity) netlifyIdentity.open('signup'); else document.getElementById('authModal').style.display='flex'; });
  const close = document.querySelector('.close');
  if (close) close.addEventListener('click', () => document.getElementById('authModal').style.display='none');
}

document.addEventListener('DOMContentLoaded', () => {
  loadMerch();
  smoothScrollInit();
});
