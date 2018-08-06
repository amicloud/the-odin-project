# noinspection RubyForLoopInspection
module Enumerable
  def my_each
    for element in self do
      yield element
    end
  end

  def my_each_with_index
    index = 0
    for element in self do
      yield element, index
      index += 1
    end
  end

  def my_select
    selection = []
    for element in self do
      selection << element if yield element
    end
    selection
  end

  def my_all?
    for element in self do
      return false unless yield element if block_given?
      return false unless element unless block_given?
    end
    true
  end

  def my_any?
    for element in self do
      return true if yield element if block_given?
      return true if element unless block_given?
    end
    false
  end

  def my_none?
    for element in self do
      return false if yield element if block_given?
      return false if element unless block_given?
    end
  end

  def my_count
    count = 0
    for _ in self do
      count += 1
    end
    count
  end

  def my_map(proc = nil)
    mapped = []
    for element in self do
      mapped << (yield element) unless proc
      mapped << proc.call(element) if proc && !block_given?
      mapped << proc.call(element) if proc && block_given?
    end
    mapped
  end

  def my_inject(initial = nil)
    accumulator = initial ? (yield self[0], initial) : self[0]
    for element in self[1..self.length] do
      accumulator = yield element, accumulator
    end
    accumulator
  end
end