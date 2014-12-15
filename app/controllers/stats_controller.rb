class StatsController < ApplicationController
require 'httparty'
  def index
    searcharg = params[:addressSearch]
    if searcharg  && searcharg != ""
      myURL = "https://blockchain.info/address/" + searcharg 
      myURL = myURL + "format=json"
      response = HTTParty.get(myURL)
      @rbody = JSON.parse(response.body)

      @inputs = @rbody["txs"][0]["inputs"]
      @show_data = true
    else 
      @show_data = false
    end

  end


end