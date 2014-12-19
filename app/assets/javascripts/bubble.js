var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
   xB = x * 0.75598082;

function updateWindow(){
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
}

window.onresize = updateWindow;
console.log(xB, y);

mySettings = {

      width: xB,
      height: y,
      chart:{
          type:"heapchart"
      },
      data:{
            "model":
                    [
                      // {label:"Column A"},
                      {label:"Column B"},
                      // {label:"Column C"},
                    ],
            "strata":[
                      [
                        // {value: 10, label: "Strata 1 col A"},
                        {value: 15, label: "Strata 2 col A"},
                        // {value: 10, label: "Strata 3 col A"}
                      ],[
                        // {value: 55, label: "Strata 1 col B"},
                        {value: 5, label: "Strata 2 col B"},
                      ],[
                        // {value: 20, label: "Strata 2 col C"}
                      ]
                    ],
            stream:{provider:0} //'generator',refresh:1600/6
          },
      sedimentation:{
        // token:{
        //   size:{original:15,minimum:3}
        // },
        suspension:{
          decay:{power:1.01  }
        }
      },
      options:{
        layout:false,
        debugaggregate:true,
      }
    };
  var heatchart = $("#heatchart").vs(mySettings).data('visualSedimentation');

