var buttonColours = ["green","red","yellow","blue"]
var gameSequence = [];
var playerSequence = [];
let keyPressed = false
var randomNumber;
var level = 1;

document.addEventListener("keypress", function (){
    if(keyPressed === false){
        nextSequence() 
        keyPressed = true
    }
})


function nextSequence(){
    playerSequence = [];
    document.querySelector("#level-title").textContent = "Level " + level
    randomNumber = (Math.floor(Math.random()*4))
    gameSequence.push(buttonColours[randomNumber])
    playSound(buttonColours[randomNumber])
    flashAnimation(randomNumber)

}

for(var i = 0; i < document.querySelectorAll(".btn").length; i++){
    document.querySelectorAll(".btn")[i].addEventListener("click", function(){
        pressedAnimation(this)
        playSound(this.getAttribute("id"))

        playerSequence.push(this.getAttribute("id"))
        checkAnswer(playerSequence.length-1)
    })
}

function checkAnswer(currentLevel){
    if(playerSequence[currentLevel] === gameSequence[currentLevel]){
        if(playerSequence.length === gameSequence.length){
            setTimeout(() => {
                nextSequence()
            }, 500);
            level++;
        }
    }else{
        playSound("wrong")
        gameOver()
    }
}

function playSound(name){
    var audio = new Audio("/sounds/" + name +".mp3");
    audio.play()
}


function gameOver(){
    document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart"
    gameSequence = []
    playerSequence = []
    keyPressed = false
    
    $("body").addClass("game-over")
    
    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    
      level = 1;
}

function flashAnimation(randomNumber){
    document.querySelectorAll('.btn')[randomNumber].classList.add("flash")
    setTimeout(() => {
        document.querySelectorAll('.btn')[randomNumber].classList.remove("flash")
    }, 100);

}

function pressedAnimation(val){
    val.classList.add("pressed")
    setTimeout(() => {
        val.classList.remove("pressed")
    }, 100);

}