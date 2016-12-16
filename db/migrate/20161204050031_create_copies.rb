class CreateCopies < ActiveRecord::Migration
  def change
    create_table :copies do |t|
      t.integer :bookshelf_id, null: false, index: true
      t.integer :book_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
