class Copy < ActiveRecord::Base
  validates :bookshelf_id, prescence: true
  validates :book_id, presence: true

  has_many :notes
  belongs_to :bookshelf
  belongs_to :book


end
