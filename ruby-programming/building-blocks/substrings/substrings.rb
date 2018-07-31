def substrings(query, dictionary)
  results = {}
  query.downcase.split(" ").each do |word|
    dictionary.each do |dict|
      if word.include? dict
        if results.has_key? dict
          results[dict] += 1
        else
          results[dict] = 1
        end
      end
    end
  end
  puts results
  results
end