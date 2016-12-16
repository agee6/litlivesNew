class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.integer :user_id, null: false, index: true
      t.string :title
      t.integer :copy_id, null: false, index: true
      t.text :body
      t.string :rich
      t.integer :page
      t.integer :chapter

      t.timestamps null: false
    end
  end
end
