let sticky = document.querySelector("#sticky");

sticky.addEventListener("click", function (e) {
  addSticky();
});

function addSticky(imageElement) {
  let stickyDiv = document.createElement("div");
  stickyDiv.classList.add("sticky");
  stickyDiv.innerHTML = `<div class="sticky-header">
    <div class="minimize"></div>
    <div class="close"></div>
  </div>`;
  let minimize = stickyDiv.querySelector(".minimize");
  let close = stickyDiv.querySelector(".close");
  let stickyHeader = stickyDiv.querySelector(".sticky-header");
  let stickyContent;
  if (imageElement) {
    let stickyImageDiv = document.createElement("div");
    stickyImageDiv.classList.add("sticky-image-div");
    stickyDiv.append(stickyImageDiv);
    stickyImageDiv.append(imageElement);
    stickyContent = stickyImageDiv;
  } else {
    // <div class="sticky-content" contenteditable="true"></div>
    let stickyContentDiv = document.createElement("div");
    stickyContentDiv.classList.add("sticky-content");
    stickyContentDiv.setAttribute("contenteditable", "true");
    stickyContentDiv.setAttribute("spellcheck", "false");
    stickyDiv.append(stickyContentDiv);
    stickyContent = stickyContentDiv;
  }

  minimize.addEventListener("click", function () {
    stickyContent.style.display == "none"
      ? (stickyContent.style.display = "block")
      : (stickyContent.style.display = "none");
  });

  close.addEventListener("click", function () {
    stickyDiv.remove();
  });

  let stickyHold = false;
  let initialX;
  let initialY;

  stickyHeader.addEventListener("mousedown", start, false);
  stickyHeader.addEventListener("touchstart", start, false);
  stickyHeader.addEventListener("mousemove", drag, false);
  stickyHeader.addEventListener("touchmove", drag, false);
  stickyHeader.addEventListener("touchend", stop, false);
  stickyHeader.addEventListener("mouseup", stop, false);

  function start(e) {
    stickyHold = true;
    initialX = e.clientX;
    initialY = e.clientY;
  }

  function drag(e) {
    if (stickyHold) {
      let finalX = e.clientX;
      let finalY = e.clientY;

      let dx = finalX - initialX;
      let dy = finalY - initialY;

      let { top, left } = stickyDiv.getBoundingClientRect();
      //   sticky => top + dy
      //  sticky => left + dx
      stickyDiv.style.top = top + dy + "px";
      stickyDiv.style.left = left + dx + "px";

      initialX = finalX;
      initialY = finalY;
    }
  }

  function stop(e) {
    stickyHold = false;
  }

  document.body.append(stickyDiv);
}
