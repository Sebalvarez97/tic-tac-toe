$(document).ready(function () {

    const player_x_value = "X"
    const player_o_value = "O"

    var current_turn = player_x_value

    let board_full = false;
    let play_board = ["", "", "", "", "", "", "", "", ""]
    let history_winners = []
    
    var player_x_name = "X"
    var player_o_name = "O"

    function check_line(a, b, c) {
        return (
            play_board[a] == play_board[b] &&
            play_board[b] == play_board[c] &&
            (play_board[a] == player_x_value || play_board[a] == player_o_value)
        )
    }

    const check_match = () => {
        for (i = 0; i < 9; i += 3) {
            if (check_line(i, i + 1, i + 2)) {
                return play_board[i];
            }
        }
        for (i = 0; i < 3; i++) {
            if (check_line(i, i + 3, i + 6)) {
                return play_board[i];
            }
        }
        if (check_line(0, 4, 8)) {
            return play_board[0];
        }
        if (check_line(2, 4, 6)) {
            return play_board[2];
        }
        return "";
    };

    check_board_complete = () => {
        let flag = true;
        play_board.forEach(element => {
            if (element != player_x_value && element != player_o_value) {
                flag = false;
            }
        });
        board_full = flag;
    };

    const check_winning = () => {
        check_board_complete()
        let res = check_match()
        if (res == player_x_value) {
            winner.innerText = "Winner is " + player_x_name + "!!";
            winner.classList.add("playerXWin");
            board_full = true
            history_winners.push(player_x_name)
            $(".block").addClass("non_clickeable")
        } else if (res == player_o_value) {
            winner.innerText = "Winner is "+ player_o_name + "!!";
            winner.classList.add("playerOWin");
            board_full = true
            history_winners.push(player_o_name)
            $(".block").addClass("non_clickeable")
        } else if (board_full) {
            winner.innerText = "Draw!";
            winner.classList.add("draw");
            $(".block").addClass("non_clickeable")
        }
    }

    const change_turn = () => {
        if (current_turn == player_x_value) {
            current_turn = player_o_value
        } else {
            current_turn = player_x_value
        }
        check_winning()
      $(".block").toggleClass("block_x")
      $(".block").toggleClass("block_o")
    }

    const set_block_text = (block, current_value) => {
        if (current_value == null || current_value == "") {
            var i = block.attr("id").split("_")[1]
            play_board[i] = current_turn
            block.text(current_turn)
            change_turn()
            block.addClass("non_clickeable")
        }
    }
    
    const show_last_winners = () => {
        winners_div = $("#history-area")
        var text = "<ul>"
        for (i = 0; i < history_winners.length; i++) {
            text += "<li>" + history_winners[i] + "</li>";
        }
        text += "</ul>";
        winners_div.html(text)
    }

    $(".block").click(function () {
        var current_text = $(this).text()        
        set_block_text($(this), current_text)
    });

    $("#reset-button").click(() => {
        play_board = ["", "", "", "", "", "", "", "", ""];
        board_full = false;
        winner.classList.remove("playerXWin");
        winner.classList.remove("playerOWin");
        winner.classList.remove("draw");
        winner.innerText = "";
        $(".block").text("")
        $(".block").removeClass("non_clickeable")
        show_last_winners()
    })
  
    Swal.fire({
        title: "Player 1!",
        text: "What's your name?",
        input: 'text',
        showCancelButton: true        
     }).then((result) => {
      if (result.value) {
          console.log("Player 1: " + result.value);
          player_x_name = result.value
      }
        Swal.fire({
          title: "Player 2!",
          text: "What's your name?",
          input: 'text',
          showCancelButton: true        
       }).then((result) => {
        if (result.value) {
            console.log("Player 2: " + result.value);
            player_o_name = result.value
        }
        Swal.fire({
          title: "Start Game!"
        })
      });
    });
  
    $(".block").addClass("block_x");
});