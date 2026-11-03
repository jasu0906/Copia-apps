/* Lógica de la web Spa Line. Los datos (productos, precios, WhatsApp…) están en datos.js. */
(function(){
  const D=window.SPALINE; if(!D){return;}
  const S=D.sitio, T=D.tipos;
  const MAX_LINEAS=15;           // límite de productos distintos por pedido (el enlace de WhatsApp no debe pasar de ~2.000 caracteres)
  const MAX_CANTIDAD=20;

  // ===== Productos a partir de datos.js =====
  const LINES=D.lineas, PRODUCTS={}, PRICES={};
  LINES.forEach(L=>L.productos.forEach(it=>{
    const img=it.imagen||it.clave;
    PRODUCTS[it.clave]={key:it.clave,line:L,type:it.tipo,kind:T[it.tipo].etiqueta,name:it.nombre||T[it.tipo].nombre,
      desc:it.descripcion||T[it.tipo].descripcion,size:it.tamano||'',img:'img/'+img+'.webp',thumb:'img/'+img+'-sm.webp',
      photo:!!it.foto,available:it.disponible!==false};
    if(typeof it.precio==='number')PRICES[it.clave]=it.precio;
  }));
  const INFO=D.beneficios;
  const money=v=>'$'+Number(v).toFixed(2);
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const benefitsHTML=id=>(INFO[id]?INFO[id].lista:[]).map(b=>'<li><strong>'+esc(b.titulo)+':</strong> '+esc(b.texto)+'</li>').join('');
  const priceHTML=key=>!PRODUCTS[key].available?'<div class="price pending">Agotado</div>':(PRICES[key]!=null?'<div class="price">'+money(PRICES[key])+'</div>':'<div class="price pending">Precio por confirmar</div>');
  const qtyHTML='<div class="qty" role="group" aria-label="Cantidad"><button type="button" data-q="-1" aria-label="Quitar uno">−</button><output>1</output><button type="button" data-q="1" aria-label="Añadir uno">+</button></div>';
  const addHTML=(key,label)=>PRODUCTS[key].available?'<div class="buy">'+qtyHTML+'<button type="button" class="btn add" data-key="'+key+'">'+label+'</button></div>':'';

  // ===== Analítica opcional (Plausible o Umami, si está configurada en datos.js) =====
  function evento(nombre,props){
    try{ if(window.plausible)window.plausible(nombre,{props}); else if(window.umami&&window.umami.track)window.umami.track(nombre,props); }catch(e){}
  }

  // ===== Imagen rota: se oculta y queda el fondo neutro de su caja =====
  document.addEventListener('error',e=>{const t=e.target; if(t&&t.tagName==='IMG')t.classList.add('img-rota');},true);

  // ===== Fragancias con scroll =====
  const root=document.documentElement, steps=[...document.querySelectorAll('.step')];
  const groups=[...document.querySelectorAll('.group')], num=document.getElementById('stepnum'), prog=document.getElementById('progress');
  const dots=[...document.querySelectorAll('#dots button')];
  let cur=-1;
  function setStep(i){
    if(i===cur||!steps[i])return; cur=i; const s=steps[i];
    root.style.setProperty('--cur','var('+s.dataset.c+')');
    groups.forEach((g,k)=>g.classList.toggle('on',k===i));
    num.textContent=s.dataset.name+' · '+(i+1)+' de '+steps.length;
    steps.forEach((el,k)=>{el.classList.toggle('on',k===i);el.classList.toggle('dim',k!==i)});
    dots.forEach((d,k)=>d.setAttribute('aria-current',k===i));
  }
  dots.forEach(d=>d.onclick=()=>steps[+d.dataset.i].scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'}));
  function onScroll(){
    const h=document.documentElement.scrollHeight-innerHeight;
    prog.style.width=(h>0?scrollY/h*100:0)+'%';
    const mid=innerHeight*.55; let best=0;
    steps.forEach((s,i)=>{if(s.getBoundingClientRect().top<mid)best=i});
    setStep(best);
  }
  addEventListener('scroll',onScroll,{passive:true}); addEventListener('resize',onScroll); onScroll();

  // ===== Tienda =====
  const shop=document.getElementById('shopApp'); if(shop)shop.hidden=false;
  const tabsEl=document.getElementById('tabs'), list=document.getElementById('list'), panel=document.getElementById('panel');
  let html='', lastGroup='';
  LINES.forEach((L,i)=>{
    if(L.grupo!==lastGroup){ if(lastGroup)html+='</div>'; html+='<div class="tabgroup"><span class="eyebrow">'+esc(L.grupo)+'</span>'; lastGroup=L.grupo; }
    html+='<button class="tab" role="tab" id="tab-'+L.id+'" aria-controls="panel" aria-selected="'+(i===0)+'" tabindex="'+(i===0?0:-1)+'"><span class="swatch" style="background:var(--'+L.id+')"></span>'+esc(L.nombre)+(L.nuevo?' <span class="new">Nuevo</span>':'')+'</button>';
  });
  tabsEl.innerHTML=html+'</div>';
  const tabs=[...tabsEl.querySelectorAll('.tab')];
  function render(id){
    const L=LINES.find(l=>l.id===id); if(!L)return;
    list.innerHTML=L.productos.map(({clave:key})=>{const p=PRODUCTS[key];return '<div class="card'+(p.available?'':' out')+'" style="--card:var(--'+L.id+');--card-ink:var(--'+L.id+'-ink)">'+
      '<button type="button" class="pic" data-detail="'+key+'" aria-label="Ver ficha de '+esc(p.name+' '+L.nombre)+'"><img src="'+p.thumb+'" alt="'+esc(p.name+' '+L.nombre)+'" loading="lazy"'+(p.photo?' class="photo"':'')+'></button>'+
      '<div class="kind">'+esc(p.kind)+'</div><h3 class="pname">'+esc(p.name)+'</h3><p>'+esc(p.desc)+'</p>'+(p.size?'<div class="size">'+esc(p.size)+'</div>':'')+
      '<button type="button" class="more" data-detail="'+key+'">Ver ficha</button>'+priceHTML(key)+addHTML(key,'Agregar')+'</div>';}).join('');
    tabs.forEach(t=>{const on=t.id==='tab-'+id;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1});
    panel.setAttribute('aria-labelledby','tab-'+id);
  }
  tabs.forEach((t,i)=>{
    t.onclick=()=>render(t.id.slice(4));
    t.onkeydown=e=>{let j=null;
      if(e.key==='ArrowRight')j=(i+1)%tabs.length; else if(e.key==='ArrowLeft')j=(i-1+tabs.length)%tabs.length;
      else if(e.key==='Home')j=0; else if(e.key==='End')j=tabs.length-1;
      if(j!==null){e.preventDefault();tabs[j].focus();render(tabs[j].id.slice(4));}};
  });
  function qtyClick(e){const q=e.target.closest('[data-q]'); if(!q)return false; const o=q.parentNode.querySelector('output'); o.value=Math.max(1,Math.min(MAX_CANTIDAD,(+o.value||1)+(+q.dataset.q))); return true;}
  function addClick(e,label,after){
    const a=e.target.closest('.add'); if(!a)return;
    const key=a.dataset.key, n=+a.parentNode.querySelector('output').value||1;
    if(!cart[key]&&Object.keys(cart).length>=MAX_LINEAS){a.textContent='Máximo '+MAX_LINEAS+' productos';setTimeout(()=>a.textContent=label,1600);return;}
    cart[key]=Math.min(MAX_CANTIDAD,(cart[key]||0)+n); save(); updateCart();
    a.textContent='¡Agregado!'; setTimeout(after||(()=>a.textContent=label),900);
  }
  list.addEventListener('click',e=>{
    const dt=e.target.closest('[data-detail]'); if(dt){openDetail(dt.dataset.detail);return;}
    if(qtyClick(e))return; addClick(e,'Agregar');
  });
  render(LINES[0].id);
  document.querySelectorAll('[data-open]').forEach(a=>a.addEventListener('click',()=>render(a.dataset.open)));

  // ===== Ficha de producto =====
  const detail=document.getElementById('detail'), dIn=document.getElementById('detailInner');
  function openDetail(key){
    const p=PRODUCTS[key], L=p.line, I=INFO[L.id];
    dIn.style.setProperty('--card','var(--'+L.id+')');
    dIn.innerHTML='<div class="dpic"><img src="'+p.img+'" alt="'+esc(p.name+' '+L.nombre)+'"'+(p.photo?' class="photo"':'')+'></div><div class="dtext">'+
      '<button class="close" type="button" aria-label="Cerrar">×</button><div class="eyebrow">'+esc(L.grupo+' · '+L.nombre)+'</div><h2 id="dTitle">'+esc(p.name)+'</h2>'+
      '<p style="margin:0;font-size:17px">'+esc(p.desc)+'</p>'+(p.size?'<div class="meta">'+esc(p.size)+'</div>':'')+
      (I?'<ul class="benefits">'+benefitsHTML(L.id)+'</ul>':'')+priceHTML(key)+addHTML(key,'Agregar al pedido')+'</div>';
    detail.showModal();
  }
  dIn.addEventListener('click',e=>{
    if(e.target.closest('.close')){detail.close();return;}
    if(qtyClick(e))return; addClick(e,'Agregar al pedido',()=>detail.close());
  });
  detail.addEventListener('click',e=>{if(e.target===detail)detail.close();});

  // ===== Portafolio interactivo =====
  const PROPS={gel:'Hidratante y removedor de células muertas. Gránulos no abrasivos.',crema:'Hidratante y emoliente de rápida absorción.',mist:'Refrescante, hidratante y reafirmante. Tiene una composición química distinta a un splash.',scrub:'Exfolia en seco y cuida la piel.'};
  const pf=document.getElementById('pf'), pfChips=document.getElementById('pfChips'), pfRow=document.getElementById('pfRow'), pfInfo=document.getElementById('pfInfo');
  const PF_LINES=LINES.filter(l=>['f1','f2','f3'].includes(l.id)), W={gel:23,crema:21,mist:14,scrub:18};
  let pfLine='f1', pfKey='mandarina-gel';
  if(pf&&PF_LINES.length){
    pfChips.innerHTML=PF_LINES.map(L=>'<button type="button" class="tab" data-l="'+L.id+'" aria-pressed="'+(L.id==='f1')+'"><span class="swatch" style="background:var(--'+L.id+')"></span>'+esc(L.nombre)+'</button>').join('');
    const typeOf=key=>PRODUCTS[key].type;
    const pfRender=()=>{
      const L=LINES.find(l=>l.id===pfLine);
      pf.style.setProperty('--pfc','var(--'+pfLine+')');
      pfChips.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l===pfLine));
      pfRow.innerHTML=L.productos.map(({clave:key,tipo})=>'<button type="button" data-k="'+key+'" aria-pressed="'+(key===pfKey)+'" style="width:'+W[tipo]+'%"><img src="'+PRODUCTS[key].thumb+'" alt=""><span>'+esc(T[tipo].etiqueta)+'</span></button>').join('');
      const p=PRODUCTS[pfKey], t=typeOf(pfKey);
      pfInfo.innerHTML='<div class="eyebrow">'+esc(L.nombre)+'</div><h3>'+esc(T[t].etiqueta)+'</h3><p class="meta">'+esc(p.name)+(p.size?' · '+esc(p.size):'')+'</p><p class="prop">'+PROPS[t]+'</p>'+
        (PRICES[pfKey]!=null?'<div class="price big">'+money(PRICES[pfKey])+'</div>':'')+addHTML(pfKey,'Agregar al pedido')+
        '<button type="button" class="more" data-detail="'+pfKey+'">Ver ficha completa</button>';
    };
    pfChips.addEventListener('click',e=>{const b=e.target.closest('[data-l]');if(!b)return;const t=typeOf(pfKey);pfLine=b.dataset.l;pfKey=LINES.find(l=>l.id===pfLine).productos.find(i=>i.tipo===t).clave;pfRender();});
    pfRow.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;pfKey=b.dataset.k;pfRender();pfRow.querySelector('[data-k="'+pfKey+'"]').focus();});
    pfInfo.addEventListener('click',e=>{
      const dt=e.target.closest('[data-detail]'); if(dt){openDetail(dt.dataset.detail);return;}
      if(qtyClick(e))return; addClick(e,'Agregar al pedido');
    });
    pfRender();
  }

  // ===== Test: ¿cuál es tu fragancia? (basado en las descripciones del catálogo) =====
  const QUIZ=[
    ['¿Qué aroma te llama más?',[['Cítrico y tropical','Mandarina y coco',{f1:3}],['Frutal y vibrante','Cerezas y berries',{f2:3}],['Dulce y cremoso','Frutal con un toque cremoso',{f3:3}],['Fresco y frutal','Arándanos y naranja',{f4:3}],['Floral y delicado','Un aroma elegante',{f5:3}],['Cálido y suave','Almendras dulces',{f6:3,f8:3}],['Dulce de vainilla','Cremoso y envolvente',{f7:3}]]],
    ['¿Qué quieres para tu piel?',[['Luminosidad y energía','Vitamina C y antioxidantes',{f1:1,f2:1,f4:1}],['Hidratación y suavidad','Humedad natural todo el día',{f1:1,f3:1,f8:1,f7:1}],['Firmeza y protección','Frente a agresores externos',{f4:1,f5:1,f6:1}]]],
    ['¿Cuál es tu momento?',[['Un día de playita','Sol, arena y frescura',{f1:2}],['Un momento de paz','Para desconectar',{f2:2}],['Regalarme un momento','Confort y mimo',{f3:2}],['Llena de vida','Energía para el día',{f4:2}],['Un toque de elegancia','Sofisticación y bienestar',{f5:2}],['Calma y bienestar','Suavidad al final del día',{f6:2}],['Un baño espumoso','Algo nuevo para consentirme',{f7:2}]]]
  ];
  const qEl=document.getElementById('quiz'); let qi=0, score={}, history=[];
  const bar=()=>'<div class="q-progress" aria-hidden="true">'+QUIZ.map((_,i)=>'<span class="'+(i<qi?'done':'')+'"></span>').join('')+'</div>';
  function qRender(){
    if(qi<QUIZ.length){
      const [q,opts]=QUIZ[qi];
      qEl.innerHTML=bar()+'<p class="q-title">'+(qi+1)+'. '+q+'</p><div class="q-opts">'+opts.map((o,i)=>'<button type="button" data-o="'+i+'">'+o[0]+'<small>'+o[1]+'</small></button>').join('')+'</div>'+(qi?'<button type="button" class="q-back" data-back>← Volver</button>':'');
      return;
    }
    const order=['f1','f2','f3','f8','f4','f5','f6','f7'].filter(id=>LINES.some(l=>l.id===id));
    const win=order.reduce((a,b)=>(score[b]||0)>(score[a]||0)?b:a,order[0]);
    const L=LINES.find(l=>l.id===win), I=INFO[win];
    const imgs=[...new Set(L.productos.map(it=>PRODUCTS[it.clave].thumb))];
    qEl.innerHTML=bar()+'<div class="q-result" style="--card:var(--'+win+')"><div class="grp">'+imgs.map(src=>'<img src="'+src+'" alt="" style="width:'+(imgs.length>3?20:28)+'%">').join('')+'</div>'+
      '<div><div class="eyebrow">Tu fragancia es</div><h3>'+esc(L.nombre)+'</h3><p class="meta">'+esc(I?I.etiqueta:L.grupo)+'</p><ul class="benefits">'+benefitsHTML(win)+'</ul>'+
      '<div class="actions" style="margin-top:18px"><a class="btn" href="#tienda" data-shop="'+win+'">Ver '+esc(L.nombre)+' en la tienda</a><button type="button" class="btn ghost" data-restart>Repetir el test</button></div></div></div>';
  }
  qEl.addEventListener('click',e=>{
    const o=e.target.closest('[data-o]');
    if(o){const w=QUIZ[qi][1][+o.dataset.o][2];history.push(w);for(const k in w)score[k]=(score[k]||0)+w[k];qi++;qRender();qEl.querySelector('button,a')?.focus();return;}
    if(e.target.closest('[data-back]')){const w=history.pop();for(const k in w)score[k]-=w[k];qi--;qRender();return;}
    if(e.target.closest('[data-restart]')){qi=0;score={};history=[];qRender();qEl.querySelector('button')?.focus();return;}
    const s=e.target.closest('[data-shop]'); if(s){render(s.dataset.shop);}
  });
  qRender();

  // ===== Carrito y mensaje de WhatsApp =====
  let cart={}; try{cart=JSON.parse(localStorage.getItem('spaline-cart')||'{}')||{}}catch(e){cart={}}
  Object.keys(cart).forEach(k=>{if(!PRODUCTS[k]||!PRODUCTS[k].available)delete cart[k]});
  function save(){try{localStorage.setItem('spaline-cart',JSON.stringify(cart))}catch(e){}}
  const dlg=document.getElementById('cart'), cartList=document.getElementById('cartList'), cartCount=document.getElementById('cartCount'),
        cartMsg=document.getElementById('cartMsg'), sendWa=document.getElementById('sendWa'), cartWarn=document.getElementById('cartWarn'), cartContact=document.getElementById('cartContact');
  if(cartContact)cartContact.innerHTML='WhatsApp <strong class="sel">'+esc(S.whatsappVisible)+'</strong>'+(S.horario?' · Atención '+esc((S.dias?S.dias+', ':'')+S.horario):'');
  function mensaje(L){
    const total=L.length&&L.every(l=>PRICES[l.p.key]!=null)?L.reduce((a,l)=>a+PRICES[l.p.key]*l.n,0):null;
    const lineas=L.map(({p,n})=>'• '+n+' × '+p.name+' '+p.line.nombre+(p.size?' ('+p.size+')':'')+(PRICES[p.key]!=null?' – '+money(PRICES[p.key])+' c/u':''));
    return '¡Hola Spa Line! Quiero hacer este pedido:\n'+(L.length?lineas.join('\n'):'(vacío)')+(total!=null?'\nTotal: '+money(total)+' ('+S.moneda+')':'')+
      (S.url?'\n\nLo vi en '+S.url:'')+'\n\n¿Cómo puedo pagar y cuándo me llega?';
  }
  function updateCart(){
    const L=Object.entries(cart).filter(([,n])=>n>0).map(([k,n])=>({p:PRODUCTS[k],n}));
    cartCount.textContent=L.reduce((a,l)=>a+l.n,0);
    cartList.innerHTML=L.length?L.map(({p,n})=>'<li style="--card:var(--'+p.line.id+')"><img src="'+p.thumb+'" alt=""><div class="t"><strong>'+esc(p.name)+'</strong><small>'+esc(p.line.nombre)+(p.size?' · '+esc(p.size):'')+(PRICES[p.key]!=null?' · '+money(PRICES[p.key]):'')+'</small></div><div class="qty" role="group" aria-label="Cantidad de '+esc(p.name)+'"><button type="button" data-k="'+p.key+'" data-d="-1" aria-label="Quitar uno">−</button><output>'+n+'</output><button type="button" data-k="'+p.key+'" data-d="1" aria-label="Añadir uno">+</button></div></li>').join(''):'<li style="--card:var(--line)">Todavía no has agregado productos.</li>';
    const msg=mensaje(L); cartMsg.textContent=msg;
    const ready=S.whatsapp&&L.length;
    sendWa.href=ready?'https://wa.me/'+S.whatsapp+'?text='+encodeURIComponent(msg):'https://wa.me/'+S.whatsapp;
    sendWa.setAttribute('aria-disabled',ready?'false':'true');
    cartWarn.textContent=!L.length?'Agrega al menos un producto.':'';
  }
  cartList.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;cart[b.dataset.k]=Math.max(0,Math.min(MAX_CANTIDAD,(cart[b.dataset.k]||0)+(+b.dataset.d)));if(!cart[b.dataset.k])delete cart[b.dataset.k];save();updateCart();});
  sendWa.addEventListener('click',e=>{
    if(sendWa.getAttribute('aria-disabled')==='true'){e.preventDefault();return;}
    const keys=Object.keys(cart);
    evento('whatsapp_click',{productos:keys.length,detalle:keys.join(',').slice(0,200)});
  });
  document.getElementById('cartBtn').onclick=()=>{updateCart();dlg.showModal();};
  document.getElementById('cartClose').onclick=()=>dlg.close();
  dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close();});
  updateCart();
})();
