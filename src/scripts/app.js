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

// Remove spiner if iframe loaded after 2 seconds
if (document.getElementsByTagName("iframe").length) {
  document.getElementsByTagName("iframe")[0].onload = () => {
    setTimeout(() => {
      if (document.getElementById("spinner")) {
        document.getElementById("spinner").remove();
      }
    }, 2000);
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
