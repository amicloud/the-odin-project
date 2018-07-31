require_relative 'stock_picker'

describe "Works correctly" do

  it 'should gets same answer as example' do
    expect(stock_picker [17,3,6,9,15,8,6,1,10]).to match_array [1,4]
  end

  it 'should get another correct answer ' do
    expect(stock_picker [3,5,12,2,55,12,114,81,43,66]).to match_array [3, 6]
  end
end