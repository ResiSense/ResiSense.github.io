(() => {
    {
        window.location.pathname.split('/').includes('404') &&
            (document.querySelector('painted-outline').style.visibility = 'hidden');
        let t = document.getElementById('outline-progress-pointer'),
            n = document.querySelector('painted-content')?.querySelectorAll('h1, h2, h3, h4, h5, h6');
        function e() {
            if (!n || !t) return;
            let e = [...n].reverse().find(e => e.getBoundingClientRect().top < 180) || n[0],
                i = document.getElementById(`--outline-${e.id}`),
                o = document.getElementById(`--outline-${n[0].id}`);
            (t.style.top = `${i.getBoundingClientRect().top - o.getBoundingClientRect().top}px`),
                (t.style.left = `${2 + i.getBoundingClientRect().left - o.getBoundingClientRect().left}px`);
        }
        window.addEventListener('DOMContentLoaded', e), window.addEventListener('scroll', e);
    }
})();
//# sourceMappingURL=outline.js.map
