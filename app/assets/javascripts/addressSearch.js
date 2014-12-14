$(document).ready(function(){
  $("#addressSearch").on('click', function(){
    
    //$("input").val()
    // $.get("https://blockchain.info/address/1JHP3jbU2WfYi1EZr9VNqvRAxnXx8V6m9?cors=true", function(data){
      
    //   alert("success");
     
    //   alert(data);
    // });
    
    $.ajax({
      url: 'https://blockchain.info/inv/a16ad7e30af4c504097602c9e983038c305640fdf9158e81aca13f575c988d55?format=json',
      dataType: 'jsonp',

      success: function (data) {
        $('#blockchain').append(JSON.stringify(data));
        console.log(data);
      },

      error: function () {
        alert("failed");
      }
    });
  });
});