class Api::DescriptionsController < ApplicationController
  def create
    input_hash = {user_id: current_user.id}
    creation_hash = description_params.merge(input_hash)
    @description = Description.new(creation_hash)
    if @description.save
      render json: @description
    else
      flash.now[:errors] = @description.errors.full_messages
      render json: @description.errors, status: 422
    end

  end
  def update
    @description = Description.find_by_id(params[:id])
    if @description.update(description_params)

      self.index
    else
      render json: nil
    end
  end

  def destroy
    @description=Description.find_by_id(params[:id]);
    @description.destroy
    self.index
  end

  def show
    @description = Description.find_by_id(params[:id])
    render json: @description
  end

  def index
    render json: Description.sort_user_books(current_user.id)
  end

  private
  def description_params
    params.permit(:body, :rich, :book_id :user_id, :id)
  end
end
