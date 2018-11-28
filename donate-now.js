$(function() {
  var $body = $('body');
  var $window = $(window);
  var today = new Date();

  Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
  };

    var expirationDate = new Date(localStorage.modalExp);
      // console.log('today:', today);
      // console.log('today:', today.getTime());
      // console.log('expirationDate:', expirationDate);
      // console.log('expirationDate:', expirationDate.getTime());

    if (localStorage.modalExp === undefined || today.getTime() > expirationDate.getTime()) {
      // show the modal
      $body.prepend(
        '<div id="donate-bg" class="donate-bg"></div>' +
          '<div id="donate-modal" class="donate-modal">' +
          '<a href="#" id="donate-modal-close" class="donate-modal-close">&#215;</a>' +
          '<img src="https://jermartin77.github.io/donate-now/images/pop-up-bg.jpg">' +
          '<div class="donate-modal-content">' +
          "<p>Do you know that we rely on public donations to provide advisories and community education? Please consider supporting avalanche safety in our valley.</p>" +
          '<a href="http://flatheadavalanche.org/donate" id="donate-modal-btn" class="donate-modal-btn">Donate Now!</a>' +
          '<a href="#" id="donate-modal-link" class="donate-modal-link">I already donated</a>' +
          "</div>" +
          "</div>"
      );

      // trigger the modal on scroll for desktop
      if ($window.width() > 768) {
        $window.one("scroll", function() {
          $body.addClass("load-donate-modal");
        });
      } else {
        $body.addClass("load-donate-modal");
      }
    }

  function closeModal() {
    $body.removeClass("load-donate-modal");
    setTimeout(function() {
      $("#donate-bg").remove();
      $("#donate-modal").remove();
    }, 500);
  }

  $("#donate-modal-close, #donate-modal-link, #donate-bg").on("click", function(e) {
    e.preventDefault();
    closeModal();
  });

  $("#donate-modal-close, #donate-bg").on("click", function() {
    localStorage.modalExp = today.addDays(12);
    console.log(localStorage.modalExp);
  });

  $("#donate-modal-btn, #donate-modal-link").on("click", function() {
    localStorage.modalExp = today.addDays(180);
    console.log(localStorage.modalExp);
  });
});
