require 'json'

module ApplicationHelper
  consumer_key = OAuth::Consumer.new(
    'P1jtbPkVJpJ8zCbd68X9K5m2D',
    'zTChuEoA6Goa4IX8IINY0S0isrPybB9dGDB1qf9qPcxP63Zx0L')
  access_token = OAuth::Token.new(
    '408319659-jJ5m1R8nGRmOrGnQuFkG0gP8aeAsduF3UpcsOkCo',
    "0hPO0VddITTuvcQjP1kh8aUfJcm2NSKUQ2SaVakqBnF2E")

  baseurl = "https://api.twitter.com"
  path = "/1.1/statuses/user_timeline.json"
  query = URI.encode_www_form(
    "screen_name" => "seansmith1020",
    "count" => 10,
  )
  address = URI("#{baseurl}#{path}?#{query}")

  http = Net::HTTP.new address.host, address.port
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  request = Net::HTTP::Get.new address.request_uri
  request.oauth! http, consumer_key, access_token
  @response = http.request request

  def parse_user_response
    user = nil
    if @response.code == '200'
      tweets = JSON.parse(@response.body)
      print_timeline(tweets)
    else
      puts "GOt a #{@response.code} response - ERROR"
    end
    user
  end

  def print_timeline(tweets)
    tweets.each do |tweet|
      puts tweet
    end
  end
end


#   # Check for a successful request
#   if response.code == '200'
#     # Parse the response body, which is in JSON format.
#     # ADD CODE TO PARSE THE RESPONSE BODY HERE
#     user = JSON.parse(response.body)
#
#     # Pretty-print the user object to see what data is available.
#     puts "Hello, #{user["screen_name"]}!"
#   else
#     # There was an error issuing the request.
#     puts "Expected a response of 200 but got #{response.code} instead"
#   end
#
#   user
# end

# # All requests will be sent to this server.
# baseurl = "https://api.twitter.com"
#
# # Verify credentials returns the current user in the body of the response.
# address = URI("#{baseurl}/1.1/account/verify_credentials.json")

# # Set up HTTP.
# http             = Net::HTTP.new address.host, address.port
# http.use_ssl     = true
# http.verify_mode = OpenSSL::SSL::VERIFY_PEER

# If you entered your credentials in the previous
# exercise, no need to enter them again here. The
# ||= operator will only assign these values if
# they are not already set.
# consumer_key ||= OAuth::Consumer.new "ENTER IN EXERCISE 1", ""
# access_token ||= OAuth::Token.new "ENTER IN EXERCISE 1", ""

# Issue the request.
# request = Net::HTTP::Get.new address.request_uri
# request.oauth! http, consumer_key, access_token
# http.start
# response = http.request(request)
# user = parse_user_response(response)
