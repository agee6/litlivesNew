class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.string :title
      t.integer :user_id, null: false, index: true
      t.integer :value, null: false
      t.text :description
      t.string :rich

      t.timestamps null: false
    end
  end
end
