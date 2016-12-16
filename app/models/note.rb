class Note < ActiveRecord::Base
  validates :copy_id, presence: true
  validates :user_id, presence: true

  belongs_to :copy
  belongs_to :user
end
