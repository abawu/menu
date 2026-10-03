const seedItems = [
  {id:1,cat:'kitfo',am:'ክትፎ ሙሉ',en:'Full Kitfo',desc:'Traditional minced beef, mitmita, niter kibbeh and fresh ayib.',price:3200,available:true},
  {id:2,cat:'kitfo',am:'ክትፎ ግማሽ',en:'Half Kitfo',desc:'Our house kitfo in a lighter portion.',price:1600,available:true},
  {id:3,cat:'kitfo',am:'ክትፎ ሩብ',en:'Quarter Kitfo',desc:'A small plate for a quick taste.',price:850,available:true},
  {id:4,cat:'meat',am:'ጎርድ ጎርድ',en:'Gored Gored',desc:'Hand-cut beef, seasoned with mitmita and awaze.',price:3400,available:true},
  {id:5,cat:'meat',am:'ቁርጥ ሙሉ',en:'Special Tibs',desc:'Tender beef sautéed with rosemary, onion and peppers.',price:3400,available:true},
  {id:6,cat:'meat',am:'ቁርጥ ግማሽ',en:'Half Tibs',desc:'A half portion of our sizzling house favourite.',price:1700,available:true},
  {id:7,cat:'veg',am:'ሽሮ ወጥ',en:'Shiro Wot',desc:'Silky chickpea stew with berbere and fresh herbs.',price:600,available:true},
  {id:8,cat:'veg',am:'ፍርፍር',en:'Firfir',desc:'Torn injera tossed with spiced sauce and clarified butter.',price:800,available:true},
  {id:9,cat:'extras',am:'አይብ',en:'Fresh Ayib',desc:'Cool, soft Ethiopian cottage cheese.',price:450,available:true},
  {id:10,cat:'drinks',am:'ቡና',en:'Ethiopian Coffee',desc:'A small buna ceremony cup, dark and fragrant.',price:350,available:true},
  {id:11,cat:'drinks',am:'ማር ውሃ',en:'Honey Water',desc:'A refreshing pour of local honey and water.',price:400,available:true}
];
const labels={all:{en:'All plates',am:'ሁሉም'},kitfo:{en:'Kitfo',am:'ክትፎ'},meat:{en:'Meat',am:'ስጋ'},veg:{en:'Vegetarian',am:'ጾም'},extras:{en:'Extras',am:'ተጨማሪ'},drinks:{en:'Drinks',am:'መጠጦች'}};
let lang=localStorage.getItem('aq-lang')||'en'; let activeCat='all'; let editingId=null;
let items=JSON.parse(localStorage.getItem('aq-items')||'null')||seedItems;
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
function display(item,key){return lang==='am'?item[key+'Am']||item[key] : item[key+'En']||item[key]}
function setLanguage(){document.body.classList.toggle('amharic',lang==='am'); $$('.lang-toggle span').forEach((x,i)=>x.classList.toggle('active',lang==='en'?i===0:i===1)); $$('[data-en]').forEach(el=>el.textContent=el.dataset[lang==='am'?'am':'en']); renderCategories();renderMenu();renderOwnerList()}
function renderCategories(){const el=$('#categories');el.innerHTML=Object.entries(labels).map(([id,l])=>`<button class="${activeCat===id?'active':''}" data-cat="${id}">${l[lang]}</button>`).join(''); $$('#categories button').forEach(b=>b.onclick=()=>{activeCat=b.dataset.cat;renderCategories();renderMenu()})}
function renderMenu(){const shown=activeCat==='all'?items:items.filter(x=>x.cat===activeCat);$('#menuGrid').innerHTML=shown.map((x,i)=>`<article class="food-card" style="animation-delay:${i*.05}s"><span class="food-number">${String(i+1).padStart(2,'0')}</span><span class="available ${x.available?'':'off'}">● ${x.available?(lang==='am'?'አለ':'AVAILABLE'):(lang==='am'?'ተሽጧል':'SOLD OUT')}</span><h3 class="food-title">${x.am}</h3><p class="food-english">${x.en}</p><p class="food-description">${x.desc}</p><div class="price"><small>ETB</small>${x.price.toLocaleString()}</div></article>`).join('')||`<p class="empty">${lang==='am'?'በዚህ ምድብ ምንም ምግብ የለም።':'No plates in this category yet.'}</p>`}
function renderOwnerList(){const el=$('#ownerList');el.innerHTML=items.map(x=>`<div class="owner-row"><span>${x.am} · ${x.price.toLocaleString()} ETB</span><button data-edit="${x.id}">Edit</button></div>`).join('');$$('[data-edit]').forEach(b=>b.onclick=()=>{const x=items.find(i=>i.id==b.dataset.edit);editingId=x.id;$('#editName').value=x.am;$('#editPrice').value=x.price;$('#editCategory').value=x.cat})}
function openOwner(){ $('#ownerModal').classList.add('open');$('#ownerModal').setAttribute('aria-hidden','false');$('#editCategory').innerHTML=Object.entries(labels).filter(([id])=>id!=='all').map(([id,l])=>`<option value="${id}">${l.en} · ${l.am}</option>`).join('');renderOwnerList() }
function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
$('#langToggle').onclick=()=>{lang=lang==='en'?'am':'en';localStorage.setItem('aq-lang',lang);setLanguage()};$('#ownerButton').onclick=openOwner;$$('[data-close-owner]').forEach(x=>x.onclick=()=>$('#ownerModal').classList.remove('open'));$('#ownerForm').onsubmit=e=>{e.preventDefault();const name=$('#editName').value.trim();const price=Number($('#editPrice').value);const cat=$('#editCategory').value;if(editingId){const x=items.find(i=>i.id===editingId);x.am=name;x.en=name;x.price=price;x.cat=cat}else items.push({id:Date.now(),cat,am:name,en:name,desc:'Freshly prepared at Abenezer Qurtina.',price,available:true});localStorage.setItem('aq-items',JSON.stringify(items));editingId=null;e.target.reset();renderMenu();renderOwnerList();toast('Menu saved on this device')};setLanguage();
