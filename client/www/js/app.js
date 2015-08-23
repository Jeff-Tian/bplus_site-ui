// TODO: initial scripts, to be integrated into JS framework
define([], function() {
  return {
    start: function() {
      //$(document)
      //  .ready(function() {
      // fix header when passed
      $('.b-masthead')
        .visibility({
          once: false,
          onBottomPassed: function() {
            $('[data-action=fixedHeader]').transition('fade in');
          },
          onBottomPassedReverse: function() {
            $('[data-action=fixedHeader]').transition('fade out');
          }
        });

      // create sidebar and attach to menu open
      $('.ui.sidebar')
        .sidebar('attach events', '.toc.item');
      //  });

      // TODO: initial tabs, to be integrated into JS framework
      $('.menu .item')
        .tab();
    }
  }
});