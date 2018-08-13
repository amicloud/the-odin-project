module Helpers
  def self.create_dictionary(board_width = 3)
    b = board_width
    dictionary = []
    # diagonals
    diag1 = []
    diag2 = []
    (0..2).each do |i|
      diag1 << (b + 1) * i
      diag2 << (b * (i + 1)) - (i + 1)
    end
    dictionary << diag1
    dictionary << diag2
    # up downs and side to side
    (0...b).each do |i|
      ud = []
      ss = []
      (0...b).each do |j|
        ud << (b * j) + i
        ss << (b * i) + j
      end
      dictionary << ud
      dictionary << ss
    end
    dictionary
  end
end