class Api::TagsController < ApplicationController

  def create
    input_hash = {user_id: current_user.id}
    creation_hash = book_params.merge(input_hash)
    @tag = Tag.new(creation_hash)
    if @tag.save
      current_user.update({current_book: @tag.id})
      render json: @tag
    else
      flash.now[:errors] = @tag.errors.full_messages
      render json: @tag.errors, status: 422
    end

  end
  def update
    @tag = Tag.find_by_id(params[:id])
    if @tag.update(book_params)

      self.index
    else
      render json: nil
    end
  end

  def destroy
    @tag=Tag.find_by_id(params[:id]);
    @tag.destroy
    self.index
  end

  def show
    @tag = Tag.find_by_id(params[:id])
    render json: @tag
  end

  def index
    render json: Tag.sort_user_books(current_user.id)
  end

  private
  def book_params
    params.permit(:article_id, :tag)
  end
end
