"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var menuArrow     = document.querySelector(".mobile-menu-arrow");
  var menuArrowIcon = document.querySelector(".mobile-menu-arrow .fa-angle-down");
  var sidebarItems  = document.querySelectorAll(".sidebar .sidebar-nav, .sidebar .sidebar-copyright, .sidebar .social-networks");

  menuArrow.onclick = function () {
    menuArrowIcon.classList.toggle("fa-angle-down");
    menuArrowIcon.classList.toggle("fa-angle-up");

    for (var i = 0; i < sidebarItems.length; i++) {
      sidebarItems[i].classList.toggle("show-mobile")
    }
  }
});
