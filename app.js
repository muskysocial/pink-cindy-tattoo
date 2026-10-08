const SUPABASE_URL='https://uhlxjbnzjxmvepqqiblb.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_8w4Mjwha6bANdd6dbotf8w_7qZeGHUL';
const supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
const fallbackStyles=[
['Mythology & Ancient Art',['Greek Mythology','Norse Mythology','Egyptian Mythology','Roman Mythology','Gods & Goddesses','Mythical Creatures','Valkyries','Medusa','Anubis','Zeus','Odin','Dragons','Phoenix']],
['Fine Line & Minimalist',['Fine-line tattoos','Minimalist tattoos','Small meaningful tattoos','Symbols','Initials','Dates','Coordinates','Tiny portraits','Simple lettering']],
['Black & Grey',['Realistic black & grey','Portrait tattoos','Dark art','Religious imagery','Skulls','Animals','Roses','Dramatic shading']],
['Realism',['Portrait realism','Animal realism','Nature realism','Eye tattoos','Memorial portraits','Realistic flowers','Realistic objects']],
['Floral & Botanical',['Roses','Lotus flowers','Sunflowers','Lilies','Wildflowers','Vines','Botanical designs','Floral sleeves']],
['Animals & Wildlife',['Lions','Wolves','Eagles','Snakes','Tigers','Butterflies','Birds','Bears','Horses']],
['Spiritual & Symbolic',['Angels','Crosses','Religious symbols','Guardian angels','Sacred imagery','Spiritual symbols','Memorial tattoos','Meaningful quotes']],
['Lettering & Quotes',['Names','Dates','Personal quotes','Inspirational words','Roman numerals','Handwritten lettering','Memorial messages']],
['Dark & Alternative',['Gothic','Dark fantasy','Skull designs','Demonic-inspired artwork','Horror artwork','Dark symbolism','Blackwork']],
['Custom Tattoos',['Your idea','Custom-designed artwork','Personal meaning']]
];
const fallbackPrices=[['Small Tattoos','Starting at $[EDITABLE PRICE]'],['Medium Tattoos','Starting at $[EDITABLE PRICE]'],['Large Tattoos','Starting at $[EDITABLE PRICE]'],['Custom Designs','Starting at $[EDITABLE PRICE]'],['Portrait Tattoos','Starting at $[EDITABLE PRICE]'],['Sleeves','Starting at $[EDITABLE PRICE]'],['Cover-Ups','Starting at $[EDITABLE PRICE]']];
const fallbackPortfolio=[['Fine Line','https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=900&q=80'],['Black & Grey','https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&w=900&q=80'],['Floral','https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=900&q=80'],['Realism','https://images.unsplash.com/photo-1611267256771-9f3e8e5f2b6f?auto=format&fit=crop&w=900&q=80'],['Dark Art','https://images.unsplash.com/photo-1590246814883-57c7d9f5f1c7?auto=format&fit=crop&w=900&q=80'],['Custom','https://images.unsplash.com/photo-1542727365-19732a80dc40?auto=format&fit=crop&w=900&q=80']];
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
async function getSetting(key, fallback){const {data,error}=await supabaseClient.from('site_settings').select('value').eq('key',key).maybeSingle();return !error&&data?.value?data.value:fallback;}
function setText(id,v){const e=document.getElementById(id);if(e)e.textContent=v??'';}
async function loadPublic(){
 const business=await getSetting('business',{name:'Pink Cindy Tattoo',slogan:'Ink Your Story. Wear Your Meaning.',location:'USA — By Appointment',whatsapp:'+1 742 380 8100',signal:'+1 732 925 9624',tiktok:'@pinkxytattoo',tiktok_url:'https://www.tiktok.com/@pinkxytattoo',hours:{}});
 const content=await getSetting('content',{});
 const policy=await getSetting('booking_policy',{standard_deposit:'70%',home_service_tattoo_deposit:'50%',home_service_fee:'$300',notice_hours:48,payment_method:'outside_website'});
 document.title=`${business.name||'Pink Cindy Tattoo'} | ${business.slogan||''}`;
 setText('brand-name',business.name||'Pink Cindy Tattoo');setText('hero-slogan',business.slogan||'Ink Your Story. Wear Your Meaning.');
 setText('hero-location',business.location||'USA — By Appointment');setText('hero-copy',content.hero_copy||'Meaningful fine-line pieces, powerful realism, mythology, black & grey, floral, symbolic and custom tattoo artistry designed around your vision.');
 setText('about-title',content.about_title||'Art with intention.');setText('about-copy',content.about_copy||'Pink Cindy Tattoo creates custom artwork around each customer’s individual story and vision — from delicate fine-line pieces to powerful realism, mythology, symbolic and dark alternative work.');
 setText('home-title',content.home_title||'Your space. Your story. Your appointment.');setText('home-copy',content.home_copy||`Home-service requests are available nationwide by appointment. A ${policy.home_service_fee||'$300'} service/travel fee applies in addition to the tattoo price.`);
 const std=policy.standard_deposit||'70%', home=policy.home_service_tattoo_deposit||'50%', fee=policy.home_service_fee||'$300';
 const bookingNote=document.querySelector('.booking-policy'); if(bookingNote) bookingNote.innerHTML=`<strong>Before submitting:</strong> A ${esc(std)} advance payment is required to secure a standard appointment after approval. Home-service requests require ${esc(home)} of the tattoo price plus the ${esc(fee)} travel/service fee before travel is arranged. Payment is handled outside this website using the payment instructions provided after approval.`;
 const feeNotice=document.querySelector('#pricing .notice'); if(feeNotice) feeNotice.innerHTML=`Home service carries an additional <strong>${esc(fee)} service/travel fee</strong>. See the Home Service section for requirements.`;
 const h=business.hours||{}; const hoursText=h.monday||'8:00 AM – 7:00 PM'; document.querySelectorAll('[data-hours]').forEach(e=>e.textContent=hoursText);
 const wa=(business.whatsapp||'').replace(/[^0-9]/g,''); const waLinks=document.querySelectorAll('a[href^="https://wa.me/"]');waLinks.forEach(a=>a.href=wa?`https://wa.me/${wa}`:'#');
 const sig=business.signal||''; document.querySelectorAll('[data-signal]').forEach(e=>e.textContent=`Signal: ${sig}`); document.querySelectorAll('[data-whatsapp]').forEach(e=>e.textContent=`WhatsApp: ${business.whatsapp||''}`); document.querySelectorAll('[data-location]').forEach(e=>e.textContent=business.location||'USA — By Appointment');
 const tiktok=business.tiktok_url||'https://www.tiktok.com/@pinkxytattoo';document.querySelectorAll('a[data-tiktok]').forEach(a=>a.href=tiktok);
 let cats=(await supabaseClient.from('tattoo_categories').select('*').eq('active',true).order('sort_order')).data||[]; if(!cats.length)cats=fallbackStyles.map((x,i)=>({name:x[0],items:x[1],description:`Explore ${x[0].toLowerCase()} tattoo ideas.`,sort_order:i}));
 const sg=document.getElementById('style-grid'),bs=document.getElementById('booking-style'); if(sg){sg.innerHTML=cats.map(x=>`<article class="style-card"><h3>${esc(x.name)}</h3><p>${esc(x.description||`Explore ${String(x.name).toLowerCase()} tattoo ideas.`)}</p><ul>${(Array.isArray(x.items)?x.items:[]).slice(0,8).map(y=>`<li>${esc(y)}</li>`).join('')}</ul></article>`).join('');}
 if(bs)bs.innerHTML=cats.map(x=>`<option>${esc(x.name)}</option>`).join('');
 let services=(await supabaseClient.from('services').select('*').eq('active',true).order('sort_order')).data||[];if(!services.length)services=fallbackPrices.map((x,i)=>({name:x[0],price_text:x[1],sort_order:i}));
 const pg=document.getElementById('pricing-grid');if(pg)pg.innerHTML=services.map(x=>`<article class="price-card"><h3>${esc(x.name)}</h3><div class="price">${esc(x.price_text)}</div></article>`).join('');
 let portfolio=(await supabaseClient.from('portfolio_items').select('*').eq('active',true).order('sort_order')).data||[];if(!portfolio.length)portfolio=fallbackPortfolio.map((x,i)=>({title:x[0],image_url:x[1],sort_order:i}));
 const port=document.getElementById('portfolio-grid');if(port)port.innerHTML=portfolio.map(x=>`<div class="portfolio-item"><img loading="lazy" src="${esc(x.image_url)}" alt="${esc(x.title)} tattoo example"><span class="portfolio-label">${esc(x.title)}</span></div>`).join('');
}
const menu=document.querySelector('.menu-toggle');if(menu)menu.onclick=()=>document.querySelector('.nav').classList.toggle('open');const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const loc=document.getElementById('location-type'),addr=document.getElementById('home-address-wrap');if(loc&&addr)loc.addEventListener('change',()=>addr.hidden=loc.value!=='Home Service');
const form=document.getElementById('booking-form');if(form)form.addEventListener('submit',async e=>{e.preventDefault();const msg=document.getElementById('form-message');const f=new FormData(form);const payload={full_name:f.get('full_name'),email:f.get('email'),phone:f.get('phone'),contact_method:f.get('contact_method'),tattoo_style:f.get('style'),tattoo_description:f.get('tattoo_description'),placement:f.get('placement'),approximate_size:f.get('size'),color_preference:f.get('color_preference'),budget:f.get('budget'),preferred_date:f.get('preferred_date')||null,preferred_time:f.get('preferred_time')||null,location_type:f.get('location_type'),home_service_address:f.get('home_service_address'),reference_image_url:f.get('reference_image_url')};msg.textContent='Submitting…';const {error}=await supabaseClient.from('booking_applications').insert(payload);if(error){msg.textContent=error.message;msg.style.color='#ff6b6b';return;}msg.textContent='Thank you. Your booking request has been submitted for review.';msg.style.color='#ff4d94';form.reset();if(addr)addr.hidden=true;});
loadPublic();
