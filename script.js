const products=[
 {id:1,name:'데일리 머그',price:18000,tag:'BEST',cat:'best'},
 {id:2,name:'오브제 트레이',price:24000,tag:'NEW',cat:'new'},
 {id:3,name:'소프트 패브릭 파우치',price:21000,tag:'BEST',cat:'best'},
 {id:4,name:'라운드 데스크 램프',price:59000,tag:'NEW',cat:'new'},
 {id:5,name:'클린 글라스',price:16000,tag:'LIVING',cat:'living'},
 {id:6,name:'오가닉 코튼 타월',price:19000,tag:'LIVING',cat:'living'},
 {id:7,name:'미니 수납 바스켓',price:27000,tag:'BEST',cat:'best'},
 {id:8,name:'베이직 캔들',price:22000,tag:'NEW',cat:'new'}
];
let cart=[];
const won=n=>n.toLocaleString('ko-KR')+'원';
const grid=document.querySelector('#productGrid');
function render(filter='all'){
 const list=filter==='all'?products:products.filter(p=>p.cat===filter);
 grid.innerHTML=list.map(p=>`<article class="product-card" data-id="${p.id}"><div class="product-image"><div class="product-visual"></div></div><div class="product-info"><span class="tag">${p.tag}</span><h3>${p.name}</h3><span class="price">${won(p.price)}</span><span class="sold">무료배송</span></div></article>`).join('');
}
render();
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render(btn.dataset.filter)}));
document.querySelectorAll('[data-category]').forEach(a=>a.addEventListener('click',()=>{const f=a.dataset.category;document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter===f));render(f)}));
grid.addEventListener('click',e=>{const card=e.target.closest('.product-card');if(!card)return;const p=products.find(x=>x.id==card.dataset.id);const existing=cart.find(x=>x.id===p.id);if(existing)existing.qty++;else cart.push({...p,qty:1});updateCart();openCart()});
const drawer=document.querySelector('#cartDrawer'),overlay=document.querySelector('#overlay');
function openCart(){drawer.classList.add('open');overlay.classList.add('show');drawer.setAttribute('aria-hidden','false')}
function closeCart(){drawer.classList.remove('open');overlay.classList.remove('show');drawer.setAttribute('aria-hidden','true')}
document.querySelector('#cartBtn').onclick=openCart;document.querySelector('#closeCart').onclick=closeCart;overlay.onclick=closeCart;
function updateCart(){
 document.querySelector('#cartCount').textContent=cart.reduce((s,p)=>s+p.qty,0);
 const box=document.querySelector('#cartItems');
 if(!cart.length){box.innerHTML='<p class="empty">장바구니가 비어 있어요.</p>';document.querySelector('#cartTotal').textContent='0원';return}
 box.innerHTML=cart.map(p=>`<div class="cart-row"><div class="mini-img"><div></div></div><div><h4>${p.name}</h4><p>${won(p.price)} · ${p.qty}개</p></div><button class="remove" data-remove="${p.id}">×</button></div>`).join('');
 document.querySelector('#cartTotal').textContent=won(cart.reduce((s,p)=>s+p.price*p.qty,0));
}
document.querySelector('#cartItems').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;cart=cart.filter(p=>p.id!=b.dataset.remove);updateCart()});
document.querySelector('#checkout').onclick=()=>{if(!cart.length){alert('장바구니에 상품을 먼저 담아주세요.');return}alert('주문 페이지는 다음 단계에서 연결할 수 있어요!');};
document.querySelector('#searchBtn').onclick=()=>{const q=prompt('찾으시는 상품을 입력해주세요.');if(!q)return;const found=products.filter(p=>p.name.includes(q));if(!found.length){alert('검색 결과가 없어요.');return}grid.innerHTML=found.map(p=>`<article class="product-card" data-id="${p.id}"><div class="product-image"><div class="product-visual"></div></div><div class="product-info"><span class="tag">${p.tag}</span><h3>${p.name}</h3><span class="price">${won(p.price)}</span></div></article>`).join('');document.querySelector('#products').scrollIntoView()};
