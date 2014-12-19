class ExchangeController < ApplicationController

  def index


  

     @response = HTTParty.get("https://www.okcoin.com/api/v1/trades.do")
     #@response = HTTParty.get("https://cex.io/api/trade_history/GHS/BTC")
     @parsed_response = JSON.parse(@response.body)
     #@limited_response = @parsed_response
     #binding.pry
     #@parsed_response.inspect
    @response_chart = HTTParty.get("https://blockchain.info/stats?format=json")
    @parsed_response_chart = JSON.parse(@response_chart.body)
  end
end