/* ══════════════════════════════════════
   CURSOR
══════════════════════════════════════ */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    dot.style.left=mx+'px';dot.style.top=my+'px';
});
(function animRing(){
    rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.proj-card,.sk,.ring-item,.ai,.an,.c-link-row,.tl-item').forEach(el=>{
    el.addEventListener('mouseenter',()=>{dot.classList.add('hover');ring.classList.add('hover');});
    el.addEventListener('mouseleave',()=>{dot.classList.remove('hover');ring.classList.remove('hover');});
});

/* ══════════════════════════════════════
   INTRO
══════════════════════════════════════ */
const intro=document.getElementById('intro');
const nav=document.getElementById('nav');
setTimeout(()=>{
    intro.classList.add('out');
    setTimeout(()=>{
        intro.style.display='none';
        nav.classList.add('vis');
        // trigger hero animations
        document.getElementById('hero-tag').style.opacity='1';
        setTimeout(()=>{
            document.getElementById('hw1').classList.add('in');
            setTimeout(()=>document.getElementById('hw2').classList.add('in'),200);
            setTimeout(()=>document.getElementById('hw3').classList.add('in'),400);
            setTimeout(()=>document.getElementById('hero-desc').classList.add('in'),800);
        },400);
        startScramble();
    },1900);
},1400);

/* ══════════════════════════════════════
   TEXT SCRAMBLE
══════════════════════════════════════ */
const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
const words=['PORTFOLIO','DÉVELOPPEUR','CRÉATEUR','INNOVATEUR','ÉTUDIANT'];
let wIdx=0;
function scrambleTo(el,target,onDone){
    let iter=0,maxIter=target.length*3;
    const iv=setInterval(()=>{
        el.textContent=target.split('').map((c,i)=>{
            if(i<Math.floor(iter/3)) return target[i];
            return chars[Math.floor(Math.random()*chars.length)];
        }).join('');
        if(++iter>maxIter){clearInterval(iv);el.textContent=target;if(onDone)onDone();}
    },40);
}
function startScramble(){
    const el=document.getElementById('scramble-txt');
    setTimeout(function loop(){
        wIdx=(wIdx+1)%words.length;
        scrambleTo(el,words[wIdx],()=>setTimeout(loop,2200));
    },2400);
}

/* ══════════════════════════════════════
   MARQUEE
══════════════════════════════════════ */
const items=['BUT Informatique','Développeur Web','Python · Java · PHP','Solutions Logicielles','Passionné de Code','Git · Docker · Linux','Projets Ambitieux','2024 — 2027'];
const mi=document.getElementById('marquee-inner');
const row=items.map(t=>`<span class="marquee-item">${t}<span class="marquee-dot"></span></span>`).join('');
mi.innerHTML=row+row+row;

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
const ro=new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{
        if(e.isIntersecting) setTimeout(()=>e.target.classList.add('on'),i*80);
    });
},{threshold:.12});
document.querySelectorAll('.rv,.rv-l').forEach(el=>ro.observe(el));

/* ══════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════ */
const co=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
        if(e.isIntersecting){
            e.target.querySelectorAll('.count').forEach(c=>{
                const target=+c.dataset.target,dur=1400;
                const start=performance.now();
                (function anim(now){
                    const t=Math.min((now-start)/dur,1);
                    const ease=1-Math.pow(1-t,3);
                    c.textContent=Math.round(ease*target)+(target===10?'+':'');
                    if(t<1)requestAnimationFrame(anim);
                })(start);
            });
            co.unobserve(e.target);
        }
    });
},{threshold:.3});
document.querySelectorAll('.about-numbers').forEach(el=>co.observe(el));

/* ══════════════════════════════════════
   RING ANIMATION
══════════════════════════════════════ */
const ringo=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
        if(e.isIntersecting){
            e.target.querySelectorAll('.ring-fill').forEach(r=>{
                const pct=+r.dataset.pct/100;
                const circ=2*Math.PI*45;
                r.style.strokeDashoffset=circ*(1-pct);
            });
            ringo.unobserve(e.target);
        }
    });
},{threshold:.2});
document.querySelectorAll('.skills-rings').forEach(el=>ringo.observe(el));

/* ══════════════════════════════════════
   3D CARD TILT
══════════════════════════════════════ */
document.querySelectorAll('.proj-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(800px) rotateY(${x*12}deg) rotateX(${-y*12}deg) scale(1.02)`;
        card.style.setProperty('--mx',(e.clientX-r.left)+'px');
        card.style.setProperty('--my',(e.clientY-r.top)+'px');
    });
    card.addEventListener('mouseleave',()=>{
        card.style.transform='perspective(800px) rotateY(0) rotateX(0) scale(1)';
    });
});

/* ══════════════════════════════════════
   NAV SCROLL
══════════════════════════════════════ */
window.addEventListener('scroll',()=>{
    nav.classList.toggle('scrolled',scrollY>60);
});

/* ══════════════════════════════════════
   FORM
══════════════════════════════════════ */
function doSend(e){
    e.preventDefault();
    const t=document.getElementById('send-txt');
    t.textContent='Envoyé ✓';t.style.color='var(--r)';
    setTimeout(()=>{t.textContent='Envoyer';t.style.color='';},3000);
}