// year
document.getElementById('y').textContent = new Date().getFullYear();

// smooth anchor scroll + active link
const links = document.querySelectorAll('.navLinks a');
links.forEach(a=>{
    a.addEventListener('click',e=>{
    const href = a.getAttribute('href') || '';
    if(href.startsWith('#')){
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({behavior:'smooth',block:'start'});
        history.replaceState(null,'',href);
    }
    });
});
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
    if(entry.isIntersecting){
        links.forEach(l=>l.classList.remove('active'));
        const active = document.querySelector(`.navLinks a[href="#${entry.target.id}"]`);
        active && active.classList.add('active');
    }
    });
},{threshold:.4});
['about','scope','gap','method','docs','team'].forEach(id=>{
    const el = document.getElementById(id);
    el && observer.observe(el);
});