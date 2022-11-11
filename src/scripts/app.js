let toggleNavStatus = false;

let toggleNav = function () {
  let getSidebar = document.querySelector(".navbar-menu");
  let getSidebarUL = document.querySelector(".side-nav ul");
  let getSidebarLinks = document.querySelectorAll(".side-nav a");
  let getSidebarVisibility = document.querySelector(".side-nav");
  var htmlGrab = document.querySelector("html");
  const hamburger = document.querySelector(".hamburger");

  hamburger.classList.toggle("is-active");

  if (toggleNavStatus === false) {
    getSidebarVisibility.style.visibility = "visible";

    getSidebarLinks.forEach((item, index) => {
      item.style.opacity = "1";
      item.style.visibility = "visible";
    });
    getSidebar.style.width = "60%";
    htmlGrab.classList.add("clicked");
    toggleNavStatus = true;
    // servicesUL.classList.add("clicked");
  } else if (toggleNavStatus === true) {
    getSidebarLinks.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transitionDelay = "0s";
      item.style.visibility = "hidden";
    });
    getSidebar.style.width = "0";
    htmlGrab.classList.remove("clicked");
    toggleNavStatus = false;
    // servicesUL.classList.remove("clicked");
  }
};

// Remove spinner if iframe loaded after 2 seconds
if (document.getElementsByTagName("iframe").length) {
  document.getElementsByTagName("iframe")[0].onload = () => {
    setTimeout(() => {
      if (document.getElementById("spinner")) {
        document.getElementById("spinner").remove();
      }
    }, 1000);
  };
}

// Remove spinner if there's no iframe so it doesn't spin forever
if (document.getElementById("spinner")) {
  setTimeout(() => {
    if (document.getElementById("spinner")) {
      document.getElementById("spinner").remove();
    }
  }, 8000);
}

var widget_container = document.getElementById("msgr-widget");

var open_btn = document.getElementById("contact-btn");
var widget = document.getElementById("msgrw-body");
var msgrw = document.getElementById("msgrw");
var widget_close = document.getElementById("close-btn");
var widget_msg = document.getElementById("msgrw-msg");
var widget_avatar = document.getElementById("msgrw-ava");

open_btn.onclick = function () {
  if (widget.className == "msgrw-body") {
    msgrw.className += " msgrw_opened";
    widget.className += " msgrw-body__opened";

    widget_close.innerHTML = `
    <span id="close-btn"> <svg class="checkmark" xmlns="http://www.w3.org/2000/svg"                 viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path class="checkmark__check" fill="none" d="M16 16 36 36 M36 16 16 36" /> </svg> </span>`;
  } else {
    widget_close.innerHTML = "";
    msgrw.className = "msgrw";
    widget.className = "msgrw-body";
  }
};

widget_close.onclick = function () {
  widget.className = "msgrw-body";
  msgrw.className = "msgrw";
};

var testing = document.getElementById("time-btn");

setTimeout(() => {
  testing.style.opacity = "1";
}, 2000);
