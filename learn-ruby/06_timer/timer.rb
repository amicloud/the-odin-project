class Timer
  attr_accessor :seconds
  def initialize
    @seconds = 0
  end

  def time_string
    display_seconds = @seconds % 60
    display_minutes = (@seconds / 60) % 60
    display_hours = (@seconds / (60**2)) % 12
    "#{padded display_hours }:#{padded display_minutes}:#{padded display_seconds}"
  end

  def padded(n)
    if n.to_s.length == 2
      return n.to_s
    end
    if n.to_s.length == 1
      '0' + n.to_s
    end
  end
end
