def problem_1 #- Done
  sum = 0
  1000.times do |i|
    if i % 3 == 0 or i % 5 == 0
      sum += i
    end
  end
  puts sum
end

def problem_2 #- Done
  sum = 0
  current_value = 1
  previous_value = 1
  while current_value < 4_000_000
    if current_value % 2 == 0
      sum += current_value
    end
    temp = current_value
    current_value = current_value + previous_value
    previous_value = temp
  end
  puts sum
end

def problem_3 #- Done
  n = 600851475143
  upper_bound = Math.sqrt(n).floor - 1
  (3..upper_bound).to_a.reverse.each {|i|
    if n % i == 0
      prime = true
      (2..(i-1)).to_a.reverse.each {|k|
        if i % k == 0
          prime = false
        end
      }
      if prime
        puts i
        return
      end
    end
  }
end

problem_3
