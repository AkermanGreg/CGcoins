function init(){output=document.getElementById("output"),initWebSocket()}function initWebSocket(){function t(t){barChart.addToken({id:"myId",size:t,category:0,texture:{src:"//encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc-tI1b7luXJgfHdwbTwCmSpciFwSrVG_cqMlOeF-0CEzrS6NAxw"}})}var o=new WebSocket("wss://ws.blockchain.info/inv"),n=new WebSocket("wss://ws.dogechain.info/inv");n.onopen=function(){n.send(JSON.stringify({op:"unconfirmed_sub"})),n.send(JSON.stringify({op:"blocks_sub"}))},o.onopen=function(){o.send(JSON.stringify({op:"unconfirmed_sub"})),o.send(JSON.stringify({op:"blocks_sub"}))},o.onmessage=function(o){var n=JSON.parse(o.data);if("utx"==n.op){for(var e=0,u=0;u<n.x.out.length;u++)e+=n.x.out[u].value;n.amount=e/1e8,btcOutput=n.amount,n.amount<=5?n.amount=5:n.amount>=140&&(n.amount=140)}else"block"==n.op&&(console.log("BLOCK FOUND BLOCK FOUND BLOCK FOUND BLOCK FOUND"),n.amount=Math.round(n.x.height/1e4));t(n.amount)},n.onmessage=function(t){var o=JSON.parse(t.data);if(console.log(t),"utx"==o.op){for(var n=0,e=0;e<o.x.out.length;e++)n+=o.x.out[e].value;o.amount=n/1,ltcOutput=o.amount,console.log(ltcOutput),o.amount<=5?o.amount=5:o.amount>=140&&(o.amount=140)}else"block"==o.op&&(console.log("BLOCK FOUND BLOCK FOUND BLOCK FOUND BLOCK FOUND"),o.amount=Math.round(o.x.height/1e4));writeToScreen2(o.amount)}}function writeToScreen(t){barChart.addToken({id:"myId",size:t,category:0,texture:{src:"//cdni.wired.co.uk/1920x1280/k_n/litecoin.jpg"}})}var wsUri="wss://ws.blockchain.info/inv",btcOutput,ltcOutput,TYPE_BLOCK="block";window.addEventListener("load",init,!1);