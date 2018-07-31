require_relative 'caesar'

describe 'Works with positive offset' do
  it 'should match a result from online tool' do
    expect(caesar("Genius without education is like silver in the mine", 13)).to match("Travhf jvgubhg rqhpngvba vf yvxr fvyire va gur zvar")
  end
  it 'should match another result from online tool' do
    expect(caesar("The main thing though, is that Ruby is for people and being for people means clarity.", 24)).to match("Rfc kygl rfgle rfmsef, gq rfyr Pszw gq dmp ncmnjc ylb zcgle dmp ncmnjc kcylq ajypgrw.")
  end
end

describe 'Raises error with negative offset' do
  it 'raises error' do
    expect{caesar('Text', -1)}.to raise_exception ArgumentError
  end
end
