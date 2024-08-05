{
    const paintedHamburgerMenuElement = (document.getElementsByTagName('painted-hamburger-menu')[0]
        || (() => { throw new Error('Painted hamburger menu element not found!') })()) as HTMLElement;
    const hamburgerButtonElement = document.getElementById('hamburger-button')
        || (() => { throw new Error('Hamburger button element not found!') })();
    const hamburgerMenuElement = document.getElementById('hamburger-menu')
        || (() => { throw new Error('Hamburger menu element not found!') })();

    hamburgerButtonElement.addEventListener('click', () => {
        hamburgerMenuElement.toggleAttribute('open');
        hamburgerMenuElement.focus();
    });
    paintedHamburgerMenuElement.addEventListener('focusout', event => {
        if (paintedHamburgerMenuElement.contains(event.relatedTarget as Node)) { return; }
        hamburgerMenuElement.toggleAttribute('open', false);
    });
}