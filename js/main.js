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
      var name = (form.querySelector('[name="name"]') || {}).value || "";
      var phone = (form.querySelector('[name="phone"]') || {}).value || "";
      var email = (form.querySelector('[name="email"]') || {}).value || "";
      var city = (form.querySelector('[name="city"]') || {}).value || "";
      var service = (form.querySelector('[name="service"]') || {}).value || "";
      var message = (form.querySelector('[name="message"]') || {}).value || "";

      var body =
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Email: " + email + "\n" +
        "City: " + city + "\n" +
        "Service: " + service + "\n\n" +
        message;

      var mailto =
        "mailto:gilberthandymenservices@gmail.com" +
        "?subject=" + encodeURIComponent("Quote request — " + (service || "Handyman")) +
        "&body=" + encodeURIComponent(body);

      var success = document.getElementById("form-success");
      if (success) success.classList.add("show");

      // Stub endpoint note: opens mailto as the delivery method until a backend is wired.
      window.location.href = mailto;
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
