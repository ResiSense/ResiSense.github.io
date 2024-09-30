document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('painted-content a').forEach(e => {
        let t = e.href.split('#')[1];
        t?.startsWith('reference-') &&
            (e.addEventListener('mouseenter', () => {
                console.log('Mouse enter:', t);
                let n = document.createElement('span');
                n.classList.add('reference-box'),
                    (n.innerHTML = document.getElementById(t)?.innerHTML || 'Loading...'),
                    e.appendChild(n);
                let o = n.getBoundingClientRect();
                console.log('Box rect:', o),
                    o.right > window.innerWidth && (n.style.left = `${window.innerWidth - o.width}px`);
            }),
            e.addEventListener('mouseleave', () => {
                console.log('Mouse leave:', t);
                let n = e.querySelector('.reference-box');
                n && e.removeChild(n);
            }));
    });
});
//# sourceMappingURL=references.js.map
