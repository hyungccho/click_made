function submitEmail () {
  toggleLoader(true);
  var email = $('.email').val();
  
  if (isValidEmail(email)) {
    $.ajax({
      method: 'POST',
      dataType: 'json',
      data: {
        email: {
          address: email
        }
      },
      url: '/api/emails',
      success: function () {
        addSuccessButton();
      },
      error: function () {
        toggleLoader(false);
      }
    });
  } else {
    // Invalid e-mail format
    toggleLoader(false);
  }
}

function isValidEmail(email) {
  var regex = new RegExp(['^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}',
                          '{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.',
                          '(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|',
                          'name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}',
                          '\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$'
                        ].join(''), 'i')
                        
  return email.search(regex) > -1
}

function toggleLoader (bool) {
  if (bool) {
    $('.submit').removeClass('fa fa-plus').addClass('loading')
  } else {
    $('.submit').removeClass('loading').addClass('fa fa-plus')
  }
}

function addSuccessButton () {
  $('.submit').removeClass('fa fa-plus loading').addClass('fa fa-check');
}

// Listener for triggering e-mail submit
$(document).ready(function () {
  $('body').on({
    'mousewheel': function (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
  
  $(".submit").on('click', submitEmail);
});