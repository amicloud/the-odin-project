require 'rspec'
require_relative 'game_manager'

describe 'Creates new game board when initialized' do
  manager = GameManager.new
  it 'should create a new game board' do
    expect(manager.game_board).to be_truthy
  end
end

describe 'Adds moves to positions' do
  it 'should push move if position is not taken' do
    manager = GameManager.new
    manager.player_move 2
    expect(manager.game_state).to match_array [" ", " ", :x, " ", " ", " ", " ", " ", " "]
  end
  it 'should not push move if position is taken' do
    manager = GameManager.new
    manager.player_move 2
    manager.player_move 0
    manager.player_move 0
    expect(manager.game_state).to match_array [:o, " ", :x, " ", " ", " ", " ", " ", " "]
  end
end

describe 'Player changes every turn' do
  it 'X then O' do
    manager = GameManager.new
    manager.player_move 3
    manager.player_move 1
    manager.player_move 2
    manager.player_move 5
    expect(manager.game_state).to match_array [:o, :x, :x, " ", :o, " ", " ", " ", " "]
  end

  it 'O then X' do
    manager = GameManager.new(first: :o)
    manager.player_move 2
    manager.player_move 0
    manager.player_move 1
    manager.player_move 4
    expect(manager.game_state).to match_array [:x, :o, :o, " ", :x, " ", " ", " ", " "]
  end
end

describe 'Checks game state for a winner' do
  it 'should not declare a winner if there is not one' do
    manager = GameManager.new
    manager.player_move 3
    manager.player_move 2
    manager.player_move 1
    expect(manager.check_for_winner).to be_falsey
  end
  it 'should declare a winner if there is one simple case' do
    manager = GameManager.new
    manager.player_move 0
    manager.player_move 2
    manager.player_move 3
    manager.player_move 1
    manager.player_move 6
    manager.player_move 1
    expect(manager.check_for_winner).to be_truthy
  end

  it 'should declare a winner if there is one complicated case' do
    manager = GameManager.new
    manager.player_move 0
    manager.player_move 2
    manager.player_move 3
    manager.player_move 1
    manager.player_move 5
    manager.player_move 4
    manager.player_move 6
    expect(manager.check_for_winner).to be_truthy
  end
  it 'should declare a winner for diags' do
    manager = GameManager.new
    manager.player_move 0
    manager.player_move 1
    manager.player_move 2
    manager.player_move 3
    manager.player_move 4
    manager.player_move 5
    manager.player_move 6
    manager.player_move 7
    expect(manager.check_for_winner).to be_truthy
  end
  it 'should declare winner for draw' do
    manager = GameManager.new(game_state: [:x, :y, :x, :x, :y, :y, :y, :x, :x])
    expect(manager.check_for_winner).to be_truthy
    expect{ manager.check_for_winner }.to output("It's a draw!\n").to_stdout
  end
end