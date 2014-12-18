class StatsController < ApplicationController
  require 'httparty'
  def index
    @IOlabel = ""
    @response = HTTParty.get("https://blockchain.info/stats?format=json")
    @parsed_response = JSON.parse(@response.body)
    ## searcharg is the parameter being passed
    searcharg = params[:addressSearch]
    ## Display message when searcharge is either nil or empty
    if searcharg == nil || searcharg == ""
      @customError = "Enter a valid bitcoin address"
      @show_data = false
    else
      @show_data = true
      myURL = "https://blockchain.info/address/" + searcharg 
      myURL = myURL + "?format=json"
      response = HTTParty.get(myURL)
      @rbody = JSON.parse(response.body)
      #@inputs = @rbody["txs"][0]["inputs"]


      @trans = @rbody["txs"]

      @outs = @rbody["txs"][0]["out"]
      @inputsBottom = @rbody["txs"][1]["inputs"]
      @outsBottom = @rbody["txs"][1]["out"]
      @address = @rbody["address"]

    end
  rescue
    @customError = "Bitcoin address not found exist"
    @show_data = false
  ensure
    #Using @@ because testVar is a class variable
    @formVar = @@testVar + 10
  end
end