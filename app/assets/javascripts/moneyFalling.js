
  mySettings = {
    width:950, // canvas size
    height:553, // canvas size

    data: {
      "model":[ {label:"Column B"} ],
      "strata":[[ {
        initValue: 20,
        label: "Strata 1 col B"
      }]],
    // start of automatic token generator 
    stream:{ provider:0},
    },
    sedimentation:{
      // TOKENS ARE THE BALLS THAT DROP
      // token:{
      //   size:{original:20},
      // },
      aggregation:{height:1},
      suspension:{
        decay:{power:1.001} // speed at which the balls disappear smaller number is slower
      }
    },
    options:{
      layout:false
    },
    chart:{
    }
  };
  // Init the sedimentation library
  var barChart = $("#myDemo").vs(mySettings).data('visualSedimentation');
