def stock_picker(days)
  max = day1 = day2 = 0
  days.each_with_index do |dayi, i|
    days[i..days.length].each_with_index do |dayj, j| # Day[J] reppin'
      t = dayj - dayi
      if t > max
        max = t
        day1 = i
        day2 = j + i
      end
    end
  end
  [day1, day2]
end