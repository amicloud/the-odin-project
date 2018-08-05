require_relative "bubble_sort"

describe "Bubble Sort" do
  it 'should sort integer array' do
    expect(bubble_sort [4,3,78,2,0,2]).to match_array [0,2,2,3,4,78]
  end

  it 'should sort string array' do
    expect(bubble_sort %w(b c d a e g f a)).to match_array %w(a a b c d e f g)
    expect(bubble_sort %w(bb ab ba ccc ac)).to match_array %w(ab ac ba bb ccc)
  end
end

describe "Bubble Sort By" do
  it 'should sort using block as comparison' do
    expect(bubble_sort_by(["hi","hello","hey"]) {|left, right| left.length - right.length}).to match_array ["hi", "hey", "hello"]
  end

  it 'should do standard bubble sort if block is not provided' do
    expect(bubble_sort_by %w(a c b)).to match_array %w(a b c)
  end
end

describe "Sorted?" do
  it 'should return true if array is empty' do
    expect(sorted? []).to be_truthy
  end

  it 'should return true if array contains one element' do
    expect(sorted? [1]).to be_truthy
    expect(sorted? [0]).to be_truthy
    expect(sorted? ["a"]).to be_truthy
  end

  it 'should return true if integer array is sorted' do
    expect(sorted? [0,1]).to be_truthy
    expect(sorted? [0,1,2,3,4,5]).to be_truthy
    expect(sorted? [2,5,10,44,23113,2312313]).to be_truthy
  end

  it 'should return false if integer array is not sorted' do
    expect(sorted? [0,1,2,3,5,4]).to be_falsey
    expect(sorted? [1,0,2,3,4,5,6,7,8,9]).to be_falsey
    expect(sorted? [1,2,3,4,5,6,7,9,8]).to be_falsey
    expect(sorted? [1,0]).to be_falsey
  end

  it 'should return true if string array is sorted' do
    expect(sorted? %w(a b c d e f g h)).to be_truthy
    expect(sorted? %w(aa ab ac ba be cd gh zz)).to be_truthy
    expect(sorted? %w(a aa aaa b bb bbb bbc bcd c de dg)).to be_truthy
  end

  it 'should return false is string array not sorted' do
    expect(sorted? %w(b a)).to be_falsey
    expect(sorted? %w(c d a b r w q g s a a f)).to be_falsey
    expect(sorted? %w(aaa hhh bb c d e hhh)).to be_falsey
  end
end