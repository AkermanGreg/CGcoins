class User < ActiveRecord::Base

  include ActiveModel::SecurePassword
  has_secure_password

  before_save { |user| user.email = user.email.downcase }

  validates :username, presence: true, length: { maximum: 30 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :email, presence: true, format: {with: VALID_EMAIL_REGEX},
            uniqueness: { case_sensitive: false }

  validates :password, presence: true, length: { minimum: 5 }
  validates :password_confirmation, presence: true

end