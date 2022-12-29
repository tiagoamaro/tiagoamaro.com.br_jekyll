"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var menuArrow = document.querySelector(".mobile-menu-arrow");
  var sidebarItems = document.querySelectorAll(
    ".sidebar .sidebar-nav, .sidebar .sidebar-copyright"
  );

  menuArrow.onclick = function () {
    menuArrow.classList.toggle("mobile-menu-arrow-up");
    menuArrow.classList.toggle("mobile-menu-arrow-down");

    sidebarItems.forEach(function (item) {
      item.classList.toggle("show-mobile");
    });
  };
});
