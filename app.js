const SUPABASE_URL = 'https://uhlxjbnzjxmvepqqiblb.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_8w4Mjwha6bANdd6dbotf8w_7qZeGHUL';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const fallbackStyles = [
['Mythology & Ancient Art',['Greek Mythology','Norse Mythology','Egyptian Mythology','Roman Mythology','Gods & Goddesses','Mythical Creatures']],
['Fine Line & Minimalist',['Fine-line tattoos','Minimalist tattoos','Small meaningful tattoos','Symbols','Initials','Dates']],
['Black & Grey',['Realistic black & grey','Portrait tattoos','Dark art','Religious imagery','Skulls','Animals']],
['Realism',['Portrait realism','Animal realism','Nature realism','Eye tattoos','Memorial portraits','Realistic flowers']],
['Floral & Botanical',['Roses','Lotus flowers','Sunflowers','Lilies','Wildflowers','Vines']],
['Animals & Wildlife',['Lions','Wolves','Eagles','Snakes','Tigers','Butterflies']],
['Spiritual & Symbolic',['Angels','Crosses','Religious symbols','Guardian angels','Sacred imagery','Memorial tattoos']],
['Lettering & Quotes',['Names','Dates','Personal quotes','Inspirational words','Roman numerals','Memorial messages']],
['Dark & Alternative',['Gothic','Dark fantasy','Skull designs','Demonic-inspired artwork','Horror artwork','Blackwork']],
['Custom Tattoos',['Your idea','Custom-designed artwork','Personal meaning']]
];
const fallbackPrices=[['Small Tattoos','Starting at $[EDITABLE PRICE]'],['Medium Tattoos','Starting at $[EDITABLE PRICE]'],['Large Tattoos','Starting at $[EDITABLE PRICE]'],['Custom Designs','Starting at $[EDITABLE PRICE]'],['Portrait Tattoos','Starting at $[EDITABLE PRICE]'],['Sleeves','Starting at $[EDITABLE PRICE]'],['Cover-Ups','Starting at $[EDITABLE PRICE]']];
const fallbackPortfolio=[
['Fine Line','https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=900&q=80'],
['Black & Grey','https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&w=900&q=80'],
['Floral','https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=900&q=80'],
['Realism','https://images.unsplash.com/photo-1611267256771-9f3e8e5f2b6f?auto=format&fit=crop&w=900&q=80'],
['Dark Art','https://images.unsplash.com/photo-1590246814883-57c7d9f5f1c7?auto=format&fit=crop&w=900&q=80'],
['Custom','https://images.unsplash.com/photo-1542727365-19732a80dc40?auto=format&fit=crop&w=900&q=80']
];

const esc = s => String(s ?? '').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

document.querySelector('.menu-toggle').onclick=()=>document.querySelector('.nav').classList.toggle('open');
document.getElementById('year').textContent=new Date().getFullYear();

async function loadPublicContent(){
 let categories=fallbackStyles.map((x,i)=>({name:x[0],items:x[1],sort_order:i}));
 let services=fallbackPrices.map((x,i)=>({name:x[0],price_text:x[1],sort_order:i}));
 let portfolio=fallbackPortfolio.map((x,i)=>({title:x[0],image_url:x[1],sort_order:i}));
 try{
  const [c,s,p]=await Promise.all([
   supabaseClient.from('tattoo_categories').select('name,items,sort_order').eq('active',true).order('sort_order'),
   supabaseClient.from('services').select('name,price_text,sort_order').eq('active',true).order('sort_order'),
   supabaseClient.from('portfolio_items').select('title,image_url,sort_order').eq('active',true).order('sort_order')
  ]);
  if(!c.error && c.data?.length) categories=c.data;
  if(!s.error && s.data?.length) services=s.data;
  if(!p.error && p.data?.length) portfolio=p.data;
 }catch(e){ console.warn('Supabase content fallback:',e); }
 const sg=document.getElementById('style-grid'), ps=document.getElementById('pricing-grid'), pg=document.getElementById('portfolio-grid'), bs=document.getElementById('booking-style');
 sg.innerHTML=''; ps.innerHTML=''; pg.innerHTML=''; bs.innerHTML='';
 categories.forEach(x=>{
  const items=Array.isArray(x.items)?x.items:[];
  sg.insertAdjacentHTML('beforeend',`<article class="style-card"><h3>${esc(x.name)}</h3><p>Explore ${esc(String(x.name).toLowerCase())} tattoo ideas.</p><ul>${items.slice(0,6).map(i=>`<li>${esc(i)}</li>`).join('')}</ul></article>`);
  bs.insertAdjacentHTML('beforeend',`<option>${esc(x.name)}</option>`);
 });
 services.forEach(x=>ps.insertAdjacentHTML('beforeend',`<article class="price-card"><h3>${esc(x.name)}</h3><div class="price">${esc(x.price_text)}</div></article>`));
 portfolio.forEach(x=>pg.insertAdjacentHTML('beforeend',`<div class="portfolio-item"><img loading="lazy" src="${esc(x.image_url)}" alt="${esc(x.title)} tattoo example"><span class="portfolio-label">${esc(x.title)}</span></div>`));
}
loadPublicContent();

const loc=document.getElementById('location-type'), addr=document.getElementById('home-address-wrap');
loc.addEventListener('change',()=>addr.hidden=loc.value!=='Home Service');

document.getElementById('booking-form').addEventListener('submit',async e=>{
 e.preventDefault(); const form=e.currentTarget,msg=document.getElementById('form-message');
 const data=Object.fromEntries(new FormData(form).entries());
 const payload={full_name:data.full_name,email:data.email,phone:data.phone,contact_method:data.contact_method,tattoo_style:data.style,tattoo_description:data.tattoo_description,placement:data.placement,approximate_size:data.size,color_preference:data.color_preference,budget:data.budget,preferred_date:data.preferred_date||null,preferred_time:data.preferred_time||null,location_type:data.location_type,home_service_address:data.home_service_address||null,reference_image_url:data.reference_image_url||null};
 msg.textContent='Submitting your request…';
 const {error}=await supabaseClient.from('booking_applications').insert(payload);
 if(error){console.error(error);msg.textContent='We could not submit the request right now. Please try again or contact Pink Cindy Tattoo on WhatsApp.';msg.style.color='#ff6b6b';return;}
 form.reset(); addr.hidden=true; msg.textContent='Request received! Pink Cindy Tattoo will review it and contact you before any appointment is confirmed.'; msg.style.color='#ff4d94';
});
