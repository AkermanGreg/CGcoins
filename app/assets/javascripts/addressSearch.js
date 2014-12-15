$(document).ready(function(){
  $("#addressSearch").on('click', function(){
    
    //$("input").val()
    //results =
    // $.getJSON("https://blockchain.info/address/1JHP3jbU2WfYi1EZr9VNqvRAxnXx8V6m9?format=json&cors=true", function(blockstuff){
    //   console.log(blockstuff)
    //   alert("success");
     
    //   alert(data);
    // });
    
    $.ajax({
      url: "https://blockchain.info/address/1JHP3jbU2WfYi1EZr9VNqvRAxnXx8V6m9?callback=&jsonp=false",
      dataType: 'jsonp',

      success: function (data) {
        datajson = data ;
        console.log('ready to stringify') ;
        datastr  = JSON.stringify(data) ;
        console.log('stringify completed sir!') ;
        $('#blockchain').append(datastr);
        console.log(data);
      },

      error: function () {
        alert("failed");
      }
    });
  });
});