{
    const appleWarningElement = document.getElementById("apple-warning") || (() => {
        throw new Error("Apple warning banner element not found!");
    })();

    window.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
            appleWarningElement.style.animationPlayState = "running";
        }, 8000);
    });
}