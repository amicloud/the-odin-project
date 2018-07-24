def translate(string)
  string.gsub(/(\b([aeiou]+)[^aeiou ]+[A-Za-z]*)/i, '\1ay')
        .gsub(/\b([^aeiou ]?[q][u]|[^aeoui ]+)([A-Za-z][^. ]*)/i, '\2\1ay')
end
