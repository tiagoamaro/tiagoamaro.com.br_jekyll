"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var menu_arrow      = document.querySelector(".mobile-menu-arrow");
  var menu_arrow_icon = document.querySelector(".mobile-menu-arrow .fa-angle-down");
  var sidebar_items   = document.querySelectorAll(".sidebar .sidebar-nav, .sidebar .sidebar-copyright, .sidebar .social-networks");

  menu_arrow.onclick = function () {
    menu_arrow_icon.classList.toggle("fa-angle-down");
    menu_arrow_icon.classList.toggle("fa-angle-up");

    for (var i = 0; i < sidebar_items.length; i++) {
      sidebar_items[i].classList.toggle("show-mobile")
    }
  }
});
