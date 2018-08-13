class GameManager
  require_relative 'game_board'
  require_relative 'tic_tac_toe_helpers'
  attr_reader :game_board, :players, :game_state, :current_player, :previous_player
  @@dictionary = Helpers.create_dictionary(3)

  def initialize(x_name: "", o_name: "", first: :x, game_state: [" ", " ", " ", " ", " ", " ", " ", " ", " "])
    @game_state = game_state
    @game_board = GameBoard.new @game_state
    @players = {x: x_name, o: o_name}
    @current_player = first
  end

  def display_game_board
    @game_board.display
  end

  def check_for_winner
    x_state = []
    o_state = []
    @game_state.each_index do |i|
      x_state << i if @game_state[i] == :x
      o_state << i if @game_state[i] == :o
    end
    @@dictionary.each do |d|
      if (d - x_state).empty?
        declare_winner :x
        return true
      end
      if (d - o_state).empty?
        declare_winner :o
        return true
      end
    end
    unless @game_state.include? " "
      declare_winner :draw
      return true
    end
    false
  end

  def declare_winner(winner)
    if winner == :draw
      puts "It's a draw!"
    else
      puts "Winner is #{winner.to_s}"
    end
  end

  def game_completed?
    check_for_winner
  end

  # Returns true if move is valid, returns false if move is invalid
  def player_move(position)
    return false if position.nil?
    position = position.to_i
    if @game_state[position] == " "
      update_game_state @current_player, position
      @previous_player = @current_player
      @current_player = @current_player == :x ? :o : :x
      return true
    end
    false
  end

  # Updates the current game state with a move and then updates the game board with new game state
  def update_game_state(player, position)
    @game_state[position] = player.to_sym
    check_for_winner
    @game_board.update @game_state
  end
end