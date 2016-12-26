class Api::ArticlesController < ApplicationController
  def create
    input_hash = {user_id: current_user.id}
    creation_hash = book_params.merge(input_hash)
    @article = Article.new(creation_hash)
    if @article.save
      current_user.update({current_book: @article.id})
      render json: @article
    else
      flash.now[:errors] = @article.errors.full_messages
      render json: @article.errors, status: 422
    end

  end
  def update
    @article = Article.find_by_id(params[:id])
    if @article.update(book_params)

      self.index
    else
      render json: nil
    end
  end

  def destroy
    @article=Article.find_by_id(params[:id]);
    @article.destroy
    self.index
  end

  def show
    @article = Article.find_by_id(params[:id])
    render json: @article
  end

  def index
    render json: Article.sort_user_books(current_user.id)
  end

  private
  def article_params
    params.permit(:title, :user_id, :body, :rich, :type, :book_id, :isbn, :id)
  end
end
