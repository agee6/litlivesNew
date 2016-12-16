class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|

      t.string :title, null: false
      t.string :author
      t.integer :year
      t.integer :pages
      t.string :publisher
      t.string :isbn10
      t.string :isbn13
      t.integer :chapters
      t.string :image
      t.string :genre
      t.string :language

      t.timestamps null: false
    end
  end
end
