(function() {
  //$(document)
  //  .ready(function() {
  // fix header when passed
  $('.b-opportunity-masthead')
    .visibility({
      once: false,
      onBottomPassed: function() {
        $('[data-action=fixedHeader]').transition('fade in');
      },
      onBottomPassedReverse: function() {
        $('[data-action=fixedHeader]').transition('fade out');
      }
    });
})();