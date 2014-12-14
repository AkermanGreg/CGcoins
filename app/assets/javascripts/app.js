var btcBtn = true;  // for the button to turn on/off btc tokens
var dogeBtn = true; // for button to turn on/off dogecoin tokens

var btcPrintAmt = true; // for the message that prints the amount of bitcoins traded
var btcPrintDollar = true; // for the message that prints the dollar value of bitcoins traded

var btcOutput; // the btc transaction amount
var ltcOutput; // the litecoin transaction amount
var dgeOutput; // the dogecoin transaction amount
var dollarOut; // var for displaying USD amount to screen
var output;    // var for displaying btc transactions to screen
var TYPE_BLOCK = "block"; // var for when a block is created
var total = []; // array for adding the total USD ammount 

//This function toggles the Bitcoin coin drop
function toggleBitcoin() {
  console.log("togglebitcoin works");
  if (btcBtn == false){
    btcBtn = true;
  }
  else {
    btcBtn = false;
  }
}

//This function toggles the Dogecoin coin drop
function toggleDogecoin() {
  console.log("toggle Dogecoin works");
  if (btcBtn == false){
    btcBtn = true;
  }
  else {
      btcBtn = false;
  }
}

//This function toggles the Bitcoin Print Amount display
function toggleBtcPrintAmt() {
  console.log("toggle bitcoin print amount works");
  if (btcPrintAmt == false){
    btcPrintAmt = true;
  }
  else {
    btcPrintAmt = false;
  }
}

//This function toggles the Bitcoin Print Dollar amount display
function toggleBtcPrintDollar() {
  console.log("toggle bitcoin print dollar works");
  if (btcPrintAmt == false){
    btcPrintAmt = true;
  }
  else {
    btcPrintAmt = false;
  }
}



function init() { // fires when page is loaded
  output = document.getElementById("output"); // outputs unconfirmed btc transactions
  dollarOut = document.getElementById("dollar"); // ouputs unconfirmed btc transactions in dollar amount
  initWebSocket(); // fires websocket function to load the websocket
}

function initWebSocket() {//  init blockchain websocket (activity, blocks)
  
 ///////////////////// BITCOIN STARTS///////////////////////
  var blockchain = new WebSocket('ws://ws.blockchain.info/inv'); //blockchain.info's web socket address
  blockchain.onerror = function (error){ console.log('connection.onerror',error); }; // logs if an ".onerror" is a response
  blockchain.onopen = function () { // fires this function when ".onopen" response is received from blockchain's websocket
    console.log ("btc CONNECTED");
    blockchain.send( JSON.stringify( {"op":"unconfirmed_sub"} ) );  //  subscribes to uncofirmed activity
    blockchain.send( JSON.stringify( {"op":"blocks_sub"} ) );   //  subscribes to new blocks
  };

 
  blockchain.onmessage = function (message) { // when ".onmessage" is the response it parses json and pass it to "response" 
    var response = JSON.parse(message.data);
     // console.log(message);
    
    // unconfirmed transactions 
    if( response.op == "utx") { // if the response received is utx passes .value into var amount
      var amount = 0;

      for(var i = 0; i < response.x.out.length; i++ ) // pulls out .value if there are multipule
        amount += response.x.out[i].value; // sets the value of btc to var amount
        
        response.amount = amount / 100000000; // DIVIDES THE AMOUNT and COVERTS TO BTC
        total.push(response.amount); // passes the transaction amount to the total array
        btcOutput = response.amount; // sets btcOutput to the transaction amount before its rounded

      var grandTotal = 0;
        for (var j = 0; j < total.length; ++j) //loops through the total array and adds them up
          grandTotal += total[j] << 0; // adds total and sets it to grandTotal
          // console.log(grandTotal);
        

        // PRINTS THE INITAL OUTPUT TO THE HTML        converts to string and back to integer 
        // document.getElementById("output").innerHTML = "$" + (response.amount.toString().match(/^\d+(?:\.\d{0,2})?/)) * ;
        document.getElementById("grandtotal").innerHTML = "Total $" + (grandTotal.toString().match(/^\d+(?:\.\d{0,2})?/)) * priceUSD;

        // these if else sets the min and max size tokens for d3
        if( response.amount <= 4 ) {
          response.amount = 4 ;
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
    
    if ( btcBtn == true ) {
      writeToScreen(response.amount); // this function fires when an onmessage is received
    }

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
    if (btcPrintAmt == true) {
      var pre = document.createElement("p");
      pre.style.wordWrap = "break-word";
      pre.innerHTML = btcOutput;
      output.appendChild(pre);
    };

    if (btcPrintDollar == true) {
      console.log("second if work");
      var pre2 = document.createElement("p");
      pre2.style.wordWrap = "break-word";
      pre2.innerHTML = btcOutput * priceUSD;
      dollarOut.appendChild(pre2);
    }
 


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
      // document.getElementById("output").innerHTML = "Doge$" + (dgeOutput.toString().match(/^\d+(?:\.\d{0,2})?/)) * 0.000207;

      // these if else sets the min and max size tokens for d3
      if( response.amount <= 4 ) {
        response.amount = 4 ;
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
    
    if ( dogeBtn == true ) {
      writeToScreen2(response.amount); // this function fires when an onmessage is received
    }

  };

  function writeToScreen2(message) {
    barChart.addToken( {
      id:'myId',
      size: message,
      category:0,
      texture: {
        src: 'assets/dogecoin2.png'
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