class StaticPagesController < ApplicationController

  def root
    render :root
  end
  def popup
    render :popup
  end
  def home
    render :home
  end
end
