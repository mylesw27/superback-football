// DOM Selectors
const clock = document.querySelector("#clock")
const userScore = document.querySelector("#userScore")
const compScore = document.querySelector("#compScore")
const canvas = document.querySelector("canvas")
const joImg1 = document.querySelector("#joImg1")

// Canvas Setup
const ctx = canvas.getContext("2d")
// Set canvas resolution (Current resolution = 500 x 1200)
canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', 600)

let originX = 0
let originY = 0 

let renderField = function () {
    // Create End Zones
    ctx.fillStyle = "blue"
    ctx.fillRect(originX+15, 20, 100, 650) // Left End Zone
    ctx.fillStyle = "red"
    ctx.fillRect(originX+1080, 20, 100, 650) // Right End Zone


    // Create Side Lines
    ctx.fillStyle = "white"
    ctx.fillRect(originX+15, originY+10, 1180, 10) // Top Sideline
    ctx.fillRect(originX+15, originY+670, 1180, 10) // Bottom Sideline
    ctx.fillRect(originX+5, originY+10, 15, 670) // Back of end zone - Left End Zone
    ctx.fillRect(originX+1180, originY+20, 15, 650) // Back of end zone - Right End zone

    // Create Yardage Lines (Current field is 980 px wide by 460px tall, each line marked 98 pixels apart)
    ctx.fillRect (originX+115, originY+20, 1, 650) // goal line - Left End Zone
    ctx.fillRect (originX+208, originY+20, 1, 650) // 10 Yard Line
    ctx.fillRect (originX+306, originY+20, 1, 650) // 20 Yard Line
    ctx.fillRect (originX+404, originY+20, 1, 650) // 30 Yard Line
    ctx.fillRect (originX+502, originY+20, 1, 650) // 40 Yard Line
    ctx.fillRect (originX+600, originY+20, 1, 650) // 50 Yard Line
    ctx.fillRect (originX+698, originY+20, 1, 650) // opp 40 Yard Line
    ctx.fillRect (originX+796, originY+20, 1, 650) // opp 30 Yard Line
    ctx.fillRect (originX+894, originY+20, 1, 650) // opp 20 Yard Line
    ctx.fillRect (originX+992, originY+20, 1, 650) // opp 10 Yard Line
    ctx.fillRect (originX+1080, originY+20, 1, 650) // goal line - Right End Zone
}


//Create Classes
// Overarching class for all football players
class fbPlayer {
    constructor(x, y, color) {
        this.x = x + originX
        this.y = y
        this.width = 25
        this.height = 60
        this.color = color
    }

    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x+originX, this.y, this.width, this.height)
    }
}


// Child class of football players for user player
class userFBPlayer extends fbPlayer {
    constructor (x, y) {
        super(x, y)
        this.color = "blue"
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(joImg1, this.x, this.y, 25, 60)
    }
}

// Child class of football players for teammates
class teammate extends fbPlayer {
    constructor (x, y) {
        super(x, y)
        this.color = "blue"
    }
}

// Child class of football players for defenders
class defender extends fbPlayer {
    constructor (x, y, color) {
        super(x, y, color)
        this.color = color
    }
}


// Game objects
// const newPlayer = new fbPlayer(256, 220, "purple")  // Test Player 
const joBackson = new userFBPlayer(210,220)
const defender1 = new defender(390, 75, "green") // CB (top of screen)
const defender2 = new defender(500, 186, "purple") // Safety (top of screen)
const defender3 = new defender(350, 150, "yellow") // DE (top of screen)
const defender4 = new defender(400, 150, "orange") // OLB (top of screen)
const defender5 = new defender(350, 220, "red") // DT (top of screen)
const defender6 = new defender(400, 250, "blue") // MLB
const defender7 = new defender(350, 300, "lime") // DT (bottom of screen)
const defender8 = new defender(400, 350, "aqua") // OLB (bottom of screen)
const defender9 = new defender(350, 400, "hotpink") // (DE (bottom of screen)
const defender10 = new defender(500, 400, "grey") // Safety (bottom of screen)
const defender11 = new defender(420, 525, "white") // CB (bottom of screen)


const renderPlayers = function(){
    // newPlayer.render() // Test Player
    joBackson.render()
    defender1.render()
    defender2.render()
    defender3.render()
    defender4.render()
    defender5.render()
    defender6.render()
    defender7.render()
    defender8.render()
    defender9.render()
    defender10.render()
    defender11.render()

}


const gameLoopInterval = setInterval(gameLoop, 60)


// const sideScroll = setInterval(function () {
//     if (originX >= -610) {
//     originX -= 5
//     }
// }, 300)

// sideScroll() 

// Map Keys (function handleKeyPressEvent with switch)
function handleKeyPressEvent(e) {
    const speed = 20
    switch(e.key) {
        case "w":
        case "ArrowUp":
            e.preventDefault()
            joBackson.y -= speed
            break
        case "s":
        case "ArrowDown":
            e.preventDefault()
            joBackson.y += speed
            break
        case "a":
        case "ArrowLeft":
            e.preventDefault()
            if (joBackson.x <= 210 && originX === 0 ) {
                joBackson.x -= speed
            } else if (joBackson.x > 210 && originX <= -600){
                joBackson.x -= speed
            } else {
                originX += speed
            }
            break
        case "d":
        case "ArrowRight":
            e.preventDefault()
            if (joBackson.x < 210 && originX === 0) {
                joBackson.x += speed
            } else if (joBackson.x >= 210 && originX <= -600) {
                joBackson.x += speed
            } 
            else {
                originX -= speed
            }
            console.log(originX)
            break
    }
}

document.addEventListener("keydown", handleKeyPressEvent)

// Game Loop
function gameLoop () {
    // clear off render
    ctx.clearRect(0,0, canvas.width, canvas.height)
    // check for collision
        // tackle
        // touchdown
    // check game conditions
    // do all of the rendering
    renderField()
    renderPlayers()
    // console.log("loop")-
}

// Console log mouse location for testing
canvas.addEventListener("click", e => {
    console.log(`x: ${e.offsetX}, y: ${e.offsetY}`)
})
// Console log for testing
console.log(joImg1)
console.log(joBackson)