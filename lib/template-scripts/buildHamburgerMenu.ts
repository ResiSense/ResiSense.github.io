import Pages from "../types/Pages";
import { PageData } from "../types/PageData";

export default function (pageData: PageData) {
    const document = pageData.document;
    const page = pageData.page;
    // 
    const hamburgerMenuElement = document.getElementById('hamburger-menu')
        || (() => { throw new Error('Hamburger menu element not found!') })()
    const hamburgerMenuItemTemplateElement = document.getElementById('hamburger-menu-item-template') as HTMLTemplateElement;

    Pages.pageEntries.forEach(entry => {
        if (entry.hideFromHamburgerMenu) { return; }
        // 
        const hamburgerMenuItemElement = hamburgerMenuItemTemplateElement.content.cloneNode(true);
        const anchorElement = (hamburgerMenuItemElement as HTMLDivElement).querySelector('a')
            || (() => { throw new Error('Anchor element not found!') })();
        anchorElement.href = entry.path;
        anchorElement.textContent = `${entry.hamburgerPrefixIcon} ${entry.name}`;

        hamburgerMenuElement.appendChild(hamburgerMenuItemElement);
        if (entry.path.replace(/^\//, '') === page.trace.join('/')) {
            // I have no idea why this jank is necessary
            (hamburgerMenuElement.lastElementChild as HTMLAnchorElement).classList.add('hamburger-menu-item-active');
        }
    });
}