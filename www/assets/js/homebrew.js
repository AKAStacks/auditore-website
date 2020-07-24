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
  modal.style.display = "none";
}

// When the user clicks left or right, do something;
left.onclick = right.onclick = function(e) {
    // Figure out what index of imgs, then iterate +1, -1 or roundrobin

    e.stopPropagation();

    if (this.attributes.Id.value === "right") {
        modalImg.index += 1;
    } else {
        modalImg.index -= 1;
    };

    if (modalImg.index >= imgs.length) {
        modalImg.index = 0;
    } else if (modalImg.index < 0) {
        modalImg.index = imgs.length - 1;
    };

    captionText.innerHTML = captions[modalImg.index].innerHTML;
    modalImg.src = imgs[modalImg.index].src;
}

// Handle Swipes
$(function() {
  $(".modal-content").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        if (direction === "left") {
            left.onclick();
        } else if (direction === "right") {
            right.onclick();
        } else {
            modal.style.display = "none";
        }
    }
  });
});

// Fucking Swipey animation

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
            break;
        default:
            return;
    }

    event.preventDefault();
}, true);
