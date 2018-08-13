require_relative 'game_manager'

def play
  playing = true
  puts "Heyo, it's Tic-Tac-Toe time!"
  first = nil
  until first != nil
    print "Who is going first, X or O? "
    input = gets.chomp.downcase
    first = input.to_sym if input == 'x' || input == 'o'
  end
  while playing
    manager = GameManager.new(first: first)
    manager.display_game_board
    until manager.game_completed?
      move = nil
      until manager.player_move(move ? move - 1 : nil)
        move = nil
        until move != nil
          puts "#{manager.current_player}, please enter a number from 1-9"
          input = gets.chomp
          move = input.to_i if /[0-9]/.match input
        end
      end
    end
    puts "Congratulations, #{manager.previous_player} won!"
    print "Play again? (y/n) "
    input = gets.chomp.downcase[0]
    playing = input == 'y' ? true : false
    first = manager.current_player
    puts "Alright, let's go again. Loser, #{manager.current_player} goes first..." if playing
  end
end

play