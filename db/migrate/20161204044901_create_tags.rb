class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :article_id, null: false, index: true
      t.string :tag

      t.timestamps null: false
    end
  end
end
