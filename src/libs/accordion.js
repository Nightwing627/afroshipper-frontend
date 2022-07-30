import Velocity from "velocity-animate";

(function(cash) {
  "use strict";

  // Show accordion content
  cash("body").on("click", ".accordion__pane__toggle", function() {
    // Close active accordion
    Velocity(
      cash(this)
        .closest(".accordion")
        .find(".accordion__pane")
        .find(".accordion__pane__content"),
      "slideUp",
      {
        duration: 300,
        complete: function(el) {
          cash(el)
            .closest(".accordion__pane")
            .removeClass("active");
        }
      }
    );

    // Set active accordion
    if (
      cash(this)
        .closest(".accordion__pane")
        .hasClass("active")
    ) {
      Velocity(
        cash(this)
          .closest(".accordion__pane")
          .find(".accordion__pane__content"),
        "slideUp",
        {
          duration: 300,
          complete: function(el) {
            cash(el)
              .closest(".accordion__pane")
              .removeClass("active");
          }
        }
      );
    } else {
      Velocity(
        cash(this)
          .closest(".accordion__pane")
          .find(".accordion__pane__content"),
        "slideDown",
        {
          duration: 300,
          complete: function(el) {
            cash(el)
              .closest(".accordion__pane")
              .addClass("active");
          }
        }
      );
    }
  });
})(cash);
