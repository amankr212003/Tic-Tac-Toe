let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let count = 0;

let turnO = true; //playerX,playerO

const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () =>{
    count = 0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    // Reset all boxes with animation
    boxes.forEach(box => {
        box.classList.remove("win-line");
        box.disabled = false;
        box.style.transform = "scale(1)";
        box.style.transition = "all 0.3s ease";
        box.innerText = "";
        box.style.color = "";
    });
    // Reset message and scroll to top
    msg.innerText = "";
    window.scrollTo(0, 0);
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText = "O";
            turnO = false;
            box.style.color = "#4CAF50";
        }
        else{
            box.innerText = "X";
            turnO = true;
            box.style.color = "#FF6B6B";
        }
        box.disabled = true;
        count++;

        let isWinner=checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    })
})

const gameDraw = () =>{
    setTimeout(() => {
        msg.innerText = `Game was a Draw`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    }, 500);
}

const disableBoxes =()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes =()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
    setTimeout(() => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    }, 500);
}

const checkWinner = () =>{
    for(let pattern of winPattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !="" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                // First show the winning pattern with animation
                boxes[pattern[0]].classList.add("win-line");
                boxes[pattern[1]].classList.add("win-line");
                boxes[pattern[2]].classList.add("win-line");
                showWinner(pos1Val);
                return true;
            }
        }
    }
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);