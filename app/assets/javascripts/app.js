
var btcOutput;
var ltcOutput;
var dgeOutput;
// var output;
var TYPE_BLOCK = "block";

function init() {
  output = document.getElementById("output");
  initWebSocket();
}

function initWebSocket() {//  init blockchain websocket (activity, blocks)
  
 ///////////////////// BITCOIN STARTS///////////////////////
  var blockchain = new WebSocket('ws://ws.blockchain.info/inv');
  blockchain.onerror = function (error){ console.log('connection.onerror',error); };
  blockchain.onopen = function () {
    console.log ("btc CONNECTED");
    blockchain.send( JSON.stringify( {"op":"unconfirmed_sub"} ) );  //  subscribe to uncofirmed activity
    blockchain.send( JSON.stringify( {"op":"blocks_sub"} ) );   //  subscribe to new blocks
  };

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
      document.getElementById("output").innerHTML = "BTC $" + (btcOutput.toString().match(/^\d+(?:\.\d{0,2})?/)) * 375;

      // these if else sets the min and max size tokens for d3
      if( response.amount <= 5 ) {
        response.amount = 5 ;
      }
      else if( response.amount >= 140 ) {
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
  }/////// end of BITCOIN ////////
  
  ///////////////////////////////// DOGECOIN STARTS////////////////////////////////////////
  var dogecoin = new WebSocket('wss://ws.dogechain.info/inv');
  dogecoin.onerror = function (error){ console.log('connection.onerror',error); };
  dogecoin.onopen = function () {
    console.log ("Doge Coin CONNECTED");
    dogecoin.send( JSON.stringify( {"op":"unconfirmed_sub"} ) );  //  subscribe to uncofirmed activity
    dogecoin.send( JSON.stringify( {"op":"blocks_sub"} ) );   //  subscribe to new blocks
  };

  // when messages is received turn it to json and pass it to message.data
  dogecoin.onmessage = function (message) {
    var response = JSON.parse(message.data);
    console.log(message);

    // unconfirmed transactions 
    if( response.op == "utx") {
      var amount = 0;
      
      for(var i = 0; i < response.x.value_out.length; i++ )
        amount += response.x.value_out[i].value;
      
      // DIVIDES THE AMOUNT and COVERTS TO DogeCoin
      response.amount = amount / 1;
      dgeOutput = response.amount;
      console.log(dgeOutput);

      // PRINTS THE INITAL OUTPUT TO THE HTML        converts to string and back to integer 
      document.getElementById("output").innerHTML = "Doge$" + (dgeOutput.toString().match(/^\d+(?:\.\d{0,2})?/)) * 375;

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
    writeToScreen2(response.amount);
  };

  function writeToScreen2(message) {
    barChart.addToken( {
      id:'myId',
      size: message,
      category:0,
      texture: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToSilQz7QztIRYp3ddniAdeaJQiCT7iDjlUvPlW4wtgE8pcw1_Cg'
      }
    });
  }////// end of DOGECOIN //////

  // ///////////////////// LITECOIN starts///////////////////////
  //   var litecoin = new WebSocket('ws://ws.ltcchain.com:8000');
  //   litecoin.onerror = function (error){ console.log('connection.onerror',error); };
  //   litecoin.onopen = function () {
  //     console.log ("LiteCoin CONNECTED");
  //     litecoin.send( JSON.stringify( {"op":"tx_sub"} ) );  //  subscribe to uncofirmed activity
  //     litecoin.send( JSON.stringify( {"op":"block_sub"} ) );   //  subscribe to new blocks
  //   };

  //  // when messages is received turn it to json and pass it to message.data
  //   litecoin.onmessage = function (message) {
  //     var response = JSON.parse(message.data);
  //     console.log("LITECOIN onmessage", message);
      
  //     // unconfirmed transactions 
  //     if( response.op == "utx") {
  //       var amount = 0;
        
  //       for(var i = 0; i < response.x.out.length; i++ )
  //         amount += response.x.out[i].value;
        
  //       // DIVIDES THE AMOUNT and COVERTS TO BTC
  //       response.amount = amount / 100000000;
  //       ltcOutput = response.amount;
  //       console.log(ltcOutput);

  //       // PRINTS THE INITAL OUTPUT TO THE HTML        converts to string and back to integer 
  //       // document.getElementById("output").innerHTML = "$" + (ltcOutput.toString().match(/^\d+(?:\.\d{0,2})?/)) * 375;

  //       // these if else sets the min and max size tokens for d3
  //       if( response.amount <= 5 ) {
  //         response.amount = 5 ;
  //       }
  //       else if( response.amount >= 1400   ) {
  //         response.amount = 1400 ;
  //       }
  //     }

  //     // if a block is created
  //     else if( response.op == "block" ) {
  //       console.log("BLOCK FOUND BLOCK FOUND BLOCK FOUND BLOCK FOUND");
  //       response.amount = Math.round( response.x.height / 10000 );
  //     }
      
  //     // this function fires when an onmessage is received
  //     writeToScreen3(response.amount);
  //   };
  //   // fires a function to drop a d3 token (message is the btc transaction size from response.amount)
  //   function writeToScreen3(message) {
  //     barChart.addToken( {
  //       id:'myId',
  //       size: message,
  //       category:0,
  //       texture: {
  //         src: 'http://www.wired.co.uk/news/archive/2013-06/16/litecoin/viewgallery/305201'
  //       }
  //     });
  //   } //////////// END OF LITECOIN /////////////
}

// fires init function when the window is loaded
window.addEventListener("load", init, false);