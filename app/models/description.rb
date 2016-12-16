class Description < ActiveRecord::Base
  validates :book_id, presence: true

  belongs_to :book
  belongs_to :user
  
end
