class Article < ApplicationRecord
  has_many :comments
  has_many :taggings
  has_many :tags, through: :taggings
  has_attached_file :image, styles: {medium: "300x300>", thumb: "100x100>"}
  validates_attachment_content_type :image, :content_type => %w(image/jpg image/jpeg image/png)

  def tag_list
    tags.join ", "
  end

  def tag_list=(tags_strings)
    self.tags = tags_strings.split(",").collect {|s| s.downcase.strip}.uniq.collect {|s| Tag.find_or_create_by(name: s)}
  end
end
