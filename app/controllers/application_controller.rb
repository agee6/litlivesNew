class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user
  helper_method :logged_in?
  helper_method :current_book

  def current_user
    return nil if session[:session_token].nil?
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end
  def current_book
    if !logged_in?
      return false
    else
      if current_user.current_book == nil
        return false
      else
        return current_user.current_book
      end
    end
  end


  def login(user)
    user.reset_session_token
    session[:session_token] = user.session_token
  end

  def logout
    current_user.reset_session_token
    @current_user = nil
    session[:session_token] = nil
  end

  def require_login
    redirect_to new_session_url if current_user.nil?
  end
end
