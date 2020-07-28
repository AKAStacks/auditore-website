/*
 *
 * Modals based on example from w3.com
 *
*/

var modal = document.getElementsByClassName("modal")[0];

// Get the image and insert it inside the modal - use its "alt" text as a caption
var imgs = portfolio.getElementsByTagName("img");
var captions = portfolio.getElementsByTagName("h3");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

var i;
for (i = 0; i < imgs.length; i++) {
    imgs[i].index = i;
    imgs[i].onclick = function() {
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
    // Figure out what index of imgs, then iterate +1, -1 or roundrobin

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

        modalImg.src = imgs[modalImg.index].src;
        captionText.innerHTML = captions[modalImg.index].innerHTML;
    }, false);

    // Round-robin
    if (modalImg.index >= imgs.length) {
        modalImg.index = 0;
    } else if (modalImg.index < 0) {
        modalImg.index = imgs.length - 1;
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
