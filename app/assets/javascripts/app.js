var btcBtn = true;  // for the button to turn on/off btc tokens
var dogeBtn = true; // for button to turn on/off dogecoin tokens

var btcPrintAmt = true; // for the message that prints the amount of bitcoins traded
var btcPrintDollar = false; // for the message that prints the dollar value of bitcoins traded

var btcOutput; // the btc transaction amount
var ltcOutput; // the litecoin transaction amount
var dgeOutput; // the dogecoin transaction amount
var dollarOut; // var for displaying USD amount to screen
var output;    // var for displaying btc transactions to screen
var TYPE_BLOCK = "block"; // var for when a block is created
var total = []; // array for adding the total USD ammount 

//This function toggles the Bitcoin coin drop
function toggleBitcoin() {
  
  if (btcBtn == false){
    btcBtn = true;
    console.log("BTC Tokens ON");
  }
  else {
    btcBtn = false;
    console.log("BTC Tokens OFF");
  }
}

//This function toggles the Dogecoin coin drop
function toggleDogecoin() {
  if (dogeBtn == false){
    dogeBtn = true;
    console.log("Doge Tokens ON");
  }
  else {
    dogeBtn = false;
    console.log("Doge Tokens OFF");
  }
}

//This function toggles the Bitcoin Print Amount display
function toggleBtcPrintAmt() {
  if (btcPrintAmt == false){
    btcPrintAmt = true;
    console.log("Print BTC");
  }
  else {
    btcPrintAmt = false;
    console.log("Stop Print BTC");
  }
}

//This function toggles the Bitcoin Print Dollar amount display
function toggleBtcPrintDollar() {
  if (btcPrintDollar == false){
    btcPrintDollar = true;
    console.log("Print Dollars BTC");
  }
  else {
    btcPrintDollar = false;
    console.log("Stop Print Dollars BTC");
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

        // PRINTS THE INITAL OUTPUT TO THE HTML        converts to string and back to integer 
        // document.getElementById("output").innerHTML = "$" + (response.amount.toString().match(/^\d+(?:\.\d{0,2})?/)) * ;
        document.getElementById("grandtotal").innerHTML = "Total $" + grandTotal * priceUSD;

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
      // id:'myId',
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
    }

    if (btcPrintDollar == true) {
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

function numberToCurrency(number, options) {
    // set defaults...
    if (typeof options == 'undefined') { options = {}; }
    var precision = options.precision || 2
    var unit      = options.unit      || '$'
    var separator = options.separator || '.'
    var delimiter = options.delimiter || ','
    var format    = options.format    || '%u%n'
    var negativeFormat = options.negativeFormat || '-%u%n'

    // "clean up" number
    if (typeof number == 'string') { number = number.replace(/\$/g, ''); } // strip dollar sign
    number = isNaN(number) || number == '' || number == null ? 0.0 : number; // set to 0.0 if we can't tell what it is

    // determine which format to use
    if (number < 0) { 
        format = negativeFormat;
        number = Math.abs(number); // "remove" the negative sign
    }

    // 'separate' the cents
    var numberStr = parseFloat(number).toFixed(precision).toString();
    var numberFormatted = new Array(numberStr.slice(-1*precision));   // this returns the cents
    numberFormatted.unshift(separator); // add the separator
    numberStr = numberStr.substring(0, numberStr.length-(precision+1)); // this removes the decimal and cents

    // 'delimit' the thousands
    while (numberStr.length > 3) {
        numberFormatted.unshift(numberStr.slice(-3)); // this prepends the last three digits to `numberFormatted`
        numberFormatted.unshift(delimiter); // this prepends the delimiter to `numberFormatted`
        numberStr = numberStr.substring(0, numberStr.length-3);  // this removes the last three digits
    }
    numberFormatted.unshift(numberStr); // there are less than three digits in numberStr, so prepend them

    return format.replace(/%u/g,unit).replace(/%n/g,numberFormatted.join('')); // put it all together
}
