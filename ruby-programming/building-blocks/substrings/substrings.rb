def substrings(a, m, y = Hash.new(0))
  a.downcase.split(" ").each {|w| m.each {|e| y[e] += 1 if w.include? e}}
  p y
end

# So, I got this down to 2 lines. Only 1 if you don't count the return. Is using default parameters
# as a place to stash variables cheating? Saved a line by putting the hash up there. :shrug: idk
# If you want to see something more sensible, look at a previous commit.