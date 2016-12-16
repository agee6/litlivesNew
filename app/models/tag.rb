class Tag < ActiveRecord::Base
  validates :article_id, presence: true

  belongs_to :article
end
