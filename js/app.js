const APP = (function () {
  //sync load json file jquery extend
  $.extend({
    _syncGetJSON: function (json_url) {
      $.ajaxSetup({ async: false });
      var result = $.getJSON(json_url);
      $.ajaxSetup({ async: true });
      return result.responseJSON;
    },
  });

  return {
    API_URL: ENV.API_URL,
    SwalToast: Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }),
    _getTemplateAjax: function (path, callback) {
      var source, template;
      $.get(
        path + "?_=" + new Date().getTime(),
        function (data) {
          source = data;
          template = Handlebars.compile(source);
          if (callback) callback(template);
        },
        "html"
      );
    },
    _renderHandlebarsTemplate: function (
      withTemplate,
      inElement,
      withData,
      callback
    ) {
      this._getTemplateAjax(withTemplate, function (template) {
        inElement = inElement || $("#app-body");
        var targetDiv = typeof inElement == "string" ? $(inElement) : inElement;
        targetDiv.html(template(withData));
        if (callback) {
          callback();
        }
      });
    },
    _scrollup: function () {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    },
    _handleBarsRegister: function () {
      //ifcond
      Handlebars.registerHelper("if-cond", function (v1, v2, options) {
        if (v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      });

      //rand number beween x and y
      Handlebars.registerHelper("rand", function (x, y, options) {
        return Math.floor(Math.random() * (y - x + 1) + x);
      });
    },
    isPromise: function (p) {
      return p && Object.prototype.toString.call(p) === "[object Promise]";
    },
    setFormReadOnlyAttribute: function (form, boolean) {
      var elements = form.elements;
      for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = boolean;
      }
    },
    registerNavPartial: function () {
      return new Promise((resolve, reject) => {
        $.get("/templates/partials/nav.hbs", function (data) {
          Handlebars.registerPartial("nav", data);
          $.get("/templates/partials/footer.hbs", function (data) {
            Handlebars.registerPartial("footer", data);
            resolve(true);
          });
        });
      });
    },
    storeAuthToken: function (token) {
      localStorage.setItem("auth_token", "Bearer " + token);
      return this.getAuthToken();
    },
    clearAuthToken: function () {
      localStorage.removeItem("auth_token");
      return this.getAuthToken();
    },
    getAuthToken: function () {
      return localStorage.getItem("auth_token");
    },
    getHeader: function () {
      return {
        Accept: "*/*",
        Authorization: APP.getAuthToken(),
      };
    },
  };
})();
Object.freeze(APP);

APP._handleBarsRegister();

var observeDOM = (function () {
  var MutationObserver =
      window.MutationObserver || window.WebKitMutationObserver,
    eventListenerSupported = window.addEventListener;

  return function (obj, callback) {
    if (MutationObserver) {
      // define a new observer
      var obs = new MutationObserver(function (mutations, observer) {
        if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
          callback();
      });
      // have the observer observe foo for changes in children
      obs.observe(obj, { childList: true, subtree: true });
    } else if (eventListenerSupported) {
      obj.addEventListener("DOMNodeInserted", callback, false);
      obj.addEventListener("DOMNodeRemoved", callback, false);
    }
  };
})();

// Observe a specific DOM element:
observeDOM(document.getElementById("app-body"), function () {
  NProgress.inc().done();
});

/*!
 * Start Bootstrap - Creative v7.0.0 (https://startbootstrap.com/theme/creative)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: 74,
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});
