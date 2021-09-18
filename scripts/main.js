var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

var otterOneImage = 'img/otter1.jpg';
var otterOneTitle = 'Stayin\' Alive';

var THUMBNAIL_INDEX = 0;
var NEXT_IMAGE_SELECTOR = '[button-role="next"]';
var PREV_IMAGE_SELECTOR = '[button-role="preious"]';

function setDetails(imageUrl, TitleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = TitleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showdetails();
    });
}

function nextDetailImage() {
    'use strict';
    var thumbnails = getThumbnailsArray();

    THUMBNAIL_INDEX++;
    if (THUMBNAIL_INDEX > thumbnails.length - 1) {
        THUMBNAIL_INDEX = 0;
    }
    setDetailsFromThumb(thumbnails[THUMBNAIL_INDEX]);
    showdetails();
}

function prevDetailImage() {
    'use strict';
    var thumbnails = getThumbnailsArray();

    THUMBNAIL_INDEX--;
    if (THUMBNAIL_INDEX < 0) {
        THUMBNAIL_INDEX = thumbnails.length - 1;
    }
    setDetailsFromThumb(thumbnails[THUMBNAIL_INDEX]);
    showdetails();
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var getThumbnailsArray = [].slice.call(thumbnails);
    return getThumbnailsArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showdetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function trackThumbnailIndex(index) {
    'use strict';
    return function () {
        THUMBNAIL_INDEX = index;
    };
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);

    for(var i = 0; i < thumbnails.length; i++) {
        thumbnails[i].addEventListener('click', trackThumbnailIndex(i));
    }

    var next = document.querySelector(NEXT_IMAGE_SELECTOR);
    next.addEventListener('click', function() {
        nextDetailImage();
    });

    var prev = document.querySelector(PREV_IMAGE_SELECTOR);
    prev.addEventListener('click', function() {
        prevDetailImage();
    });

    addKeyPressHandler();
}

initializeEvents();

// var firstThumbnail = document.querySelector(THUMBNAIL_LINK_SELECTOR);
// firstThumbnail.addEventListener('click', function (event) {
//     event.preventDefault();
//     console.log('you clicked');
//     console.log(event);
// });