class Article < ApplicationRecord
  has_many :comments
  has_many :taggings
  has_many :tags, through: :taggings

  def tag_list
    tags.join ", "
  end

  def tag_list=(tags_strings)
    self.tags = tags_strings.split(",").collect {|s| s.downcase.strip}.uniq.collect {|s| Tag.find_or_create_by(name: s)}
  end
end
