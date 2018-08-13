class GameBoard
  def initialize(game_state)
    @board = create_board game_state
  end

  def create_board(game_state)
    "     |     |     \n  #{game_state[0]}  |  #{game_state[1]}  |  #{game_state[2]}  \n_____|_____|_____\n     |     |     \n  #{game_state[3]}  |  #{game_state[4]}  |  #{game_state[5]}  \n_____|_____|_____\n     |     |     \n  #{game_state[6]}  |  #{game_state[7]}  |  #{game_state[8]}  \n     |     |     "
  end

  def display
    print @board
    puts ""
  end

  def update(game_state)
    @board = create_board game_state
    display
  end
end