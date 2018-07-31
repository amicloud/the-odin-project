require_relative 'substrings'

describe "Works with single words" do
  dictionary = %w(below down go going horn how howdy it i low own part partner sit)
  it 'should match example output' do
      expect(substrings 'below', dictionary).to match({"below" => 1, "low" => 1 })
  end
end

describe "Works with multiple words" do
  dictionary = %w(below down go going horn how howdy it i low own part partner sit)
  it 'should match example output' do
    expect(substrings("Howdy partner, sit down! How's it going?", dictionary)).to match({ "down" => 1, "how" => 2, "howdy" => 1,"go" => 1, "going" => 1, "it" => 2, "i" => 3, "own" => 1,"part" => 1,"partner" => 1,"sit" => 1 })
  end
end