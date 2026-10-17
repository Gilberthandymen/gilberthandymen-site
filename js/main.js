(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = document.getElementById("form-success");
      var errBox = document.getElementById("form-error");
      var btn = form.querySelector('button[type="submit"]');
      var honey = form.querySelector('[name="_honey"]');
      if (honey && honey.value) { return; } // spam bot
      if (errBox) errBox.style.display = "none";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      var data = new FormData(form);
      fetch("https://formsubmit.co/ajax/gilberthandymenservices@gmail.com", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: data
      }).then(function (r) {
        if (!r.ok) throw new Error("bad status");
        return r.json();
      }).then(function () {
        form.reset();
        form.style.display = "none";
        if (success) { success.classList.add("show"); success.scrollIntoView({ behavior: "smooth", block: "center" }); }
      }).catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = "Send quote request"; }
        if (errBox) errBox.style.display = "block";
      });
    });
  }

  // Mark current nav link
  var path = window.location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll(".main-nav a").forEach(function (a) {
    try {
      var href = a.getAttribute("href");
      if (!href || href.startsWith("tel:") || href.startsWith("mailto:")) return;
      var linkPath = new URL(href, window.location.origin).pathname.replace(/\/$/, "") || "/";
      if (linkPath === path || (path.endsWith(linkPath) && linkPath !== "/")) {
        a.classList.add("active");
      }
    } catch (err) { /* ignore */ }
  });
})();
