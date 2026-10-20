const $=s=>document.querySelector(s);
const fmt=n=>"Rs. "+Number(n).toLocaleString("en-PK");
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const DEALCATS=["student","double","deals"];
const hue=s=>{let h=0;for(const ch of s)h=(h*31+ch.charCodeAt(0))%360;return h};
function kind(c,it){
const t=(it.n+" "+it.d).toLowerCase();
if(c.id==="deals"){
if(/pizza/.test(t))return"pizza";
if(/burger/.test(t))return"burger";
if(/shawarma|roll/.test(t))return"roll";
if(/wings|nugget|pakora|hot shot|donut|spring|samosa|tikka/.test(t))return"wings";
if(/fries/.test(t))return"fries";
return"box"}
if(["classic","crust","special","double"].includes(c.id)||/pizza/.test(t))return"pizza";
if(/burger/.test(t))return"burger";
if(/shawarma|roll|paratha|spin/.test(t))return"roll";
if(/wings|nugget/.test(t))return"wings";
if(/fries/.test(t))return"fries";
if(c.id==="ice")return"ice";
if(c.id==="pasta"&&/pasta/.test(t))return"pasta";
return"box"}
function art(k,h){
const a="hsl("+h+" 70% 45%)";
const dots=[[40,48],[72,44],[82,70],[56,84],[38,72],[60,62]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="${a}"/>`).join("");
const sticks=[34,46,58,70,82].map((x,i)=>`<rect x="${x}" y="${22+(i%2)*8}" width="9" height="46" rx="3" fill="#ffc628" transform="rotate(${(i-2)*5} ${x} 60)"/>`).join("");
const b={
pizza:`<circle cx="60" cy="62" r="46" fill="#d98a2b"/><circle cx="60" cy="62" r="39" fill="#ffd45e"/>${dots}<circle cx="70" cy="56" r="4" fill="#3a8a3e"/><circle cx="48" cy="64" r="4" fill="#3a8a3e"/>`,
burger:`<path d="M18 52Q18 22 60 22Q102 22 102 52Z" fill="#e09a3e"/><circle cx="42" cy="36" r="2" fill="#fff4c9"/><circle cx="62" cy="31" r="2" fill="#fff4c9"/><circle cx="80" cy="37" r="2" fill="#fff4c9"/><path d="M14 56Q24 48 34 56T54 56T74 56T94 56T106 56V62H14Z" fill="#4c9a2a"/><rect x="16" y="62" width="88" height="14" rx="7" fill="${a}"/><path d="M18 82H102Q100 100 60 100Q20 100 18 82Z" fill="#e09a3e"/>`,
roll:`<g transform="rotate(-25 60 60)"><rect x="14" y="36" width="92" height="48" rx="22" fill="#e8c27a"/><rect x="14" y="36" width="30" height="48" rx="15" fill="#f4dca4"/><path d="M96 44Q112 40 112 60Q112 80 96 76" fill="${a}"/></g><path d="M36 30Q44 18 50 30" stroke="#4c9a2a" stroke-width="5" fill="none"/>`,
wings:`<g transform="rotate(-30 60 60)"><ellipse cx="48" cy="52" rx="28" ry="20" fill="#c9662b"/><rect x="68" y="48" width="30" height="8" rx="4" fill="#f4ead6"/><circle cx="100" cy="46" r="6" fill="#f4ead6"/><circle cx="100" cy="58" r="6" fill="#f4ead6"/></g><ellipse cx="46" cy="90" rx="22" ry="14" fill="#d9772f"/>`,
fries:`${sticks}<path d="M26 56H94L88 104H32Z" fill="#d7191f"/><rect x="40" y="70" width="40" height="10" rx="5" fill="#ffc628"/>`,
ice:`<path d="M44 64L60 108L76 64Z" fill="#d9a05b"/><circle cx="60" cy="48" r="22" fill="${a}"/><circle cx="60" cy="28" r="12" fill="#fff"/><circle cx="60" cy="18" r="4" fill="#d7191f"/>`,
pasta:`<path d="M14 70Q14 104 60 104Q106 104 106 70Z" fill="#fff" stroke="#ddd"/><path d="M26 68Q40 40 60 58T94 56" stroke="#f0c050" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M30 74Q50 52 70 70T96 68" stroke="#e8b040" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="52" cy="60" r="5" fill="${a}"/>`,
box:`<path d="M22 40H78L72 104H28Z" fill="${a}"/><path d="M36 40Q36 22 50 22Q64 22 64 40" fill="none" stroke="#6b3b1c" stroke-width="4"/><rect x="80" y="44" width="22" height="60" rx="6" fill="#1c2a7c"/><rect x="84" y="62" width="14" height="20" rx="3" fill="#ffc628"/>`};
return `<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" fill="hsl(${h} 80% 94%)"/>${b[k]||b.box}</svg>`}
const ALL={};
MENU.forEach(c=>c.items.forEach((it,i)=>{it.k=kind(c,it);it.h=hue(it.n);it.s=slug(it.n);it.v.forEach((v,j)=>{ALL[c.id+"."+i+"."+j]={name:it.n,label:v[0],price:v[1]}})}));
let cart={};
try{cart=JSON.parse(localStorage.getItem("pw_cart")||"{}")}catch(e){cart={}}
Object.keys(cart).forEach(k=>{if(!ALL[k])delete cart[k]});
const save=()=>{try{localStorage.setItem("pw_cart",JSON.stringify(cart))}catch(e){}};
const page=document.body.dataset.page;
const state={cats:[],active:"all",q:""};

