const Dashboard = {
  init: function () {
    // lets imagine you hava a remote async call
    setTimeout(function () {
      APP._renderHandlebarsTemplate(
        "templates/pages/dashboard.hbs",
        undefined,
        { name: "Dashboard", blocks: ["Block A", "Block B"] }, // this is the way you can pass the data to handlebars template to compile and render
        function () {}
      );
    }, 100);
  },
};
Object.freeze(Dashboard);
