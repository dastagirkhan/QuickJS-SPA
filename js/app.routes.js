(function (rlite) {
  const r = rlite(notFound, {
    // Default route
    login: function () {
      return new Promise(function (resolve, reject) {
        let cb = function () {
          document.title = "QJS - Login";
          Login.init();
        };

        typeof Login === "undefined"
          ? loadjs("/js/app.login.js?v=" + ENV.version, cb)
          : cb.call();
        resolve();
      });
    },
    "": function () {
      return new Promise(function (resolve, reject) {
        let cb = function () {
          document.title = "QJS - Dashboard";
          Dashboard.init();
        };

        typeof Dashboard === "undefined"
          ? loadjs("/js/app.dashboard.js?v=" + ENV.version, cb)
          : cb.call();
        resolve();
      });
    },
    dashboard: function () {
      return new Promise(function (resolve, reject) {
        let cb = function () {
          document.title = "QJS - Dashboard";
          Dashboard.init();
        };

        typeof Dashboard === "undefined"
          ? loadjs("/js/app.dashboard.js?v=" + ENV.version, cb)
          : cb.call();
        resolve();
      });
    },
    logout: function () {
      // do all actions thats required like deleting cookies, clearing session etc.., and redirect to login
      APP.clearAuthToken();
      window.location.hash = "login";
    },
  });

  function notFound() {
    return $("#app-body").html("<h1>404 Not found </h1>");
  }

  function beforeHashChange() {
    var hash = location.hash || "#";
    if (
      APP.getAuthToken() === null &&
      (hash.slice(1) !== "login" || hash.slice(1) !== "/login")
    ) {
      window.location.hash = "login";
    }
    if (
      APP.getAuthToken() !== null &&
      (hash.slice(1) === "login" || hash.slice(1) === "/login")
    ) {
      window.location.hash = "dashboard";
    }
    registerPartial().then(
      function () {
        processHash();
      },
      function (error) {
        console.log(error);
      }
    );
  }

  function registerPartial() {
    return new Promise(function (resolve, reject) {
      APP.registerNavPartial().then(
        function (result) {
          resolve();
        },
        function (error) {
          console.log(error);
          reject();
        }
      );
    });
  }

  // Hash-based routing
  function processHash() {
    var hash = location.hash || "#";
    NProgress.start();
    const promise = r(hash.slice(1));
    APP.isPromise(promise)
      ? promise.then(
          function () {
            console.log("done");
          },
          function () {
            NProgress.inc().done();
          }
        )
      : NProgress.inc().done();
  }

  window.addEventListener("hashchange", beforeHashChange);
  beforeHashChange();
})(Rlite);
