// Colors - #333336, #222224

// Setup
const screen = document.getElementById('screen')
const ctx = screen.getContext('2d')
let scale

// Resize to different zooms and screens
function resizeScreen(GAME_WIDTH, GAME_HEIGHT) {
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;

	// Calculate scale to fit screen
	scale = Math.min(windowWidth / GAME_WIDTH, windowHeight / GAME_HEIGHT);

	// Set the displayed size (CSS pixels)
	screen.style.width = GAME_WIDTH * scale + 'px';
	screen.style.height = GAME_HEIGHT * scale + 'px';

	// Set the internal resolution (game logic size)
	screen.width = GAME_WIDTH;
	screen.height = GAME_HEIGHT;
}

resizeScreen(1920, 1080)

// Variable

// Object
let play_button
let option_button

// Mouse
const mouse = {
	x: 0,
	y: 0,
	down: false
}

screen.addEventListener('mousedown', (e) => {
	mouse.down = e.button
})
screen.addEventListener('mouseup', (e) => {
	mouse.down = false
})
screen.addEventListener('mousemove', (e) => {
	mouse.x = Math.floor(e.offsetX/scale)
	mouse.y = Math.floor(e.offsetY/scale)
})

// Scene
let scene;

function changeScene(newScene) {
	switch (newScene) {
		case 'Start_Up_Loading':
			screen.style.backgroundColor = '#000000'
			break;

		case 'Main_Menu':
			screen.style.backgroundColor = '#222224'
			play_button = new Button('Play', 960, 700, 400, 100, '#222224', '#333336')
			option_button = new Button('Options', 960, 900, 400, 100, '#222224', '#333336')
			break;
	
		default:
			screen.style.backgroundColor = '#ffffff'
			break;
	}
	scene = newScene
}

changeScene('Start_Up_Loading')

// Draw Loop
function draw() {
	ctx.reset()
	requestAnimationFrame(draw)
	switch (scene) {
		case 'Start_Up_Loading':
			// Loading Text
			ctx.font = '100px njnaruto'
			ctx.lineWidth = 35;        
			ctx.textAlign = "center"
			ctx.fillStyle = '#ffffff'
			ctx.fillText('Loading...', 960, 540)

			// Go to Main Menu
			if(document.fonts.check("12px njnaruto")){
				changeScene('Main_Menu')
			}
			break;
		case 'Main_Menu':
			// Title
			ctx.font = '100px njnaruto'
			ctx.lineWidth = 35;        
			ctx.textAlign = "center"
			ctx.strokeStyle = '#000000'
			ctx.lineJoin  = 'round'
			ctx.strokeText('Shooting', 960, 275)
			ctx.strokeText('Legends', 960, 375)
			ctx.fillStyle = '#333336'
			ctx.fillText('Shooting', 960, 265)
			ctx.fillText('Legends', 960, 365)

			// Buttons
			// Buttons - Clicked
			if(play_button.checkIfClicked()) {
				changeScene('Main_Manu')
			}
			ctx.fillText(mouse.x, 960, 575)
			// Buttons - Drawing
			play_button.stamp()
			option_button.stamp()
			break;
	
		default:
			ctx.font = '50px ariel'
			ctx.fillStyle = 'black'
			ctx.fillText('How did you get here?', 50, 100)
			break;
	}
}
draw()