function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("show"),1600)}
function photo(it){const f=PHOTOS[it.s]||KINDPHOTO[it.k];return f?`<img src="images/${f}" alt="${it.n}" loading="lazy" width="480" height="330">`:art(it.k,it.h)}
function card(c,i){
const it=c.items[i];
const chips=it.v.map((v,j)=>`<button class="chip" data-add="${c.id}.${i}.${j}"><span>${v[0]}</span><b>${fmt(v[1])}</b><em></em></button>`).join("");
return `<article class="card"><div class="ph">${photo(it)}</div><div class="cb"><h4>${it.n}</h4>${it.d?`<p>${it.d}</p>`:""}<div class="prices">${chips}</div></div></article>`}
function section(c,term){
const idx=c.items.map((_,i)=>i).filter(i=>!term||(c.items[i].n+" "+c.items[i].d).toLowerCase().includes(term));
return idx.length?`<section class="cat" id="${c.id}"><h3>${c.title}</h3><div class="cards">${idx.map(i=>card(c,i)).join("")}</div></section>`:""}
function syncChips(){
document.querySelectorAll("[data-add]").forEach(b=>{
const n=cart[b.dataset.add]||0;
b.classList.toggle("in",n>0);
b.querySelector("em").textContent=n||"";
})}
function totals(){
let sub=0,cnt=0;
Object.keys(cart).forEach(k=>{sub+=ALL[k].price*cart[k];cnt+=cart[k]});
const fee=cnt?CONFIG.deliveryFee:0;
return{sub,cnt,fee,all:sub+fee}}
function renderCount(){
const t=totals();
$("#cartCount").textContent=t.cnt;
const bar=$("#bar");
if(bar){bar.hidden=!t.cnt||page==="checkout";
bar.textContent=`View cart, ${t.cnt} item${t.cnt>1?"s":""}, ${fmt(t.sub)}`}}
function renderStatus(){
const el=$("#status");
if(!el)return;
const h=new Date().getHours();
const open=h>=CONFIG.open||h<CONFIG.close;
el.textContent=open?"Open now, delivering until 1:00 am":"Closed now. Opens at 10:00 am";
el.className="status "+(open?"open":"shut")}
function drawMenu(){
const t=state.q.trim().toLowerCase();
const html=state.cats.filter(c=>state.active==="all"||c.id===state.active).map(c=>section(c,t)).join("");
$("#grid").innerHTML=html||`<p class="empty">Nothing found for "${state.q}". Try another word, like pizza or burger.</p>`;
syncChips()}
function drawTabs(){
const el=$("#tabs");
if(!el)return;
el.innerHTML=[["all","All"]].concat(state.cats.map(c=>[c.id,c.title.split(",")[0]])).map(t=>`<button role="tab" data-tab="${t[0]}" class="${t[0]===state.active?"on":""}">${t[1]}</button>`).join("")}
function drawCheckout(){
const keys=Object.keys(cart);
$("#lines").innerHTML=keys.length?keys.map(k=>`<div class="line"><div><b>${ALL[k].name}</b><small>${ALL[k].label==="Add"?"":ALL[k].label+", "}${fmt(ALL[k].price)}</small></div><div class="qty"><button data-dec="${k}" aria-label="Remove one">-</button><span>${cart[k]}</span><button data-inc="${k}" aria-label="Add one">+</button></div></div>`).join(""):`<p class="empty">Your cart is empty. <a href="menu.html">Open the menu</a></p>`;
const t=totals();
$("#tSub").textContent=fmt(t.sub);
$("#tDel").textContent=CONFIG.deliveryFee?fmt(CONFIG.deliveryFee):"Free";
$("#tAll").textContent=fmt(t.all)}
function change(k,d){
cart[k]=(cart[k]||0)+d;
if(cart[k]<=0)delete cart[k];
save();syncChips();renderCount();
if(page==="checkout")drawCheckout()}

