class Article < ActiveRecord::Base
  validates :user_id, presence: true

  belongs_to :user
  has_many :tags
  belongs_to :book

end
