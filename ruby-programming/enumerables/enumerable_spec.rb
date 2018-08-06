require_relative 'enumerable'

describe 'my_each' do
  it 'should produce same results as #each' do
    my_result = ''
    [1, 2, 3, 4, 5].my_each {|x| my_result += x.to_s}
    expect(my_result).to match '12345'
  end
end

describe 'my_each_with_index' do
  it 'should produce same results as #each_with_index' do
    my_result = ''
    [1, 2, 3, 4, 5].my_each_with_index {|element, index| my_result += element.to_s + index.to_s}
    expect(my_result).to match '1021324354'
  end
end

describe 'my_select' do
  it 'should produce same results as #select' do
    expect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].my_select {|x| x % 2 != 0}).to match_array [1, 3, 5, 7, 9]
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
    expect([1, 2].my_count).to eq 2
    expect([1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2].my_count).to eq 12
  end
end

describe 'my_map' do
  it 'should produce same results as #map with block' do
    expect([1, 2, 3, 4, 5].my_map {|x| x + 2}).to match_array [3, 4, 5, 6, 7]
  end
  it 'should accept a proc' do
    proc = Proc.new {|x| x + 2}
    expect([1, 2, 3, 4, 5].my_map proc).to match_array [3, 4, 5, 6, 7]
  end

  it 'should only accept proc if both block and proc are given' do
    proc = Proc.new {|x| x + 2}
    expect([1, 2, 3, 4, 5].my_map(proc) {|x| x + 5}).to match_array [3, 4, 5, 6, 7]
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