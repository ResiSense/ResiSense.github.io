{
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('painted-content a')
            .forEach((e: Element) => {
                const a = e as HTMLAnchorElement;
                const href = a.href.split('#')[1];
                if (!href?.startsWith('reference-')) { return; }

                a.addEventListener('mouseenter', () => {
                    console.log('Mouse enter:', href);

                    const box = document.createElement('span');
                    box.classList.add('reference-box');
                    box.innerHTML = document.getElementById(href)?.innerHTML || 'Loading...';

                    a.appendChild(box);

                    const boxRect = box.getBoundingClientRect();
                    console.log('Box rect:', boxRect);
                    if (boxRect.right > window.innerWidth) {
                        box.style.left = `${window.innerWidth - boxRect.width}px`;
                    }
                });

                a.addEventListener('mouseleave', () => {
                    console.log('Mouse leave:', href);

                    const box = a.querySelector('.reference-box');
                    if (box) { a.removeChild(box); }
                });
            });
    });
}