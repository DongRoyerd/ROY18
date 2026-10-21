document.querySelectorAll('.ph').forEach(function(ph){
  var inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.hidden=true;
  ph.after(inp);
  ph.addEventListener('click',function(){inp.click()});
  inp.addEventListener('change',function(){
    var f=inp.files[0];if(!f)return;
    var img=document.createElement('img');img.alt='';img.src=URL.createObjectURL(f);
    ph.innerHTML='';ph.appendChild(img);
  });
});

// Geluidsknop
(function(){
  var btn=document.getElementById('soundBtn'),snd=document.getElementById('snd');
  btn.addEventListener('click',function(){
    snd.currentTime=0;
    snd.play().catch(function(){alert('Geen geluid gevonden. Zet een bestand met de naam geluid.mp3 in dezelfde map als index.html.');});
  });
})();

// Piano (maakt zelf geluid, geen mp3 nodig)
(function(){
  var p=document.getElementById('piano');
  var AC=window.AudioContext||window.webkitAudioContext,ctx;
  var keys=[['w',261.63],['b',277.18],['w',293.66],['b',311.13],['w',329.63],['w',349.23],['b',369.99],['w',392],['b',415.3],['w',440],['b',466.16],['w',493.88],['w',523.25]];
  function play(f){
    if(!ctx)ctx=new AC();
    if(ctx.state==='suspended')ctx.resume();
    var o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime;
    o.type='triangle';o.frequency.value=f;
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.5,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+1.2);
    o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+1.25);
  }
  var wi=0;
  keys.forEach(function(k){
    var d=document.createElement('div');
    d.className=k[0];
    if(k[0]==='w'){wi++;}
    else{d.style.left='calc(10px + (100% - 20px) * '+(wi/8)+' - 4%)';}
    d.addEventListener('pointerdown',function(ev){ev.preventDefault();d.classList.add('on');play(k[1]);});
    ['pointerup','pointerleave'].forEach(function(n){d.addEventListener(n,function(){d.classList.remove('on');});});
    p.appendChild(d);
  });
})();

