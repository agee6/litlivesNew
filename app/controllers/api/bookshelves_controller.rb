class Api::BookshelvesController < ApplicationController
  def create
    input_hash = {user_id: current_user.id}
    creation_hash = book_params.merge(input_hash)
    @bookshelf = Bookshelf.new(creation_hash)
    if @bookshelf.save
      current_user.update({current_book: @bookshelf.id})
      render json: @bookshelf
    else
      flash.now[:errors] = @bookshelf.errors.full_messages
      render json: @bookshelf.errors, status: 422
    end

  end
  def update
    @bookshelf = Bookshelf.find_by_id(params[:id])
    if @bookshelf.update(book_params)

      self.index
    else
      render json: nil
    end
  end

  def destroy
    @bookshelf=Bookshelf.find_by_id(params[:id]);
    @bookshelf.destroy
    self.index
  end

  def show
    @bookshelf = Bookshelf.find_by_id(params[:id])
    render json: @bookshelf
  end

  def index
    render json: Bookshelf.sort_user_books(current_user.id)
  end

  private
  def bookshelf_params
    params.permit(:title, :user_id, :title, :id)
  end
end
