window.addEventListener('message', function (t) {
    if ('https://teams.igem.org' === t.origin) {
        let { type: e, data: i } = JSON.parse(t.data);
        'igem-attribution-form' === e &&
            (document.getElementById('igem-attribution-form').style.height = `${i + 100}px`);
    }
});
//# sourceMappingURL=attributions.js.map
