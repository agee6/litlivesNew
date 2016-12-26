class Api::CopiesController < ApplicationController

  def create
    @copy = Copy.new(book_params)
    if @copy.save
      current_user.update({current_copy: @copy.id})
      render json: @copy
    else
      flash.now[:errors] = @copy.errors.full_messages
      render json: @copy.errors, status: 422
    end

  end
  def update
    @copy = Copy.find_by_id(params[:id])
    if @copy.update(book_params)
      self.index
    else
      render json: nil
    end
  end

  def destroy
    @copy = Copy.find_by_id(params[:id]);
    @copy.destroy
    self.index
  end

  def show
    @copy = Copy.find_by_id(params[:id])
    render json: @copy
  end

  def index
    render json: Copy.sort_user_books(current_user.id)
  end

  private
  def book_params
    params.permit(:bookshelf_id, :book_id, :id)
  end
end
