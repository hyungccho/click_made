$(document).ready(function () {
  $('body').on({
    'mousewheel': function (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
  
  $(".submit").on('click', function () {
    alert('Mujin likes cock');
  });
});