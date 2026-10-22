
(()=>{
'use strict';

const cfg = window.TH_CONFIG || {};
const packages = window.TH_PACKAGES || [];
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];

const money = p => p.price
  ? `₹${Number(p.price).toLocaleString('en-IN')}`
  : '₹0000';

const duration = p =>
  `${p.durationDays} days${p.durationNights!==null&&p.durationNights!==undefined?` / ${p.durationNights} nights`:''}`;

const link = p => `packages/${p.slug}.html`;

const safe = s => String(s??'').replace(/[&<>"']/g,c=>({
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[c]));

function wa(message){
  return `https://wa.me/${cfg.whatsapp||'919371131975'}?text=${encodeURIComponent(message)}`;
}

function bookMessage(p){
  return `Hi Timeless Heritage! I'm interested in the ${p.title} (${duration(p)}). Please share the detailed itinerary, upcoming departure dates, availability and booking process.`;
}

function card(p){
  const href=link(p);
  return `<article class="journey-card">
    <a href="${href}" aria-label="View ${safe(p.title)}">
      <div class="image-frame" data-label="Add ${safe(p.image)}">
        <img data-file="assets/images/${safe(p.image)}" alt="${safe(p.title)} — add destination photograph" loading="lazy">
      </div>
    </a>
    <div class="card-body">
      <div class="card-meta">
        <span class="category-label">${safe(p.category)}</span>
        <span>${duration(p)}</span>
      </div>
      <h3><a href="${href}">${safe(p.title)}</a></h3>
      <p>${safe(p.description)}</p>
      <div class="card-bottom">
        <div class="price">${money(p)}<small>per person${p.priceNote?` · ${safe(p.priceNote)}`:''}</small></div>
        <a class="text-link" href="${href}">View Journey ↗</a>
      </div>
    </div>
  </article>`;
}

function relatedCard(p){
  return `<a class="related-card" href="${p.slug}.html">
    <div class="image-frame" data-label="Add ${safe(p.image)}">
      <img data-file="../assets/images/${safe(p.image)}" alt="${safe(p.title)} — add destination photograph" loading="lazy">
    </div>
    <h3>${safe(p.title)}</h3>
    <p>${duration(p)} · ${money(p)} / person</p>
    <span class="text-link">View Journey ↗</span>
  </a>`;
}

function resolveImages(){
  $$('img[data-file]').forEach(img=>{
    const file=img.dataset.file;
    const path=location.pathname.includes('/packages/')?'../'+file:file;
    img.src=path;
    img.addEventListener('error',()=>{
      img.removeAttribute('src');
      img.style.display='none';
    },{once:true});
  });
}

function renderCards(){
  const featured=$('#featured-grid');

  if(featured){
    featured.innerHTML=packages
      .slice(0,Number(featured.dataset.featured)||6)
      .map(p=>card(p)).join('');
  }

  const grid=$('#journey-grid');
  if(!grid)return;

  const search=$('#package-search');
  const sort=$('#package-sort');
  const filters=$('#category-filters');
  const empty=$('#empty-state');
  const count=$('#results-count');

  let active=new URLSearchParams(location.search).get('category')||'All';
  const cats=['All',...new Set(packages.map(p=>p.category))];

  filters.innerHTML=cats.map(c=>
    `<button class="filter-chip" type="button" data-category="${safe(c)}" aria-pressed="${c===active}">${safe(c)}</button>`
  ).join('');

  function draw(){
    let list=packages.filter(p=>
      (active==='All'||p.category===active)&&
      (!search.value||[
        p.title,p.route,p.description,p.category,...p.highlights
      ].join(' ').toLowerCase().includes(search.value.toLowerCase()))
    );

    if(sort.value==='price-asc')
      list.sort((a,b)=>(a.price||Infinity)-(b.price||Infinity));

    if(sort.value==='price-desc')
      list.sort((a,b)=>(b.price||0)-(a.price||0));

    if(sort.value==='duration')
      list.sort((a,b)=>a.durationDays-b.durationDays);

    grid.innerHTML=list.map(p=>card(p)).join('');
    empty.hidden=!!list.length;
    count.textContent=`Showing ${list.length} of ${packages.length} journeys`;
    resolveImages();
  }

  filters.addEventListener('click',e=>{
    const b=e.target.closest('[data-category]');
    if(!b)return;
    active=b.dataset.category;
    $$('.filter-chip',filters).forEach(x=>
      x.setAttribute('aria-pressed',String(x===b))
    );
    draw();
  });

  search.addEventListener('input',draw);
  sort.addEventListener('change',draw);

  if(!cats.includes(active))active='All';

  $$('.filter-chip',filters).forEach(x=>
    x.setAttribute('aria-pressed',String(x.dataset.category===active))
  );

  draw();
}

function renderRelated(){
  const el=$('[data-related]');
  if(!el)return;

  const current=packages.find(p=>p.id===el.dataset.related);
  if(!current)return;

  let list=current.related
    .map(id=>packages.find(p=>p.id===id))
    .filter(Boolean);

  for(const p of packages){
    if(list.length>=3)break;
    if(p.id!==current.id&&!list.includes(p))list.push(p);
  }

  el.innerHTML=list.slice(0,3).map(relatedCard).join('');
}

function renderFaqs(){
  const homeFaq=[
    ['How do I enquire about a trip?','Open a package page and use Book Now, or complete the enquiry form. The details are prepared in WhatsApp for you to review and send.'],
    ['How do I receive the detailed itinerary?','Contact the team on WhatsApp and request the detailed itinerary for your selected journey.'],
    ['What does the displayed price mean?','Prices are shown per person when supplied in the package source. Some prices are conditional, and ₹0000 marks an unpriced placeholder. Confirm the final quote before booking.'],
    ['How can I confirm availability?','Ask the team for current dates and availability. A displayed itinerary or an enquiry does not confirm a booking.'],
    ['Are flights and other services included?','Inclusions differ by package. Check the individual package’s inclusion and exclusion lists; ask the team to confirm any unclear item.'],
    ['Can I ask about a customized journey?','Yes. Use the general enquiry form or WhatsApp CTA to share your preferred destination and requirements.']
  ];

  const pkgFaq=[
    ['How do I enquire about this journey?','Use Book Now to open WhatsApp with a message about this specific package. Review the message and send it if you wish.'],
    ['Is a booking confirmed when I click Book Now?','No. The button opens an enquiry in WhatsApp. Confirm availability, payment details and booking confirmation directly with the team.'],
    ['Are the dates and availability current?','Ask the team to confirm upcoming departure dates and availability. Any past brochure date is not presented as an upcoming departure.'],
    ['What is included in the price?','Refer to the inclusion and exclusion lists on this page. Confirm any unclear item and the final price with the team before booking.']
  ];

  $$('[data-faqs]').forEach(el=>{
    const list=el.dataset.faqs==='package'?pkgFaq:homeFaq;

    el.innerHTML=list.map(([q,a])=>
      `<div class="faq-item">
        <button class="faq-question" type="button" aria-expanded="false">
          <span>${q}</span><span aria-hidden="true">+</span>
        </button>
        <div class="faq-answer" hidden><p>${a}</p></div>
      </div>`
    ).join('');

    el.addEventListener('click',e=>{
      const b=e.target.closest('.faq-question');
      if(!b)return;

      const ans=b.nextElementSibling;
      const open=b.getAttribute('aria-expanded')==='true';

      b.setAttribute('aria-expanded',String(!open));
      b.lastElementChild.textContent=open?'+':'−';
      ans.hidden=open;
    });
  });
}

function forms(){
  $$('.whatsapp-form').forEach(form=>
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(!form.reportValidity())return;

      const data=new FormData(form);

      const message=[
        `Hi Timeless Heritage! I'd like to enquire about a journey.`,
        `Name: ${data.get('name')}`,
        `Preferred journey / destination: ${data.get('destination')}`,
        `Travellers: ${data.get('travellers')}`,
        data.get('date')?`Approximate travel date: ${data.get('date')}`:'',
        `Message: ${data.get('message')}`
      ].filter(Boolean).join('\n');

      window.open(wa(message),'_blank','noopener,noreferrer');
    })
  );
}

function bookingLinks(){
  $$('.book-now').forEach(a=>{
    const p=packages.find(p=>p.id===a.dataset.packageId);
    if(p)a.href=wa(bookMessage(p));
  });
}

function menu(){
  const b=$('.menu-toggle');
  const nav=$('#main-nav');
  if(!b||!nav)return;

  b.addEventListener('click',()=>{
    const open=b.getAttribute('aria-expanded')!=='true';
    b.setAttribute('aria-expanded',String(open));
    nav.classList.toggle('open',open);
    b.textContent=open?'Close ×':'Menu ☰';
  });
}

function year(){
  $$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
}

function email(){
  const value=(cfg.email||'').trim();
  if(!value||value.includes('[')||value.includes('CHANGE-ME'))return;

  $$('[data-email-link]').forEach(el=>{
    el.href='mailto:'+value;
    el.textContent=value;
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  menu();
  renderCards();
  renderRelated();
  renderFaqs();
  forms();
  bookingLinks();
  year();
  email();
  resolveImages();
});

})();
