var wsUri = "wss://ws.blockchain.info/inv";
var btcOutput;
var ltcOutput;
// var output;
var TYPE_BLOCK = "block";

function init() {
  output = document.getElementById("output");
  initWebSocket();
}

function initWebSocket() {
  //  init blockchain websocket (activity, blocks)
  var blockchain = new WebSocket('wss://ws.blockchain.info/inv');
  //var litecoin = new WebSocket('ws://ws.dogechain.info/inv');
  
  litecoin.onopen = function () {

    litecoin.send( JSON.stringify( {"op":"unconfirmed_sub"} ) );  //  subscribe to uncofirmed activity
    litecoin.send( JSON.stringify( {"op":"blocks_sub"} ) );   //  subscribe to new blocks
 
  };
  blockchain.onopen = function () {
    blockchain.send( JSON.stringify( {"op":"unconfirmed_sub"} ) );  //  subscribe to uncofirmed activity
    blockchain.send( JSON.stringify( {"op":"blocks_sub"} ) );   //  subscribe to new blocks


  };

 ///////////////////// BITCOIN ///////////////////////
 // when messages is received turn it to json and pass it to message.data
  blockchain.onmessage = function (message) {
    var response = JSON.parse(message.data);
     console.log(message);
    
    // unconfirmed transactions 
    if( response.op == "utx") {
      var amount = 0;
      
      for(var i = 0; i < response.x.out.length; i++ )
        amount += response.x.out[i].value;
      
      // DIVIDES THE AMOUNT and COVERTS TO BTC
      response.amount = amount / 100000000;
      btcOutput = response.amount;
       console.log(btcOutput);

      // PRINTS THE INITAL OUTPUT TO THE HTML        converts to string and back to integer 
      // document.getElementById("output").innerHTML = "$" + (btcOutput.toString().match(/^\d+(?:\.\d{0,2})?/)) * 375;

      // these if else sets the min and max size tokens for d3
      if( response.amount <= 5 ) {
        response.amount = 5 ;
      }
      else if( response.amount >= 140   ) {
        response.amount = 140 ;
      }
    }

    // if a block is created
    else if( response.op == "block" ) {
      console.log("BLOCK FOUND BLOCK FOUND BLOCK FOUND BLOCK FOUND");
      response.amount = Math.round( response.x.height / 10000 );
    }
    
    // this function fires when an onmessage is received
    writeToScreen(response.amount);
  };
  // fires a function to drop a d3 token (message is the btc transaction size from response.amount)
  function writeToScreen(message) {
    barChart.addToken( {
      id:'myId',
      size: message,
      category:0,
      texture: {
        src: 'assets/bitcoin.jpeg'
      }
    });
  }

  // function writeToScreen(message)
  // {
  //   var pre = document.createElement("p");
  //   pre.style.wordWrap = "break-word";
  //   pre.innerHTML = message;
  //   output.appendChild(pre);
  // }

  ///////////////////////////////// LITECOIN ////////////////////////////////////////
//   // when messages is received turn it to json and pass it to message.data
//   litecoin.onmessage = function (message) {
//     var response = JSON.parse(message.data);
//     console.log(message);
    
//     // unconfirmed transactions 
//     if( response.op == "utx") {
//       var amount = 0;
      
//       for(var i = 0; i < response.x.out.length; i++ )
//         amount += response.x.out[i].value;
      
//       // DIVIDES THE AMOUNT and COVERTS TO LTC
//       response.amount = amount / 1;
//       ltcOutput = response.amount;
//       console.log(ltcOutput);

//       // PRINTS THE INITAL OUTPUT TO THE HTML        converts to string and back to integer 
//       // document.getElementById("output").innerHTML = "$" + (ltcOutput.toString().match(/^\d+(?:\.\d{0,2})?/)) * 375;

//       // these if else sets the min and max size tokens for d3
//       if( response.amount <= 5 ) {
//         response.amount = 5 ;
//       }
//       else if( response.amount >= 140   ) {
//         response.amount = 140 ;
//       }
//     }

//     // if a block is created
//     else if( response.op == "block" ) {
//       console.log("BLOCK FOUND BLOCK FOUND BLOCK FOUND BLOCK FOUND");
//       response.amount = Math.round( response.x.height / 10000 );
//     }
    
//     // this function fires when an onmessage is received
//     writeToScreen2(response.amount);
//   };
// }

// // fires a function to drop a d3 token (message is the btc transaction size from response.amount)
// function writeToScreen(message) {
//   barChart.addToken( {
//     id:'myId',
//     size: message,
//     category:0,
//     texture: {
//       src: '//cdni.wired.co.uk/1920x1280/k_n/litecoin.jpg'
//     }
//   });
// }

// fires init function when the window is loaded
window.addEventListener("load", init, false);