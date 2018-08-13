require 'rspec'
require_relative 'game_board'

describe 'Prints Game Board' do
  game_board = GameBoard.new [" ", " ", " ", " ", " ", " ", " ", " ", " "]
  it 'should print standard tic-tac-toe 3x3 board' do
    expect {game_board.display}.to output("     |     |     \n     |     |     \n_____|_____|_____\n     |     |     \n     |     |     \n_____|_____|_____\n     |     |     \n     |     |     \n     |     |     \n").to_stdout
  end
end

describe ''