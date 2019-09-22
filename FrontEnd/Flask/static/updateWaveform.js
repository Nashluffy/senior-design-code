

$(document).ready(function() {
    $("#Submit").click(function(){
      $.ajax({
        url: '/',
        data: $('waveform'),
        type: 'POST',
        success: function(response){
          console.log(response);
        },
        error: function(error) {
          console.log(error);
        }
      });
    });
});
