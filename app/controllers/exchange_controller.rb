class ExchangeController < ApplicationController

  def index

    require 'blockchain'
    @ticker_out = Array.new
    ticker = Blockchain::get_ticker()
    #print the 15 min price for every currency
    ticker.keys.each do |key|
       oneline = (ticker[key].p15min)
       @ticker_out = oneline

    #@stats = Blockchain::get_statistics()
  end

     @response = HTTParty.get("https://www.okcoin.com/api/v1/trades.do")
     #@response = HTTParty.get("https://cex.io/api/trade_history/GHS/BTC")
     @parsed_response = JSON.parse(@response.body)
     #@limited_response = @parsed_response
     #binding.pry
     #@parsed_response.inspect
    @response_chart = HTTParty.get("http://api.bitcoincharts.com/v1/markets.json")
    @parsed_response_chart = JSON.parse(@response_chart.body)
  end
end