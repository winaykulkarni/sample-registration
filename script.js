/**************** Copied From Bootstrap */
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      },
      false
    );
  });
})();

/******************** Gender Selection */

$('.gender').click(function () {
  $(this).find('.btn').toggleClass('active');
  if ($(this).find('.btn-primary').length > 0) {
    $(this).find('.btn').toggleClass('btn-primary');
    $('#gender').val($(this).find('.btn-primary').val());
  }
  $(this).find('.btn').toggleClass('btn-default');
});

/***************** Gender Selection */

/* dt = new Date();
dt.setFullYear new Date().getFullYear() - 18; */

$(function () {
  $('#dob').datepicker({
    maxDate: '-18Y',
  });
});

$('#rating').change(function () {
  $('#display-range').html($(this).val());
});

/**************** Copied From Bootstrap */

/************** GET DEGREEES API */

$.ajax({
  type: 'GET',
  dataType: 'json',
  url: 'fetchData.php',
  headers: {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  },
  success: function (resp, status, xhr) {
    // console.log('result: ', resp.data);
    $.each(resp.data, function (key, value) {
      $('#degree').append(
        $('<option></option>').attr('value', value.si_no).text(value.degree)
      );
    });
  },
});

/*********************** PUT DATA */

var frm = $('#put-data');

frm.submit(function (e) {
  $('.toast').toast('show');
  e.preventDefault();
  if (frm[0].checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  } else {
    $.ajax({
      type: frm.attr('method'),
      url: frm.attr('action'),
      data: frm.serialize(),
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      },
      success: function (data) {
        console.log('Submission was successful.');
        if (data.data == 'success') {
          // $("#success").show();
          // alert('yoyo');
          $('#success').removeClass('d-none');
        }
      },
      error: function (data) {
        console.log('An error occurred.');
        console.log(data);
      },
    });
  }
});

/***************** Google Maps API */

function initialize() {
  var input = document.getElementById('location');
  var autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
    document.getElementById('city2').value = place.name;
    document.getElementById('cityLat').value = place.geometry.location.lat();
    document.getElementById('cityLng').value = place.geometry.location.lng();
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

/************** Get Current Lat Lang */

$('#current-location').change(function(){
  if($(this).is(":checked")){
    getLocation();
    $('#location').attr('readonly', true);
  } else {
    $('#location').val("");
    $('#location').attr('readonly', false);
  }
});


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

function showPosition(position) {
  console.log(
    'Latitude: ' +
      position.coords.latitude +
      '<br>Longitude: ' +
      position.coords.longitude
  );
  document.getElementById('cityLat').value = position.coords.latitude;
  document.getElementById('cityLng').value = position.coords.longitude;
  var latlng = new google.maps.LatLng(
    position.coords.latitude,
    position.coords.longitude
  );
  // This is making the Geocode request
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ latLng: latlng }, (results, status) => {
    if (status !== google.maps.GeocoderStatus.OK) {
      alert(status);
    }
    // This is checking to see if the Geoeode Status is OK before proceeding
    if (status == google.maps.GeocoderStatus.OK) {
      console.log(results);
      var address = results[0].formatted_address;
      document.getElementById('city2').value = address;
      document.getElementById('location').value = address;
    
    }
  });
}
