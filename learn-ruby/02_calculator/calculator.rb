def add(x,y)
  x+y
end

def subtract(x,y)
  x-y
end

def sum(arr)
  unless arr.empty?
    return arr.reduce(:+)
  end
  0
end

def multiply(*args)
  if args.size == 1
    return args[0].reduce(:*)
  end
  args.reduce(:*)
end

def power(x, y)
  x**y
end

def factorial(n)
  return 1 if n == 0
  multiply 1..n
end