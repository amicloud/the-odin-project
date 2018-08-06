require_relative 'enumerable'

describe 'my_each' do
  input = [1, 2, 3, 4, 5]
  it 'should produce same results as #each' do
    my_result = ''
    correct_result = ''
    input.each {|x| correct_result << x.to_s}
    input.my_each {|x| my_result << x.to_s}
    expect(my_result).to eq correct_result
  end
end

describe 'my_each_with_index' do
  it 'should produce same results as #each_with_index' do
    input = [1, 2, 3, 4, 5]
    my_result =''
    correct_result = ''
    input.each_with_index { |element, index| correct_result += element.to_s + index.to_s}
    input.my_each_with_index {|element, index| my_result += element.to_s + index.to_s}
    expect(my_result).to eq correct_result
  end
end

describe 'my_select' do
  it 'should produce same results as #select' do
    input = (1..10)
    odds = Proc.new {|x| x % 2 != 0}
    expect(input.my_select &odds).to match_array input.select &odds
  end
end

describe 'my_all?' do
  it 'returns true of none of the collection members are true' do
    expect([5, 6, 7, 8].my_all? {|x| x > 4}).to be_truthy
  end
  it 'returns false if any of the collection members are false' do
    expect([5, 6, 2, 8].my_all? {|x| x > 4}).to be_falsey
  end
  it 'returns false if any of the collection members are nil' do
    expect([5, 6, 2, nil].my_all? {|x| x > 4}).to be_falsey
  end
end

describe 'my_any?' do
  it 'should return true if any elements are truthy' do
    expect([1, 2, 3, 4].my_any? {|x| x > 3}).to be_truthy
  end

  it 'should return false if all elements are falsey' do
    expect([1, 2, 3, 4].my_any? {|x| x > 5}).to be_falsey
  end
end

describe 'my_none?' do
  it 'returns true if all of the elements are false' do
    expect([1, 2, 3, 4, 5].my_none? {|x| x > 6}).to be_truthy
  end

  it 'returns false if any of the elements are true' do
    expect([1, 2, 3, 4, 5].my_none? {|x| x > 4}).to be_falsey
  end
end

describe 'my_count' do
  it 'should produce same results as #count' do
    expect([1, 2, 3, 4, 5].my_count).to eq 5
    expect([].my_count).to eq 0
    expect([1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2].my_count).to eq 12
  end
end

describe 'my_map' do
  input = (1..10)
  add_2 = Proc.new {|x| x + 2}
  correct_map = input.map &add_2
  it 'should produce same results as #map with block' do
    expect(input.my_map &add_2).to match_array correct_map
  end
  it 'should accept a proc' do
    expect(input.my_map add_2).to match_array correct_map
  end

  it 'should only accept proc if both block and proc are given' do
    expect(input.my_map(add_2) {|x| x + 5}).to match_array correct_map
  end
end

describe 'my_inject' do
  sum = Proc.new {|value, accumulator| value + accumulator}
  input = [1, 2, 3, 4, 5]
  it 'should produce same results as #inject with no initial value' do
    injected = input.inject &sum
    expect(input.my_inject &sum).to eq injected
  end

  it 'should produce same results as #inject with initial value of 1' do
    injected = input.inject(1, &sum)
    expect(input.my_inject(1, &sum)).to eq injected
  end

  it 'should produce same results as #inject with initial value of 20' do
    injected = input.inject(20, &sum)
    expect(input.my_inject(20, &sum)).to eq injected
  end
end