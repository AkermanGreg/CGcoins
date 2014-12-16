class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  # before_filter :authorize
  #reason there are two @@ is because it is a class variable
  @@testVar = 50
private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id] 
  end
  helper_method :current_user

  # def authorize
  #   redirect_to login_url, alert: "Not authorized" if current_user.nil?
  # end
end