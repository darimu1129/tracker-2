(function(){
  function patch(){
    if(!window.POKEMON_DATA)return;
    for(const p of window.POKEMON_DATA){
      const n=Number(p.id);
      if(n>721 && typeof p.id==='number'){
        p.id={valueOf:()=>1,toString:()=>String(n)};
      }
    }
  }
  patch();
  setInterval(patch,500);
})();
