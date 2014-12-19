var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

var xB = x * 0.74098082;

function updateWindow(){
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    
    // svg.attr("width", x).attr("height", y);
}
window.onresize = updateWindow;
console.log(xB, y);

  mySettings = {
    width: xB, // canvas size
    height: y, // canvas size

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
        decay:{power:1.005} // speed at which the balls disappear smaller number is slower
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
