def caesar(text, offset)
  raise ArgumentError unless offset >= 0
  text.gsub(/[A-Za-z]/) do |c|
    offset.times {c.next!}
    c[-1]
  end
end