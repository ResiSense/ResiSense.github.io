{
    const hamburger = document.querySelector(".hamburger") as HTMLElement;
    const categoryMenuListContainer = document.querySelector(".category-menu-list-container") as HTMLElement;
    
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        categoryMenuListContainer.classList.toggle("active");
    });
}
