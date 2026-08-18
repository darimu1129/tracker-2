(function(){
  const API='https://pokeapi.co/api/v2/pokemon/';
  const LIST='https://pokeapi.co/api/v2/pokemon?limit=2000';
  const MEGAS=new Set(['venusaur-mega','charizard-mega-x','charizard-mega-y','blastoise-mega','beedrill-mega','pidgeot-mega','alakazam-mega','slowbro-mega','gengar-mega','kangaskhan-mega','pinsir-mega','gyarados-mega','aerodactyl-mega','mewtwo-mega-x','mewtwo-mega-y','ampharos-mega','steelix-mega','scizor-mega','heracross-mega','houndoom-mega','tyranitar-mega','sceptile-mega','blaziken-mega','swampert-mega','gardevoir-mega','mawile-mega','aggron-mega','medicham-mega','manectric-mega','banette-mega','absol-mega','latias-mega','latios-mega','rayquaza-mega','lopunny-mega','garchomp-mega','lucario-mega','abomasnow-mega','gallade-mega','audino-mega','sharpedo-mega','camerupt-mega','altaria-mega','metagross-mega','sableye-mega','glalie-mega','diancie-mega','groudon-primal','kyogre-primal']);
  const pretty=s=>s.split('-').map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(' ');
  window.POKEMON_DATA=[];
  const cache={};
  async function details(name){if(cache[name])return cache[name];try{const r=await fetch(API+encodeURIComponent(name));const d=await r.json();let stats=d.stats.map(x=>x.base_stat);const pv=(d.past_stats||[]).find(x=>x.generation?.name==='generation-viii');if(pv?.stats?.length)stats=pv.stats.map(x=>x.base_stat);const out={name:pretty(d.name),id:d.id,slug:d.name,type:d.types.map(x=>pretty(x.type.name)).join(' / '),abilities:d.abilities.map(x=>x.ability.name),stats};cache[name]=out;return out}catch{return null}}
  window.POKEMON_RUNTIME={details,cache};
  fetch(LIST).then(r=>r.json()).then(async data=>{
    const opts=[];
    for(const m of data.results){
      const id=Number(m.url.split('/').filter(Boolean).pop());
      if((id<=809&&m.name.indexOf('-')===-1)||MEGAS.has(m.name)){
        const display=pretty(m.name);
        const base=MEGAS.has(m.name)?Number((m.name.match(/^(?:groudon|kyogre|venusaur|charizard|blastoise|beedrill|pidgeot|alakazam|slowbro|gengar|kangaskhan|pinsir|gyarados|aerodactyl|mewtwo|ampharos|steelix|scizor|heracross|houndoom|tyranitar|sceptile|blaziken|swampert|gardevoir|mawile|aggron|medicham|manectric|banette|absol|latias|latios|rayquaza|lopunny|garchomp|lucario|abomasnow|gallade|audino|sharpedo|camerupt|altaria|metagross|sableye|glalie|diancie)/)||[])[1]) : id;
        opts.push({name:display,id:base||id,slug:m.name});
      }
    }
    window.POKEMON_DATA=opts;
    if(typeof render==='function')render();
  });
  document.addEventListener('change',async e=>{
    if(e.target?.id!=='pokeName')return;
    const typed=e.target.value.trim();const opt=window.POKEMON_DATA.find(x=>x.name===typed);if(!opt)return;
    const d=await details(opt.slug);if(!d)return;d.id=opt.id;
    const idx=window.POKEMON_DATA.findIndex(x=>x.name===typed);if(idx>=0)window.POKEMON_DATA[idx]=d;
    const s=document.getElementById('pokeAbility');if(s)s.innerHTML='<option value="">Selecciona habilidad</option>'+d.abilities.map(a=>`<option>${a}</option>`).join('');
  });
  const observer=new MutationObserver(async()=>{const el=document.getElementById('pokeName');if(!el||!el.value)return;const opt=window.POKEMON_DATA.find(x=>x.name===el.value);if(!opt||opt.abilities?.length)return;const d=await details(opt.slug);if(!d)return;d.id=opt.id;const idx=window.POKEMON_DATA.findIndex(x=>x.name===el.value);if(idx>=0)window.POKEMON_DATA[idx]=d;const s=document.getElementById('pokeAbility');const currentAbility=s?.value||'';if(s)s.innerHTML='<option value="">Selecciona habilidad</option>'+d.abilities.map(a=>`<option ${a===currentAbility?'selected':''}>${a}</option>`).join('')});
  observer.observe(document.documentElement,{subtree:true,childList:true});
})();
