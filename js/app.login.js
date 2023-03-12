const Login = {
  init: function () {
    APP._renderHandlebarsTemplate(
      "templates/pages/login.hbs",
      undefined,
      {},
      function () {
        const form = document.getElementById("login_form");
        form.addEventListener("submit", Login.submit);
      }
    );
  },

  submit: function (event) {
    event.preventDefault();
    NProgress.start();
    const form = new FormData(this);
    const settings = {
      async: true,
      crossDomain: true,
      url: APP.API_URL + "/login", // change accordingly
      method: "POST",
      headers: {
        Accept: "*/*",
      },
      dataType: "json",
      processData: false,
      contentType: false,
      mimeType: "multipart/form-data",
      data: form,
    };
    const l = Ladda.create(document.querySelector(".login-button"));
    l.start();
    // make ajax call, i made this comment uncomment and do what you like
    // $.ajax(settings).done(function (response) {});

    // lets assume your ajax call have response with some token

    setTimeout(() => {
      l.stop();
      let ajaxResponse = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      };
      const token = APP.storeAuthToken(ajaxResponse.token);
      if (token !== null) {
        window.location.hash = "dashboard";
      }
    }, 1000);
    return false;
  },
};
Object.freeze(Login);
