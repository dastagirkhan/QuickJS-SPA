Handlebars.registerHelper("capitalize", function (value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
});
