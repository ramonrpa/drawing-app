let radius = 20
let graphic = null
let lastPoint = null
let currentTool = 0
let color = '#000'
let squareOrigin = null
let circleOrigin = null
let shapeFill = true

$(document).ready(() => {

    $("#canvas").css("margin-left", $('.sidebar').width())

    $('.tool').each((index, item) => {
        item = $(item)
        item.click(() => {
            setTool(index)
        })
    })

    $("#colorPicker").click(() => {
        $("#color").focus()
        $("#color").click()
    })

    $('#color').change(() => {
        color = $("#color").val()
    })

    $("#download").click(() => {
        graphic.save("Untitled.png")
    })

    $('#trash').click(() => {
        graphic.background(255)
        background(255)
    })

    $('#radius').change(() => {
        radius = parseInt($("#radius").val())
    })
})

function setTool(id) {
    currentTool = id
    $('.tool').each((index, item) => {
        item = $(item)
        item.removeClass("active")
        if (index == id) item.addClass("active")
    })
}

function setColor() {
    $('#color').value
}

function setup() {
    createCanvas(document.body.clientWidth - $('.sidebar').width(), document.body.clientHeight).parent("#canvas")
    ellipseMode(CENTER)
    graphic = createGraphics(document.body.clientWidth - $('.sidebar').width(), document.body.clientHeight)
    graphic.background(255)
}

function draw() {
    background(255)
    image(graphic, 0, 0)

    if (mouseIsPressed) {
        if ($(".modal").css("display") != 'block')
            drawOnGraphic()
    } else {
        lastPoint = null
        onMouseQuit()
    }

    mousePreview()
}

function mousePreview() {
    if (currentTool == 0 || currentTool == 5) {
        fill("#FFF")
        stroke("#000")
        if (currentTool == 0) fill(color)
        if (currentTool == 0) stroke(color)
        strokeWeight(2)
        ellipse(mouseX, mouseY, radius, radius)
    }
}

function drawOnGraphic() {
    if (lastPoint == null)
        lastPoint = [mouseX, mouseY]

    if (currentTool == 0) {
        graphic.noFill()
        graphic.stroke(color)
        graphic.strokeWeight(radius)
        graphic.line(mouseX, mouseY, lastPoint[0], lastPoint[1])
    } else if (currentTool == 1) {
        shapeFill = true
        if (squareOrigin == null) {
            squareOrigin = [mouseX, mouseY]
        } else {
            fill(color)
            noStroke()
            rect(squareOrigin[0], squareOrigin[1], mouseX - squareOrigin[0], mouseY - squareOrigin[1])
        }
    } else if (currentTool == 2) {
        shapeFill = false
        if (squareOrigin == null) {
            squareOrigin = [mouseX, mouseY]
        } else {
            noFill()
            stroke("#000")
            strokeWeight(radius)
            rect(squareOrigin[0], squareOrigin[1], mouseX - squareOrigin[0], mouseY - squareOrigin[1])
        }
    } else if (currentTool == 3) {
        shapeFill = true
        if (circleOrigin == null) {
            circleOrigin = [mouseX, mouseY]
        } else {
            fill(color)
            noStroke()
            let d = createVector(mouseX - circleOrigin[0], mouseY - circleOrigin[1]).mag()
            ellipseMode(CENTER)
            ellipse(circleOrigin[0], circleOrigin[1], d * 2, d * 2)
        }
    } else if (currentTool == 4) {
        shapeFill = false
        if (circleOrigin == null) {
            circleOrigin = [mouseX, mouseY]
        } else {
            noFill()
            stroke("#000")
            strokeWeight(radius)
            let d = createVector(mouseX - circleOrigin[0], mouseY - circleOrigin[1]).mag()
            ellipseMode(CENTER)
            ellipse(circleOrigin[0], circleOrigin[1], d * 2, d * 2)
        }
    } else if (currentTool == 5) {
        graphic.noFill()
        graphic.stroke("#FFF")
        graphic.strokeWeight(radius)
        graphic.line(mouseX, mouseY, lastPoint[0], lastPoint[1])
    }

    lastPoint = [mouseX, mouseY]
}

document.onwheel = (e) => {
    if (e.deltaY < 0) {
        radius += 2
    }
    if (e.deltaY > 0) {
        radius -= 2
        if (radius < 0) radius = 0
    }
    $("#radius").val(radius)
}

function onMouseQuit() {
    if (squareOrigin != null) {
        graphic.noFill()
        graphic.stroke(color)
        graphic.strokeWeight(radius)
        if (shapeFill) {
            graphic.fill(color)
            graphic.noStroke()
        }
        graphic.rect(squareOrigin[0], squareOrigin[1], mouseX - squareOrigin[0], mouseY - squareOrigin[1])
        squareOrigin = null
    }
    if (circleOrigin != null) {
        graphic.noFill()
        graphic.stroke(color)
        graphic.strokeWeight(radius)
        if (shapeFill) {
            graphic.fill(color)
            graphic.noStroke()
        }
        let d = createVector(mouseX - circleOrigin[0], mouseY - circleOrigin[1]).mag()
        graphic.ellipseMode(CENTER)
        graphic.ellipse(circleOrigin[0], circleOrigin[1], d * 2, d * 2)
        circleOrigin = null
    }
}
