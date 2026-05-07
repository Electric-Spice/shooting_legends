class Button {
    constructor(text, x, y, width, height, textfill='black', textsize=60, fill='white', border='black', lineWidth=30) {
        this.text = text
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.textfill = textfill
        this.textsize = textsize
        this.fill = fill
        this.border = border
        this.lineWidth = lineWidth
    }
    checkIfClicked() {
        if(mouse.down === 0) {
            if(pointRect(mouse.x, mouse.y, this.x - (this.width/2) - 15, this.y - (this.height/2) - 15, this.width + 15, this.height + 30)){
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
        ctx.strokeRect(this.x - (this.width/2), this.y - (this.height/2), this.width, this.height)
        ctx.fillStyle = this.fill
        ctx.beginPath()
        ctx.roundRect(this.x - (this.width/2), this.y - (this.height/2) - 7, this.width, this.height, 15)
        ctx.closePath()
        ctx.fill()
        
        // Text
        drawNjText(this.text, this.x, this.y, this.textsize, this.textfill, this.border, 20)
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