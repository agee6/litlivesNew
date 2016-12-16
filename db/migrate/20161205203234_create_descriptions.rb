class CreateDescriptions < ActiveRecord::Migration
  def change
    create_table :descriptions do |t|
      t.text :body
      t.string :rich
      t.integer :book_id, null: false, index: true
      t.integer :user_id


      t.timestamps null: false
    end
  end
end