document.addEventListener("click",e=>{
const t=e.target.closest("button");
if(!t)return;
if(t.dataset.add){change(t.dataset.add,1);toast(ALL[t.dataset.add].name+" added");return}
if(t.dataset.inc){change(t.dataset.inc,1);return}
if(t.dataset.dec){change(t.dataset.dec,-1);return}
if(t.dataset.tab){state.active=t.dataset.tab;drawTabs();drawMenu()}
});
document.addEventListener("error",e=>{
const im=e.target;
if(im.tagName!=="IMG"||!im.closest(".ph"))return;
const s=im.alt?slug(im.alt):"";
const it=MENU.flatMap(c=>c.items).find(x=>x.s===s);
if(it)im.outerHTML=art(it.k,it.h)},true);

const cur=location.pathname.split("/").pop()||"index.html";
document.querySelectorAll(".nav nav>a,.nav nav .dd>a").forEach(a=>{if(a.getAttribute("href")===cur)a.classList.add("on")});
renderStatus();

if(page==="menu"||page==="deals"){
state.cats=MENU.filter(c=>(page==="deals")===DEALCATS.includes(c.id));
const h=location.hash.slice(1);
if(page==="menu"&&state.cats.some(c=>c.id===h))state.active=h;
drawTabs();drawMenu();
const s=$("#search");
if(s)s.addEventListener("input",ev=>{state.q=ev.target.value;state.active="all";drawTabs();drawMenu()});
if(page==="deals"&&location.hash){const el=document.getElementById(location.hash.slice(1));if(el)el.scrollIntoView()}
}
if(page==="home"){
const dc=MENU.find(c=>c.id==="deals");
$("#dealrow").innerHTML=[0,12,23,30].map(i=>{const it=dc.items[i];return `<article class="deal"><span class="tab">${it.n}</span><div class="ph">${photo(it)}</div><p>${it.d}</p><button class="price" data-add="deals.${i}.0">${fmt(it.v[0][1])}/-<em></em></button></article>`}).join("");
syncChips();
}
if(page==="checkout"){
drawCheckout();
$("#form").addEventListener("submit",async e=>{
e.preventDefault();
const t=totals(),err=$("#err");
const name=$("#fName").value.trim();
const phone=$("#fPhone").value.replace(/[\s-]/g,"");
const addr=$("#fAddr").value.trim();
if(!t.cnt){err.textContent="Add at least one item to your order.";return}
if(name.length<2){err.textContent="Enter your name.";return}
if(!/^(03\d{9}|\+923\d{9})$/.test(phone)){err.textContent="Enter a valid mobile number like 0300-1234567.";return}
if(addr.length<8){err.textContent="Enter your full delivery address.";return}
if(t.sub<CONFIG.minOrder){err.textContent="Minimum order is "+fmt(CONFIG.minOrder)+".";return}
err.textContent="";
const note=$("#fNote").value.trim();
const lines=Object.keys(cart).map(k=>`${cart[k]} x ${ALL[k].name}${ALL[k].label==="Add"?"":" ("+ALL[k].label+")"} - ${fmt(ALL[k].price*cart[k])}`);
/* Phase 2: save order to live database (if configured) */
let orderId=null;
try{
  const items=Object.keys(cart).map(k=>({name:ALL[k].name,label:ALL[k].label,qty:cart[k],price:ALL[k].price}));
  orderId=await DB.saveOrder({items,subtotal:t.sub,total:t.all,name,phone,address:addr,note});
}catch(err){ console.warn("DB save failed:",err); }
const d=$("#done");
if(orderId){
  /* Order saved to the kitchen database — no WhatsApp needed */
  d.innerHTML=`✅ <b>Your order has been received!</b><br>Order ID: <b>${orderId}</b> — the kitchen is on it now.<br><br><a class="btn primary" href="track.html?id=${orderId}">📍 Track my order live</a>`;
}else{
  /* Database unavailable — fall back to WhatsApp ordering */
  const msg=[`*New delivery order - ${CONFIG.name}*`,...lines,"",`Subtotal: ${fmt(t.sub)}`,`Delivery: ${t.fee?fmt(t.fee):"Free"}`,`*Total: ${fmt(t.all)}*`,"",`Name: ${name}`,`Phone: ${phone}`,`Address: ${addr}`].concat(note?[`Notes: ${note}`]:[]).filter(Boolean).join("\n");
  window.open("https://wa.me/"+CONFIG.wa+"?text="+encodeURIComponent(msg),"_blank");
  d.innerHTML=`Your order is ready in WhatsApp. Press send there and we will confirm it shortly.`;
}
d.hidden=false;
cart={};save();drawCheckout();renderCount();
d.scrollIntoView({behavior:"smooth"});
});
}
renderCount();
