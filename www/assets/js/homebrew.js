/*
 *
 * Modals based on example from w3.com
 *
*/

var modal = document.getElementsByClassName("modal")[0];

// Get the image and insert it inside the modal - use its "alt" text as a caption
var imgs = portfolio.getElementsByTagName("img");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

var i;
for (i = 0; i < imgs.length; i++) {
    imgs[i].onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

modal.onclick = function() {
    modal.style.display = "none";
}
