class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :emai
      t.string :password_digest
      t.string :public_address

      t.timestamps
    end
  end
end
