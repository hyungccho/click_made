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
        $('.submit').off('click')
        
        setTimeout(function () {
          addSuccessButton();
        }, 1500);
      },
      error: function () {
        toggleLoader(false);
      }
    });
  } else {
    // Invalid e-mail format
    toggleLoader(false);
    alertInvalidEmailFormat();
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

function toggleSubmit (e) {
  if (e.keyCode == 13) {
    submitEmail()
  }
}

function addSuccessButton () {
  $('.submit').removeClass('fa fa-plus loading').addClass('fa fa-check success');
}

function alertInvalidEmailFormat () {
  $('.email').addClass('invalid')
  
  setTimeout(function () {
    $('.email').removeClass('invalid');
  }, 3000);
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
  $(".email").on('keypress', toggleSubmit);
});