console.log(`Script running: ${ document.currentScript.src }`);
//
window.addEventListener("message", function (e) {
    if (e.origin === "https://teams.igem.org") {
        const { type, data } = JSON.parse(e.data);
        if (type === "igem-attribution-form") {
            const element = document.getElementById("igem-attribution-form");
            element.style.height = `${data + 100}px`;
        }
    }
});
