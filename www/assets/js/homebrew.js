/*
 *
 * Modals based on example from w3.com
 * For Sale modal
 *
 */

var i;
var saleImgs = forsale.getElementsByTagName("img");
var saleModalBG = document.getElementsByClassName("dating-container")[0];
var saleModal = document.getElementById("dating-modal");
var saleModalImg = document.getElementById("dating-img");

for (i = 0; i < saleImgs.length; i ++) {
    saleImgs[i].index = i;
    saleImgs[i].onclick = function() {
        $("body").addClass("noscroll");
        $("html").addClass("noscroll");
        $(".dating-modal").addClass("zoomanim");
        saleModalBG.style.display = "block";
        saleModalImg.src = this.src;
    }
}

saleModalBG.onclick = function() {
    saleModal.addEventListener('animationend', (e) => {
        if (e.animationName === 'zoomaway') {
            saleModalBG.style.display = "none";
            $("body").removeClass("noscroll");
            $("html").removeClass("noscroll");
            saleModal.classList.remove('zoomaway');
        }
    }, true);
    saleModal.classList.add('zoomaway');
}

/*
 *
 * Modals based on example from w3.com
 * WIP Modal
 *
*/

var modal = document.getElementsByClassName("modal")[0];

// Get the image and insert it inside the modal - use its "alt" text as a caption
var wipimgs = portfolio.getElementsByTagName("img");
var captions = portfolio.getElementsByTagName("h3");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

for (i = 0; i < wipimgs.length; i++) {
    wipimgs[i].index = i;
    wipimgs[i].onclick = function() {
        $("body").addClass("noscroll");
        $("html").addClass("noscroll");
        $(".modal-content").addClass("zoomanim");
        modal.style.display = "block";
        modalImg.src = this.src;
        modalImg.index = this.index;
        captionText.innerHTML = captions[this.index].innerHTML;
    }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var left = document.getElementById("left");
var right = document.getElementById("right");

// When the user clicks on <span> (x), close the modal
span.onclick = modal.onclick = function() {
    modalImg.addEventListener('animationend', (e) => {
        if (e.animationName === 'zoomaway') {
            modal.style.display = "none";
            $("body").removeClass("noscroll");
            $("html").removeClass("noscroll");
            $('.modal-content').removeClass('zoomaway');
            captionText.classList.remove('zoomaway');
        }
    }, true);
    modalImg.classList.add('zoomaway');
    captionText.classList.add('zoomaway');
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
            $("body").removeClass("noscroll");
            $("html").removeClass("noscroll");
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
            $("body").removeClass("noscroll");
            $("html").removeClass("noscroll");
            break;
        default:
            return;
    }

    event.preventDefault();
}, true);
