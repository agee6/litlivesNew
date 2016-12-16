class Book < ActiveRecord::Base
  validates :title, presence: true
  has_many :reviews
  has_many :descriptions

end
