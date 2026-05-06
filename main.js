// Colors - #333336, #222224

// Setup
const screen = document.getElementById('screen')
const ctx = screen.getContext('2d')

// Resize to different zooms and screens
function resizeScreen(GAME_WIDTH, GAME_HEIGHT) {
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;

	// Calculate scale to fit screen
	const scale = Math.min(windowWidth / GAME_WIDTH, windowHeight / GAME_HEIGHT);

	// Set the displayed size (CSS pixels)
	screen.style.width = GAME_WIDTH * scale + 'px';
	screen.style.height = GAME_HEIGHT * scale + 'px';

	// Set the internal resolution (game logic size)
	screen.width = GAME_WIDTH;
	screen.height = GAME_HEIGHT;
}

resizeScreen(1920, 1080)

// Scene
let scene;

function changeScene(newScene) {
	switch (newScene) {
		case 'Start_Up_Loading':
			screen.style.backgroundColor = '#000000'
			break;

		case 'Main_Menu':
			screen.style.backgroundColor = '#222224'
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
			ctx.font = '100px ariel'
			ctx.lineWidth = 35;        
			ctx.textAlign = "center"
			ctx.fillStyle = '#ffffff'
			ctx.fillText('Loading...', 960, 540)

			// Go to Main Menu
			window.prompt(document.fonts.check("12px njnaruto"))
			// if(document.fonts.check("njnaruto")){
			// 	changeScene('Main_Manu')
			// }
			break;
		case 'Main_Menu':
			// Title
			ctx.font = '100px njnaruto'
			ctx.lineWidth = 35;        
			ctx.textAlign = "center"
			ctx.strokeStyle = '#000000'
			ctx.strokeText('Shooting', 960, 250)
			ctx.strokeText('Legends', 960, 350)
			ctx.fillStyle = '#333336'
			ctx.fillText('Shooting', 960, 240)
			ctx.fillText('Legends', 960, 340)
			break;
	
		default:
			ctx.font = '50px ariel'
			ctx.fillStyle = 'black'
			ctx.fillText('How did you get here?', 50, 100)
			break;
	}
}
draw()