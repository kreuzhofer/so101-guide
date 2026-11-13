(function () {
  "use strict";

  // The chapter list is a <details>: always open on desktop, a drawer on a phone.
  var menu = document.getElementById("chapter-menu");
  var wide = window.matchMedia("(min-width: 56.01rem)");
  function syncMenu() { if (menu) { menu.open = wide.matches; } }
  syncMenu();
  if (wide.addEventListener) { wide.addEventListener("change", syncMenu); }

  // Wide tables scroll inside their own box, never the page.
  document.querySelectorAll(".prose table").forEach(function (table) {
    var wrap = document.createElement("div");
    wrap.className = "table-wrap";
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  // External links open in a new tab.
  document.querySelectorAll('a[href^="http"]').forEach(function (a) {
    a.target = "_blank";
    a.rel = "noopener";
  });

  // Copy buttons on code blocks.
  document.querySelectorAll(".highlight").forEach(function (block) {
    var pre = block.querySelector("pre");
    if (!pre) { return; }
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy";
    btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      var text = pre.innerText.replace(/\n$/, "");
      function done(label) {
        btn.textContent = label;
        setTimeout(function () { btn.textContent = "Copy"; }, 1400);
      }
      function selectFallback() {
        var range = document.createRange();
        range.selectNodeContents(pre);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        done("Selected");
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done("Copied"); }, selectFallback);
      } else {
        selectFallback();
      }
    });
    block.appendChild(btn);
  });

  // Checklists remember their ticks in this browser only.
  var pageKey = "so101-guide:" + (location.pathname.split("/").pop() || "index.html");
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(pageKey) || "{}") || {}; } catch (e) { saved = {}; }
  document.querySelectorAll(".task-list-item input[type=checkbox]").forEach(function (box, i) {
    var item = box.closest(".task-list-item");
    box.disabled = false;
    box.id = "check-" + i;
    if (saved[i]) { box.checked = true; }
    function paint() { if (item) { item.classList.toggle("is-done", box.checked); } }
    paint();
    box.addEventListener("change", function () {
      paint();
      saved[i] = box.checked;
      try { localStorage.setItem(pageKey, JSON.stringify(saved)); } catch (e) { /* storage unavailable */ }
    });
  });
})();
