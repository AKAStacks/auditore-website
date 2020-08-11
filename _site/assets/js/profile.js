/*
 *
 * Profile Photo Modal
 *
*/

(function () {
let modal = document.getElementsByClassName("modal")[0];

// Get the image and insert it inside the modal - use its "alt" text as a caption
let wipimgs = portfolio.getElementsByTagName("img");
let modalImg = document.getElementById("img01");

for (i = 0; i < wipimgs.length; i++) {
    wipimgs[i].index = i;
    wipimgs[i].onclick = function() {
        lockScrollPos();
        modal.classList.remove('fadeout');
        modal.classList.add('fadein');
        $(".modal-content").addClass("zoomanim");
        modal.style.display = "block";
        modalImg.src = this.src;
        modalImg.index = this.index;
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
        }
    }, true);
    modalImg.classList.add('zoomaway');
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
    }, false);

    // Round-robin
    if (modalImg.index >= wipimgs.length) {
        modalImg.index = 0;
    } else if (modalImg.index < 0) {
        modalImg.index = wipimgs.length - 1;
    };
}
})();

/*
 *
 * Handle swipes
 *
 */
$(function() {
  $(".modal").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        let left;
        let right;

        if (document.getElementById("myModal").style.display === "block") {
            left = document.getElementById("left");
            right = document.getElementById("right");
        } else if (document.getElementById("dating-container").style.display === "grid") {
            left = document.getElementById("dating-left");
            right = document.getElementById("dating-right");
        }

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

/*
 *
 * Handle Arrow Keys
 *
 */
window.addEventListener("keydown", function (event) {
    let left;
    let right;

    if (event.defaultPrevented) {
        return;
    }

    if (document.getElementById("myModal").style.display === "block") {
        left = document.getElementById("left");
        right = document.getElementById("right");
    }

    switch (event.key) {
        case "ArrowLeft":
            left.onclick();
            break;
        case "ArrowRight":
            right.onclick();
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
    $("body").addClass("modalBlur");
    if ($("#headerToggle").css("display", "block")) {
        $("#headerToggle").hide();
    }
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
};

function unlockScrollPos() {
    // un-lock scroll position
    let html = $('html');
    let scrollPosition = html.data('scroll-position');
    html.css('overflow', html.data('previous-overflow'));
    $("body").removeClass("modalBlur");
    if ($("#headerToggle").css("display", "block")) {
        $("#headerToggle").show();
    }
    window.scrollTo(scrollPosition[0], scrollPosition[1])
};
