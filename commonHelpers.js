import{a as l,S as m,i as p}from"./assets/vendor-8ef75117.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}})();l.defaults.headers.common["x-api-key"]="live_dSKOi2g6r5Z5MXH90zLdHueXv61ZIwwb7sExKgfYdJ0iHORzscUt4tqpFuOZVH5w";async function g(){return l.get("https://api.thecatapi.com/v1/breeds").then(e=>e.data)}async function h(e){return l.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${e}`).then(o=>o.data[0])}const d=document.querySelector(".breed-select"),y=document.querySelector(".loader"),u=document.querySelector(".cat-info"),a=new m({select:d});a.disable();b();async function b(){const e=await g().then(r=>{const s={};return r.map(t=>s[t.name]=t.id),s}).catch(f),o=[{text:"Choose breed",value:"none"},...Object.keys(e).map(r=>({text:r,value:e[r]}))];a.setData(o),a.enable(),c(!1)}d.addEventListener("change",v);async function v(e){if(e.target.value==="none"){u.innerHTML="";return}c(),console.log(e.currentTarget.value),await h(e.currentTarget.value).then(L).catch(f).finally(()=>c(!1))}function L(e){const o=e.url,r=e.breeds[0];u.innerHTML=`
    <h2 class='cat-title'>${r.name}</h2>
    <div class="cat-info-box">
      <img src="${o}" alt="${r.name}" width='600'>
      <div class="cat-info-text">
        <p>${r.description}</p>
        <ul>
          <li><b>Life Span:</b> ${r.life_span}</li>
          <li><b>Temperament:</b> ${r.temperament}</li>
        </ul>
      </div>
    </div>
  `}function c(e=!0){y.style.display=e?"block":"none"}function f(e){p.error({title:"Error",titleColor:"white",message:e.message,messageColor:"white",position:"topRight",close:!1,closeOnClick:!0,progressBarColor:"red",icon:null,messageSize:20,timeout:2e3}),u.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map
