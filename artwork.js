// Artwork data structure
const artworks = {
    'nightwalk_home': {
        title: 'Night Walk Home',
        details: [
            'Oil Pastel on Paper',
            'Roughly A4'
        ],
        mainImage: 'pictures/nightwalk_home/artwork_main.jpg',
        additionalImages: [
            'pictures/placeholders/further1.svg',
            'pictures/placeholders/further2.svg',
            'pictures/placeholders/further3.svg',
            'pictures/placeholders/further4.svg'
        ]
    },
    'together': {
        title: 'Together',
        details: [
            'Watercolour on Paper',
            '37x26.6cm',
            '2025'
        ],
        mainImage: 'pictures/together/artwork_main.jpg',
        additionalImages: [
            'pictures/placeholders/further1.svg',
            'pictures/placeholders/further2.svg',
            'pictures/placeholders/further3.svg',
            'pictures/placeholders/further4.svg'
        ]
    },
    'collage1': {
        title: 'Collage 1',
        details: [
            'No description available'
        ],
        mainImage: 'pictures/collage1/artwork_main.jpg',
        additionalImages: [
            'pictures/placeholders/further1.svg',
            'pictures/placeholders/further2.svg',
            'pictures/placeholders/further3.svg',
            'pictures/placeholders/further4.svg'
        ]
    },
    'shielded': {
        title: 'Shielded',
        details: [
            'Watercolour on Paper',
            '161x117 cm (framed)'
        ],
        mainImage: 'pictures/shielded/artwork_main.jpg',
        additionalImages: [
            'pictures/placeholders/further1.svg',
            'pictures/placeholders/further2.svg',
            'pictures/placeholders/further3.svg',
            'pictures/placeholders/further4.svg'
        ]
    },
    'willow': {
        title: 'Willow',
        details: [
            'Acrylic on Canvas',
            '150x120cm',
            '2025',
            'No.9 Cork Street'
        ],
        mainImage: 'pictures/willow/artwork_main.jpg',
        additionalImages: [
            'pictures/placeholders/further1.svg',
            'pictures/placeholders/further2.svg',
            'pictures/placeholders/further3.svg',
            'pictures/placeholders/further4.svg'
        ]
    }
};

// Get artwork ID from URL parameter
function getArtworkId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Load artwork details
function loadArtwork() {
    const artworkId = getArtworkId();

    if (!artworkId || !artworks[artworkId]) {
        window.location.href = 'index.html';
        return;
    }

    const artwork = artworks[artworkId];

    // Set title
    document.getElementById('artwork-title').textContent = artwork.title;
    document.title = `${artwork.title} - Kathryn Maple`;

    // Set main image
    document.getElementById('main-artwork-image').src = artwork.mainImage;
    document.getElementById('main-artwork-image').alt = artwork.title;

    // Set description
    const descriptionContainer = document.getElementById('artwork-description');
    descriptionContainer.innerHTML = '';
    artwork.details.forEach(detail => {
        if (detail && detail.trim() !== '') {
            const p = document.createElement('p');
            p.className = 'artwork-meta';
            p.textContent = detail;
            descriptionContainer.appendChild(p);
        }
    });

    // Set thumbnails below buttons
    const thumbnailsContainer = document.getElementById('further-thumbnails');
    if (artwork.additionalImages && artwork.additionalImages.length > 0) {
        thumbnailsContainer.innerHTML = '';
        artwork.additionalImages.forEach(imagePath => {
            const thumbnailDiv = document.createElement('div');
            thumbnailDiv.className = 'thumbnail-item';
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `${artwork.title} - additional view`;
            img.addEventListener('click', function() {
                document.getElementById('main-artwork-image').src = imagePath;
            });
            thumbnailDiv.appendChild(img);
            thumbnailsContainer.appendChild(thumbnailDiv);
        });
    }
}

// Modal functions
function openEnquireModal() {
    const modal = document.getElementById('enquire-modal');
    const modalTitle = document.getElementById('modal-artwork-title');
    const artworkTitle = document.getElementById('artwork-title').textContent;

    modalTitle.textContent = artworkTitle;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEnquireModal() {
    const modal = document.getElementById('enquire-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Button event handlers
document.addEventListener('DOMContentLoaded', function() {
    loadArtwork();

    // Enquire button - open modal
    document.querySelector('.btn-enquire').addEventListener('click', function() {
        openEnquireModal();
    });

    // Close modal button
    document.getElementById('close-modal').addEventListener('click', function() {
        closeEnquireModal();
    });

    // Close modal when clicking outside
    document.getElementById('enquire-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeEnquireModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeEnquireModal();
        }
    });

    // Handle form submission
    document.getElementById('enquire-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value,
            artwork: document.getElementById('artwork-title').textContent
        };

        // Here you would typically send the form data to a server
        console.log('Form submitted:', formData);

        alert('Thank you for your enquiry! We will be in touch soon.');
        closeEnquireModal();

        // Reset form
        this.reset();
    });

    // Share button - open share modal
    document.querySelector('.btn-share').addEventListener('click', function() {
        openShareModal();
    });

    // Close share modal
    document.getElementById('close-share-modal').addEventListener('click', function() {
        closeShareModal();
    });

    // Close share modal when clicking outside
    document.getElementById('share-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeShareModal();
        }
    });

    // Share option handlers
    document.getElementById('share-facebook').addEventListener('click', function() {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    });

    document.getElementById('share-twitter').addEventListener('click', function() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.getElementById('artwork-title').textContent + ' - Kathryn Maple');
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    });

    document.getElementById('share-email').addEventListener('click', function() {
        const subject = encodeURIComponent(document.getElementById('artwork-title').textContent + ' - Kathryn Maple');
        const body = encodeURIComponent('Check out this artwork: ' + window.location.href);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    });

    document.getElementById('share-copy').addEventListener('click', function() {
        navigator.clipboard.writeText(window.location.href).then(function() {
            alert('Link copied to clipboard!');
            closeShareModal();
        });
    });
});

// Share modal functions
function openShareModal() {
    const modal = document.getElementById('share-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeShareModal() {
    const modal = document.getElementById('share-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}
