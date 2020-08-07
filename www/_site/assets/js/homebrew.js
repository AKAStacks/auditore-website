/*
 *
 * Modals based on example from w3.com
 * For Sale modal
 *
 */

(function () {

let i;
let saleImgs = forsale.getElementsByTagName("img");
let saleModalBG = document.getElementsByClassName("dating-container")[0];
let saleModal = document.getElementById("dating-modal");
let saleModalImg = document.getElementById("dating-img");
let saleModalInt = document.getElementById("dating-modal-int");
let saleCaptions = forsale.getElementsByTagName("h3");
let saleClose = document.getElementById("dating-close");

for (i = 0; i < saleImgs.length; i ++) {
    saleImgs[i].index = i;
    saleImgs[i].onclick = function() {
        lockScrollPos();
        saleModal.classList.add("zoomanim");
        document.getElementById("dating-name").innerHTML = saleCaptions[this.index].innerHTML;
        saleModalBG.style.display = "grid";
        saleModalImg.src = this.src;
        window["saleIndex"] = this.index;
    }
}

saleModalImg.onclick = saleModal.onclick = saleModalInt.onclick = function(e) {
    // Stop the event passing to the modal background
    e.stopPropagation();
}

saleModalBG.onclick = saleClose.onclick = function() {
    saleModal.addEventListener('animationend', (e) => {
        if (e.animationName === 'zoomaway') {
            saleModalBG.style.display = "none";
            unlockScrollPos();
            saleModal.classList.remove('zoomaway');
        }
    }, true);
    saleModal.classList.add('zoomaway');
}

let left = document.getElementById("dating-left");
let right = document.getElementById("dating-right");

// When the user clicks left or right, do something;
left.onclick = right.onclick = function(e) {
    // Figure out what index of wipimgs, then iterate +1, -1 or roundrobin

    // Stop the event passing to the modal background
    if (typeof e !== 'undefined') {
        e.stopPropagation();
    }

    // Create clone to allow for repeat animation
    let newOne = saleModal.cloneNode(true);
    newOne.classList.remove('zoomanim');
    newOne.classList.add('zoomfast');
    let oldModal = saleModal;

    // Left v. Right
    if (this.attributes.Id.value === "dating-right") {
        oldModal.classList.add("right-swipe-out");
        window["saleIndex"] += 1;
    } else {
        oldModal.classList.add("left-swipe-out");
        window["saleIndex"] -= 1;
    };


    oldModal.addEventListener("animationend", function (e) {
        oldModal.parentNode.removeChild(oldModal);
        saleModalBG.appendChild(newOne);
        saleModalImg = document.getElementById("dating-img");
        saleModal = newOne;

        console.log(saleModalImg.src);
        saleModalImg.src = saleImgs[window["saleIndex"]].src;
        console.log(saleModalImg.src);
    }, false);

    // Round-robin
    if (window["saleIndex"].index >= saleImgs.length) {
        window["saleIndex"].index = 0;
    } else if (window["saleIndex"].index < 0) {
        window["saleIndex"].index = saleImgs.length - 1;
    };
}
})();

/*
 *
 * Modals based on example from w3.com
 * WIP Modal
 *
*/

(function () {
let modal = document.getElementsByClassName("modal")[0];

// Get the image and insert it inside the modal - use its "alt" text as a caption
let wipimgs = portfolio.getElementsByTagName("img");
let captions = portfolio.getElementsByTagName("h3");
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");

for (i = 0; i < wipimgs.length; i++) {
    wipimgs[i].index = i;
    wipimgs[i].onclick = function() {
        lockScrollPos();
        modal.classList.remove('fadeout');
        modal.classList.add('fade');
        $(".modal-content").addClass("zoomanim");
        modal.style.display = "block";
        modalImg.src = this.src;
        modalImg.index = this.index;
        captionText.innerHTML = captions[this.index].innerHTML;
    }
}

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let left = document.getElementById("left");
let right = document.getElementById("right");

// When the user clicks on <span> (x), close the modal
span.onclick = modal.onclick = function() {
    // Stop the event passing to the modal background
    if (typeof e !== 'undefined') {
        e.stopPropagation();
    }

    modalImg.addEventListener('animationend', (e) => {
        if (e.animationName === 'zoomaway') {
            modal.style.display = "none";
            unlockScrollPos();
            $('.modal-content').removeClass('zoomaway');
            captionText.classList.remove('zoomaway');
        }
    }, true);
    modalImg.classList.add('zoomaway');
    captionText.classList.add('zoomaway');
    modal.classList.remove('fadein');
    modal.classList.add('fadeout');
}

// When the user clicks left or right, do something;
left.onclick = right.onclick = function(e) {
    // Figure out what index of wipimgs, then iterate +1, -1 or roundrobin

    // Stop the event passing to the modal background
    if (typeof e !== 'undefined') {
        e.stopPropagation();
    }

    // Create clone to allow for repeat animation
    let newOne = modalImg.cloneNode(true);
    newOne.classList.remove('zoomanim');
    newOne.classList.add('zoomfast');
    let oldModalImg = modalImg;

    // Left v. Right
    if (this.attributes.Id.value === "right") {
        oldModalImg.classList.add("right-swipe-out");
        modalImg.index += 1;
    } else {
        oldModalImg.classList.add("left-swipe-out");
        modalImg.index -= 1;
    };


    oldModalImg.addEventListener("animationend", function (e) {
        oldModalImg.parentNode.removeChild(oldModalImg);
        newOne.index = modalImg.index;
        modal.appendChild(newOne);
        modalImg = newOne;

        modalImg.src = wipimgs[modalImg.index].src;
        captionText.innerHTML = captions[modalImg.index].innerHTML;
    }, false);

    // Round-robin
    if (modalImg.index >= wipimgs.length) {
        modalImg.index = 0;
    } else if (modalImg.index < 0) {
        modalImg.index = wipimgs.length - 1;
    };
}
})();
// Handle Swipes
$(function() {
  $(".modal").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        if (direction === "left") {
            left.onclick();
        } else if (direction === "right") {
            right.onclick();
        } else {
            modal.style.display = "none";
            unlockScrollPos();
        }
    }
  });
});

// Handle arrow keys
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }

    switch (event.key) {
        case "ArrowLeft":
            left.onclick();
            break;
        case "ArrowRight":
            right.onclick();
            break;
        case "Escape":
            modal.style.display = "none";
            unlockScrollPos();
            break;
        default:
            return;
    }

    event.preventDefault();
}, true);

/*
 *
 * Lock scrolling, maintain page spot
 *
 */

function lockScrollPos() {
    // lock scroll position, but retain settings for later
    let scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
    ];
    let html = $('html'); // it would make more sense to apply this to body, but IE7 won't have that
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
};

function unlockScrollPos() {
    // un-lock scroll position
    let html = jQuery('html');
    let scrollPosition = html.data('scroll-position');
    html.css('overflow', html.data('previous-overflow'));
    window.scrollTo(scrollPosition[0], scrollPosition[1])
};
