# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161216001944) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.string   "title",      null: false
    t.integer  "user_id",    null: false
    t.text     "body"
    t.string   "rich"
    t.string   "type"
    t.integer  "book_id"
    t.string   "isbn"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "articles", ["user_id"], name: "index_articles_on_user_id", using: :btree

  create_table "books", force: :cascade do |t|
    t.string   "title",      null: false
    t.string   "author"
    t.integer  "year"
    t.integer  "pages"
    t.string   "publisher"
    t.string   "isbn10"
    t.string   "isbn13"
    t.integer  "chapters"
    t.string   "image"
    t.string   "genre"
    t.string   "language"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bookshelves", force: :cascade do |t|
    t.string   "title",      null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "copies", force: :cascade do |t|
    t.integer  "bookshelf_id", null: false
    t.integer  "book_id",      null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "copies", ["book_id"], name: "index_copies_on_book_id", using: :btree
  add_index "copies", ["bookshelf_id"], name: "index_copies_on_bookshelf_id", using: :btree

  create_table "descriptions", force: :cascade do |t|
    t.text     "body"
    t.string   "rich"
    t.integer  "book_id",    null: false
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "descriptions", ["book_id"], name: "index_descriptions_on_book_id", using: :btree

  create_table "notes", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.string   "title"
    t.integer  "copy_id",    null: false
    t.text     "body"
    t.string   "rich"
    t.integer  "page"
    t.integer  "chapter"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "notes", ["copy_id"], name: "index_notes_on_copy_id", using: :btree
  add_index "notes", ["user_id"], name: "index_notes_on_user_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.string   "title"
    t.text     "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.string   "title"
    t.integer  "user_id",     null: false
    t.integer  "value",       null: false
    t.text     "description"
    t.string   "rich"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "book_id"
  end

  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.integer  "article_id", null: false
    t.string   "tag"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "tags", ["article_id"], name: "index_tags_on_article_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["username"], name: "index_users_on_username", using: :btree

  add_foreign_key "reviews", "books"
end
