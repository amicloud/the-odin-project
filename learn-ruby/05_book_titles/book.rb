class Book
  attr_reader :title
  def title=(title)
    @title = titleize title
  end
  def initialize(title = 'none')
    @title = titleize title
  end
end

def titleize(string)
  string[0] = string[0].capitalize
  articles = %w(a an the)
  prepositions = %w(aboard about above across after against along amid among anti around as at before behind below beneath beside besides between beyond but by concerning considering despite down during except excepting excluding following for from in inside into like minus near of off on onto opposite outside over past per plus regarding round save since than through to toward towards under underneath unlike until up upon versus via with within without)
  conjunctions = %w(for and nor but or yes so)
  all = articles + prepositions + conjunctions
  string = string.split(" ").collect {|x|
    if all.include? x
      x
    else
      x.capitalize
    end

  }
  string.join ' '
end