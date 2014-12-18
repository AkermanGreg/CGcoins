var btcBtn = true;  // for the button to turn on/off btc tokens
var dogeBtn = true; // for button to turn on/off dogecoin tokens

var btcPrintAmt = true; // for the message that prints the amount of bitcoins traded
var btcPrintDollar = true; // for the message that prints the dollar value of bitcoins traded

var btcOutput; // the btc transaction amount
var ltcOutput; // the litecoin transaction amount
var dgeOutput; // the dogecoin transaction amount
var TYPE_BLOCK = "block"; // var for when a block is created
var total = []; // array for adding the total USD ammount 


function init() { // fires when page is loaded
  document.getElementsByClassName("btn btn-default")[0].disabled = true;
  document.getElementsByClassName("btn btn-default")[1].disabled = true;
  initWebSocket(); // fires websocket function to load the websocket
}

function initWebSocket() {//  init blockchain websocket (activity, blocks)
  
 ///////////////////// BITCOIN STARTS///////////////////////
  var blockchain = new WebSocket('wss://ws.blockchain.info/inv'); //blockchain.info's web socket address
  blockchain.onerror = function (error){ console.log('connection.onerror',error); }; // logs if an ".onerror" is a response
  blockchain.onopen = function () { // fires this function when ".onopen" response is received from blockchain's websocket
    console.log ("btc CONNECTED");
    document.getElementsByClassName("btn btn-default")[0].style.background = "#E6E6E6";
    document.getElementsByClassName("btn btn-default")[0].innerHTML = "Bitcoin OFF";


    blockchain.send( JSON.stringify( {"op":"unconfirmed_sub"} ) );  //  subscribes to uncofirmed activity
    blockchain.send( JSON.stringify( {"op":"blocks_sub"} ) );   //  subscribes to new blocks
    document.getElementsByClassName("btn btn-default")[0].style.background = "#fce271";
    document.getElementsByClassName("btn btn-default")[0].innerHTML = "Bitcoin ON";
    document.getElementsByClassName("btn btn-default")[0].disabled = false;
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
        document.getElementById("grandtotal").innerHTML = "Total $" + (grandTotal * priceUSD).formatMoney(2, '.', ',') ;

        // these if else sets the min size tokens for d3
        if( response.amount <= 4 ) {
          response.amount = 4 ;
        }
    }

    // if a block is created
    else if( response.op == "block" ) {
      console.log("BLOCK FOUND BLOCK FOUND BLOCK FOUND BLOCK FOUND");
      response.amount = Math.round( response.x.height / 10000 );
    }
    
    if ( btcBtn == true ) {
      btcTokenBubble(response.amount); // this function fires when an onmessage is received
    }

  };
  // fires a function to drop a d3 token (message is the btc transaction size from response.amount)

  function btcTokenBubble(message) {
    heatchart.addToken( {
      callback:{
        // mouseover:function(token){
        //   document.getElementsByClassName
        //   console.log(message);
        // },
        onclick:function(token){
          var pre = document.createElement("div");
          var tokenCallback = document.getElementById("btc-callback");
          pre.innerHTML = "$ " + (message * priceUSD).formatMoney(2, '.', ',');
          console.log(tokenCallback);
          tokenCallback.replaceChild(pre, tokenCallback.childNodes[0]);

        },
      },
      size: message,
      category:0,
      texture: {
        src: 'assets/bitcoin.jpeg'
      },
    });

     if (btcPrintAmt == true) {
      var output = document.getElementById("output"); // outputs unconfirmed btc transactions
      var pre = document.createElement("p");
      var theFirstChild = output.firstChild;

      pre.style.wordWrap = "break-word";
      pre.innerHTML = btcOutput + " BTC";
      output.insertBefore(pre, theFirstChild);
    }

    if (btcPrintDollar == true) { // If the dollar transaction display is turned on
      var changeFormat = btcOutput * priceUSD; // multiply the current market price * the unconfirmed bitcoins
      var dollarOut = document.getElementById("dollar");
      var theFirstChild = dollarOut.firstChild;
      var pre2 = document.createElement("p"); // create a new <p> tag

      pre2.style.wordWrap = "break-word"; // syle of the new <p> tag will be wordwrapped
      pre2.innerHTML = "$ " + (changeFormat).formatMoney(2, '.', ','); // formats the btc * usd
      dollarOut.insertBefore(pre2, theFirstChild); // sends the new <p> tag with dollar amount to the var dollarOut
    }
  }/////// end of BITCOIN ////////
  
  ///////////////////////////////// DOGECOIN STARTS////////////////////////////////////////
  var dogecoin = new WebSocket('wss://ws.dogechain.info/inv');
  dogecoin.onerror = function (error){
    document.getElementsByClassName("btn btn-default")[1].style.background = "#E6E6E6";
    document.getElementsByClassName("btn btn-default")[1].innerHTML = "DogeCoin OFF";

    console.log('connection.onerror',error);
  };

  dogecoin.onopen = function () {
    document.getElementsByClassName("btn btn-default")[1].style.background = "#B7E224";
    document.getElementsByClassName("btn btn-default")[1].innerHTML = "DogeCoin ON";
    document.getElementsByClassName("btn btn-default")[1].disabled = false;

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
      dgeTokenBubble(dgeOutput); // this function fires when an onmessage is received
    }

  };

  function dgeTokenBubble(message) {
    heatchart.addToken( {
      callback:{
        // mouseover:function(token){
        //   document.getElementsByClassName
        //   console.log(message);
        // },
        onclick:function(token){
          var pre = document.createElement("div");
          var tokenCallback = document.getElementById("doge-callback");
          pre.innerHTML = "$ " + (message * priceUSD).formatMoney(2, '.', ',');
          console.log(tokenCallback);
          tokenCallback.replaceChild(pre, tokenCallback.childNodes[0]);
        },
      },
      // id:'myId',
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


//This function toggles the Bitcoin coin drop
function toggleBitcoin() {

  if (btcBtn == false){
    btcBtn = true;
    document.getElementsByClassName("btn btn-default")[0].style.background = "#fce271";
    document.getElementsByClassName("btn btn-default")[0].innerHTML = "Bitcoin ON";

    console.log("BTC Tokens ON");
  }
  else {
    btcBtn = false;
    document.getElementsByClassName("btn btn-default")[0].style.background = "#E6E6E6";
    document.getElementsByClassName("btn btn-default")[0].innerHTML = "Bitcoin OFF";

    console.log("BTC Tokens OFF");
  }
}

//This function toggles the Dogecoin coin drop
function toggleDogecoin() {

  if (dogeBtn == false){
    dogeBtn = true;
    document.getElementsByClassName("btn btn-default")[1].style.background = "#B7E224";
    document.getElementsByClassName("btn btn-default")[1].innerHTML = "DogeCoin ON";
    console.log("Doge Tokens ON");
  }
  else {
    dogeBtn = false;
    document.getElementsByClassName("btn btn-default")[1].style.background = "#E6E6E6";
    document.getElementsByClassName("btn btn-default")[1].innerHTML = "DogeCoin OFF";
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

Number.prototype.formatMoney = function(c, d, t){ // FORMATS THE CURRENCY WITH COMMAS AND DECIMAL PLACE
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 }; // sample (123456789.12345).formatMoney(2, '.', ',')

// fires init function when the window is loaded
window.addEventListener("load", init, false);