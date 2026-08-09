"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var menuArrow = document.querySelector(".mobile-menu-arrow");
  var sidebarItems = document.querySelectorAll(
    ".sidebar .sidebar-nav, .sidebar .sidebar-copyright"
  );

  menuArrow.onclick = function () {
    menuArrow.classList.toggle("rotate-45");
    menuArrow.classList.toggle("-rotate-45");

    sidebarItems.forEach(function (item) {
      item.classList.toggle("hidden");
    });
  };
});
