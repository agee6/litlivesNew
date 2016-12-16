class AddBookIdToReview < ActiveRecord::Migration
  def change
    add_reference :reviews, :book, foreign_key: true
  end
end
