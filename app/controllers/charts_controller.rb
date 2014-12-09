class ChartsController < ApplicationController

  def index

    require 'httparty'

    @response = HTTParty.get("http://api.bitcoincharts.com/v1/markets.json")
    @parsed_response = JSON.parse(@response.body)
  #  raise @parsed_response.inspect
  
  end

end

