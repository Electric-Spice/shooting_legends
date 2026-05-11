class Button {
    constructor(text, x, y, width, height, unlocked=true, textfill='black', fill='white', border='black') {
        this.text = text

        this.x = x - (width/2)
        this.y = y - (height/2)
        this.width = width
        this.height = height

        this.unlocked = unlocked

        this.textfill = textfill
        this.textsize = 60*(height/100)

        this.fill = fill
        this.border = border
        this.lineWidth = 30*(height/100)
    }
    checkIfClicked() {
        if(mouse.down === 0 && this.unlocked) {
            if(pointRect(mouse.x, mouse.y, this.x - 15, this.y - 15, this.width + 15, this.height + 30)){
                mouse.down = false
                return true
            }
            return false
        }
    }
    stamp() {
        // Button
        ctx.lineJoin  = 'round'
        ctx.lineWidth = this.lineWidth
        ctx.strokeStyle = this.border
        ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = this.fill
        ctx.beginPath()
        ctx.roundRect(this.x, this.y - (7*(this.height/100)), this.width, this.height, 15)
        ctx.closePath()
        ctx.fill()
        if(!(this.unlocked)){
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
            ctx.fillRect(this.x, this.y - (7*(this.height/100)), this.width, this.height)
        }
        
        // Text
        drawNjText(this.text, this.x+ (this.width/2), this.y + (this.height/2), this.textsize, this.textfill, this.border, this.lineWidth-(10*(this.textsize/60)))
    }
}

class Tank{
    constructor(x, y, size, angle = 0){
        this.x = x
        this.y = y
        this.size = size
        this.angle = angle
    }
    stamp(){
        // Rotate
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)

        // Fill
        ctx.lineWidth = 7*(this.size/75)
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'white'

        // Weapon
        weaponDraw('gun', -(this.size/2), -(this.size/2), this.size)

        // Body
        ctx.beginPath()
        ctx.roundRect(-(this.size/2), -(this.size/2), this.size, this.size, (15)*(this.size/75))
        ctx.closePath()
        ctx.stroke()
        ctx.fill()


        // Unrotate
        ctx.rotate(-this.angle)
        ctx.translate(-this.x, -this.y)
    }
}

// Size of the Tank
function weaponDraw(type, x, y, size) {
    switch (type) {
        case 'gun':
            ctx.beginPath()
            ctx.roundRect(x-(size/4), y+(size/4)+(size/8), size/4, size/4, (3.75)*(size/75))
            ctx.closePath()
            ctx.stroke()
            ctx.fill()
        break;
    }
}

function pointRect(px, py, rx, ry, rw, rh) {
    if (px >= rx &&        // right of the left edge AND
      px <= rx + rw &&   // left of the right edge AND
      py >= ry &&        // below the top AND
      py <= ry + rh) {   // above the bottom
        return true;
    }
  return false;
}