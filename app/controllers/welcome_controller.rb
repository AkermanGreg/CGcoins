class WelcomeController < ApplicationController

  def index

    require 'httparty'

    @response = HTTParty.get("https://blockchain.info/stats?format=json")
    @parsed_response = JSON.parse(@response.body)
  
  end  

  def bubble

    require 'httparty'

    @response = HTTParty.get("https://blockchain.info/stats?format=json")
    @parsed_response = JSON.parse(@response.body)
  
  end

end