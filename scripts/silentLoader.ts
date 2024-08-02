// FIXME: JS and CSS are partially loaded but not computed?

{
    window.addEventListener('popstate', () => {
        fetchPage(location.href);
    });

    document.addEventListener('DOMContentLoaded', silenceLinks);
    function silenceLinks() {
        const links = document.querySelectorAll('a');
        const ownOriginRegex = new RegExp(String.raw`^${window.location.origin}/${document.head.querySelector('meta[baseUrl]').getAttribute('baseUrl')}`);

        for (const link of links) {
            if (!link.href.match(ownOriginRegex)) { continue; }
            if (link.href.includes('#')) { continue; }
            console.log('Silencing link:', link.href);
            link.addEventListener('click', event => {
                console.warn('Silent link clicked:', event.target.href);
                event.preventDefault();
                const url = event.target.href;
                fetchPage(url);
            });
        }
    }

    function fetchPage(url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const newDocument = parser.parseFromString(html, 'text/html');
                updateBodyContent(newDocument);
                document.title = newDocument.title;
                updateCSS(newDocument);
                updateJS(newDocument);
                history.pushState(null, '', url);
                window.dispatchEvent(new Event('DOMContentLoaded'));
            })
            .catch(error => console.error('Error fetching content:', error));

        function updateBodyContent(newDocument) {
            const newContent = newDocument.body.innerHTML;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newContent;
            const oldChildren = Array.from(document.body.children);
            const newChildren = Array.from(tempDiv.children);

            oldChildren.forEach((oldChild, index) => {
                const newChild = newChildren[index];
                if (newChild && oldChild.outerHTML !== newChild.outerHTML) {
                    if (oldChild.tagName === 'IMG' && newChild.tagName === 'IMG') {
                        newChild.src = oldChild.src; // Preserve the old image's src
                    }
                    document.body.replaceChild(newChild, oldChild);
                }
            });

            if (newChildren.length > oldChildren.length) {
                newChildren.slice(oldChildren.length).forEach(newChild => {
                    document.body.appendChild(newChild);
                });
            }
        }
        function updateCSS(newDocument) {
            const newStyles = newDocument.querySelectorAll('link[rel="stylesheet"]');
            const oldStyles = document.querySelectorAll('link[rel="stylesheet"]');
            oldStyles.forEach(oldStyle => {
                const isDifferent = !Array.from(newStyles).some(newStyle => newStyle.href === oldStyle.href);
                if (isDifferent) { oldStyle.remove(); }
            });
            newStyles.forEach(newStyle => {
                if (!document.querySelector(`link[rel="stylesheet"][href="${newStyle.href}"]`)) {
                    document.head.appendChild(newStyle.cloneNode(true));
                }
            });
        }
        function updateJS(newDocument) {
            const newScripts = newDocument.querySelectorAll('script');
            const oldScripts = document.querySelectorAll('script');
            oldScripts.forEach(oldScript => {
                const isDifferent = !Array.from(newScripts).some(newScript => newScript.src === oldScript.src);
                if (isDifferent) { oldScript.remove(); }
            });
            newScripts.forEach(script => {
                if (!document.querySelector(`script[src="${script.src}"]`)) {
                    const newScript = document.createElement('script');
                    newScript.src = script.src;
                    newScript.async = true; // Load scripts asynchronously
                    newScript.textContent = script.textContent;
                    document.body.appendChild(newScript);
                }
            });
        }
    }
}