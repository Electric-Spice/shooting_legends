class Button {
    constructor(text, x, y, width, height, onClick, unlocked=true, textfill='black', fill='white', border='black') {
        this.text = text

        this.x = x - (width/2)
        this.y = y - (height/2)
        this.width = width
        this.height = height

        this.onClick = onClick

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
    constructor(x, y, size, angle = 0, borderRadius = 5 , fill = 'white', border = 'black', primany_weapon = 'spike', secondary_weapon = null){
        this.x = x
        this.y = y
        this.size = size
        this.angle = angle

        this.borderRadius = borderRadius

        this.fill = fill
        this.border = border

        this.primany_weapon = primany_weapon
        this.secondary_weapon = secondary_weapon

        this.speedX = 0
        this.speedY = 0
    }
    stamp(){
        // Rotate
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)

        // Fill
        ctx.lineWidth = 10*(this.size/75)
        ctx.strokeStyle = this.border
        ctx.fillStyle = this.fill
        
        // Weapon
        secondaryWeaponDraw(this.secondary_weapon, -(this.size/2), -(this.size/2), this.size, this.borderRadius)
        primanyWeaponDraw(this.primany_weapon, -(this.size/2), -(this.size/2), this.size, this.borderRadius)
        
        // Body
        ctx.beginPath()
        ctx.roundRect(-(this.size/2), -(this.size/2), this.size, this.size, (this.borderRadius)*(this.size/75))
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
        
        
        // Unrotate
        ctx.rotate(-this.angle)
        ctx.translate(-this.x, -this.y)
    }
    hits(object){
        return rectRect(this.x-(this.size/2), this.y-(this.size/2), this.size, this.size, object.x, object.y, object.width, object.height)
    }
    onStep(steps, collusions){
        var lastStep;
        for(let step = 0; step < steps; step += 1){
            lastStep = this.y
            this.y += this.speedY/steps
            for(let collusion of collusions){
                if(this.hits(collusion)){
                    this.y = lastStep
                    this.speedY = 0
                }
            }

            lastStep = this.x
            this.x += this.speedX/steps
            for(let collusion of collusions){
                if(this.hits(collusion)){
                    this.x = lastStep
                    this.speedX = 0
                }
            }
        }
    }
}

class Bullet{
    constructor(x, y, angle, type, radius, target, fill = 'white', border = 'black'){
        this.x = x
        this.y = y
        this.angle = angle

        this.type = type
        this.radius = radius

        this.target = target

        this.fill = fill
        this.border = border
    }
    hitsShape(x, y, width, height){
        return circleRect(this.x, this.y, this.radius, x, y, width, height)
    }
    hitsBorder(){
        if(this.hitsShape(0, 0, 1, 1920) || this.hitsShape(1920, 0, 1, 1920) || this.hitsShape(0, 0, 1080, 1) || this.hitsShape(0, 1080, 1080, 1)){
            return true
        }
        return false
    }
    hitsTank(tank){
        return circleRect(this.x, this.y, this.radius, tank.x, tank.y, tank.size, tank.size)
    }
    stamp(){
        ctx.fillStyle = this.fill
        ctx.strokeStyle = this.border
        ctx.beginPath()
        ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
    }
}

// Size of the Tank
function primanyWeaponDraw(type, x, y, size, borderRadius) {
    switch (type) {
        case 'spike':
            ctx.beginPath()
            ctx.moveTo(x, y+(size/4)+(size/2))
            ctx.lineTo(x-(size/4), y+(size/2))
            ctx.lineTo(x, y+(size/2)-(size/4))
            ctx.closePath()
            ctx.stroke()
            ctx.fill()
        break;
        case 'gun':
            ctx.beginPath()
            // (size/4)/2 == size/8
            ctx.roundRect((x-((size/8)-(size/2)))-(size/1.65), (y-((size/8)-(size/2))), size/4, size/4, (borderRadius/4)*(size/75))
            ctx.closePath()
            ctx.stroke()
            ctx.fill()
        break;
    }
}
function secondaryWeaponDraw(type, x, y, size, borderRadius) {
    switch (type) {
        case 'spike':
            ctx.beginPath()
            ctx.moveTo(x, y+(size/6)+(size/6)+(size/1.5))
            ctx.lineTo(x-(size/4), y+(size/6)+(size/1.5))
            ctx.lineTo(x, y-(size/6)+(size/6)+(size/1.5))
            ctx.closePath()
            ctx.stroke()
            ctx.fill()
            ctx.beginPath()
            ctx.moveTo(x, y+(size/6)+(size/6))
            ctx.lineTo(x-(size/4), y+(size/6))
            ctx.lineTo(x, y-(size/6)+(size/6))
            ctx.closePath()
            ctx.stroke()
            ctx.fill()
        break;
        case 'gun':
            ctx.beginPath()
            // (size/4)/2 == size/8
            // ((size/8)-(size/2)) = center
            ctx.roundRect((x-((size/8)-(size/2)))-(size/1.65), (y-((size/8)-(size/2))), size/4, size/4, (borderRadius/4)*(size/75))
            ctx.closePath()
            ctx.stroke()
            ctx.fill()
        break;
    }
}

function pointRect(px, py, rx, ry, rw, rh) {
    if (px >= rx &&      
      px <= rx + rw &&   
      py >= ry &&        
      py <= ry + rh) {  
        return true;
    }
    return false;
}

function rectRect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h){
    if (r1x + r1w >= r2x && 
      r1x <= r2x + r2w &&  
      r1y + r1h >= r2y && 
      r1y <= r2y + r2h) {  
        return true;
    }
    return false
}

function circleRect(cx, cy, radius, rx, ry, rw, rh) {

  // temporary variables to set edges for testing
  var testX = cx;
  var testY = cy;

  // which edge is closest?
  if (cx < rx)         testX = rx;      // test left edge
  else if (cx > rx+rw) testX = rx+rw;   // right edge
  if (cy < ry)         testY = ry;      // top edge
  else if (cy > ry+rh) testY = ry+rh;   // bottom edge

  // get distance from closest edges
  var distX = cx-testX;
  var distY = cy-testY;
  var distance = Math.sqrt( (distX*distX) + (distY*distY) );

  // if the distance is less than the radius, collision!
  if (distance <= radius) {
    return true;
  }
  return false;
}