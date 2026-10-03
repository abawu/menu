const seedItems = [
  {id:1,cat:'special',am:'1 ኪሎ ቁርጥ',en:'1 Kilo Qurt',price:3200,available:true},
  {id:2,cat:'special',am:'1/2 ኪሎ ቁርጥና ጥብስ',en:'1/2 Kilo Qurt & Tibs',price:1600,available:true},
  {id:3,cat:'special',am:'1 ኪሎ ጎድን',en:'1 Kilo Goden',price:3200,available:true},
  {id:4,cat:'special',am:'1/2 ጎድን',en:'1/2 Goden',price:1600,available:true},
  {id:5,cat:'special',am:'1/4 ቁርጥና ጥብስ',en:'1/4 Kilo Qurt & Tibs',price:850,available:true},
  {id:6,cat:'special',am:'1 ኪሎ ሆላንደ',en:'1 Kilo Holande',price:3400,available:true},
  {id:7,cat:'special',am:'1/2 ሆላንደ',en:'1/2 Holande',price:1700,available:true},
  {id:8,cat:'special',am:'1/4 ሆላንደ',en:'1/4 Holande',price:900,available:true},
  {id:9,cat:'special',am:'1 ኪሎ ኩንስፓኛ',en:'1 Kilo Kunspanya',price:3400,available:true},
  {id:10,cat:'special',am:'1/2 ኪሎ ኩንስፓኛ',en:'1/2 Kilo Kunspanya',price:1700,available:true},
  {id:11,cat:'special',am:'1/4 ኪሎ ኩንስፓኛ',en:'1/4 Kilo Kunspanya',price:900,available:true},
  {id:12,cat:'special',am:'1 ኪሎ ሰንበር',en:'1 Kilo Senber',price:1500,available:true},
  {id:13,cat:'special',am:'1/2 ኪሎ ሰንበር',en:'1/2 Kilo Senber',price:750,available:true},
  {id:14,cat:'special',am:'1/4 ኪሎ ሰንበር',en:'1/4 Kilo Senber',price:400,available:true},
  {id:15,cat:'special',am:'ስፔሻል ክትፎ',en:'Special Kitfo',price:1300,available:true},
  {id:16,cat:'special',am:'ስፔሻል ዱለት',en:'Special Dulet',price:550,available:true},
  {id:17,cat:'special',am:'ኖርማል ዱለት',en:'Normal Dulet',price:450,available:true},
  {id:18,cat:'special',am:'ሙሉ ኮምቦ',en:'Full Combo',price:2800,available:true},
  {id:19,cat:'special',am:'ግማሽ ኮምቦ',en:'Half Combo',price:1500,available:true},
  {id:20,cat:'special',am:'ቋንጣ ፍርፍር',en:'Quanta Firfir',price:600,available:true},
  {id:21,cat:'special',am:'ተፈርሽ',en:'Tefersh',price:600,available:true},
  {id:22,cat:'special',am:'ስፔሻል አይብ',en:'Special Ayib',price:800,available:true}
];
const labels={all:{en:'Special menu',am:'ስፔሻል ምናሌ'},special:{en:'Qurtina Kitfo',am:'ቁርጥና ክትፎ'}};
let lang=localStorage.getItem('aq-lang')||'en';let activeCat='all';let editingId=null;
let items=JSON.parse(localStorage.getItem('aq-menu-v2')||'null')||seedItems;
const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
function setLanguage(){document.body.classList.toggle('amharic',lang==='am');$$('.lang-toggle span').forEach((x,i)=>x.classList.toggle('active',lang==='en'?i===0:i===1));$$('[data-en]').forEach(el=>el.textContent=el.dataset[lang==='am'?'am':'en']);renderCategories();renderMenu();renderOwnerList()}
function renderCategories(){const el=$('#categories');el.innerHTML=Object.entries(labels).map(([id,l])=>`<button class="${activeCat===id?'active':''}" data-cat="${id}">${l[lang]}</button>`).join('');$$('#categories button').forEach(b=>b.onclick=()=>{activeCat=b.dataset.cat;renderCategories();renderMenu()})}
function renderMenu(){const shown=activeCat==='all'?items:items.filter(x=>x.cat===activeCat);$('#menuGrid').innerHTML=shown.map((x,i)=>`<article class="food-card" style="animation-delay:${i*.05}s"><span class="food-number">${String(i+1).padStart(2,'0')}</span><span class="available ${x.available?'':'off'}">● ${x.available?(lang==='am'?'አለ':'AVAILABLE'):(lang==='am'?'ተሽጧል':'SOLD OUT')}</span><h3 class="food-title">${x.am}</h3><p class="food-english">${x.en}</p><div class="price"><small>ETB</small>${x.price.toLocaleString()}</div></article>`).join('')||`<p class="empty">${lang==='am'?'በዚህ ምድብ ምንም ምግብ የለም።':'No plates in this category yet.'}`}
function renderOwnerList(){const el=$('#ownerList');el.innerHTML=items.map(x=>`<div class="owner-row"><span>${x.am} · ${x.price.toLocaleString()} ETB</span><button data-edit="${x.id}">Edit</button></div>`).join('');$$('[data-edit]').forEach(b=>b.onclick=()=>{const x=items.find(i=>i.id==b.dataset.edit);editingId=x.id;$('#editName').value=x.am;$('#editPrice').value=x.price;$('#editCategory').value=x.cat})}
function openOwner(){$('#ownerModal').classList.add('open');$('#ownerModal').setAttribute('aria-hidden','false');$('#editCategory').innerHTML=Object.entries(labels).filter(([id])=>id!=='all').map(([id,l])=>`<option value="${id}">${l.en} · ${l.am}</option>`).join('');renderOwnerList()}
function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
$('#langToggle').onclick=()=>{lang=lang==='en'?'am':'en';localStorage.setItem('aq-lang',lang);setLanguage()};$('#ownerButton').onclick=openOwner;$$('[data-close-owner]').forEach(x=>x.onclick=()=>$('#ownerModal').classList.remove('open'));$('#ownerForm').onsubmit=e=>{e.preventDefault();const name=$('#editName').value.trim();const price=Number($('#editPrice').value);const cat=$('#editCategory').value;if(editingId){const x=items.find(i=>i.id===editingId);x.am=name;x.en=name;x.price=price;x.cat=cat}else items.push({id:Date.now(),cat,am:name,en:name,price,available:true});localStorage.setItem('aq-menu-v2',JSON.stringify(items));editingId=null;e.target.reset();renderMenu();renderOwnerList();toast('Menu saved on this device')};setLanguage();
