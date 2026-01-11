// Split artist name into individual letters for animation
document.addEventListener('DOMContentLoaded', function() {
    const artistName = document.querySelector('.artist-name');
    if (artistName && !artistName.querySelector('span')) {
        const text = artistName.textContent;
        artistName.innerHTML = '';

        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            // Preserve spaces
            if (text[i] === ' ') {
                span.style.marginRight = '0.3em';
            }
            artistName.appendChild(span);
        }
    }
});
