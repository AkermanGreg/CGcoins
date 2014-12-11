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

     @response = HTTParty.get("http://api.bitcoincharts.com/v1/markets.json")
    @parsed_response = JSON.parse(@response.body)
    #raise @parsed_response.inspect
end
end