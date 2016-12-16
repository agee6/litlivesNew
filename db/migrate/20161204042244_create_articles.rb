class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.integer :user_id, null: false, index: true
      t.text :body
      t.string :rich
      t.string :type
      t.integer :book_id
      t.string :isbn


      t.timestamps null: false
    end
  end
end
