(function(cash) {
  "use strict";

  // Show tab content
  cash("body").on("click", 'a[data-toggle="tab"]', function() {
    // Set active tab nav
    cash(this)
      .closest(".nav-tabs")
      .find('a[data-toggle="tab"]')
      .removeClass("active");
    cash(this).addClass("active");

    // Set active tab content
    let elementId = cash(this).attr("data-target");
    cash(elementId)
      .closest(".tab-content")
      .find(".tab-content__pane")
      .removeClass("active");
    cash(elementId).addClass("active");
  });
})(cash);
