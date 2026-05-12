// Colors - #333336, #222224, #19191b

// Ideas you can get abilities by get part from destroys tank or in cutscene (maybe not only cutscene) crates boss has more drop rates

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
let unlocked_levels = 7
let selected_level = null;

// Object
let buttons = []
let player;
let enemys;

// Mouse / Keys
// up, down, left, right, shoot, abilitie1, abilitie2
let keybinds = ['w', 's', 'a', 'd', 'mouse0', 'mouse1', 'mouse2']

// Keys
const keys = {
	up: false,
	down: false,
	left: false,
	right: false,
	shoot: false,
	abilitie1: false,
	abilitie2: false 
}

// Mouse
const mouse = {
	x: 0,
	y: 0,
	down: false
}

// Prevent Menu
addEventListener('contextmenu', (e) => {
	e.preventDefault()
})

screen.addEventListener('mousedown', (e) => {
	mouse.down = e.button
	if(keybinds.includes('mouse'+e.button)){
		keys[Object.keys(keys)[keybinds.indexOf('mouse'+e.button)]] = true
	}
})
screen.addEventListener('mouseup', (e) => {
	mouse.down = false
	if(keybinds.includes('mouse'+e.button)){
		keys[Object.keys(keys)[keybinds.indexOf('mouse'+e.button)]] = false
	}
})
screen.addEventListener('mousemove', (e) => {
	mouse.x = Math.floor(e.offsetX/scale)
	mouse.y = Math.floor(e.offsetY/scale)
})

addEventListener('keydown', (e) => {
	if(keybinds.includes(e.key)){
		keys[Object.keys(keys)[keybinds.indexOf(e.key)]] = true
	}
})

addEventListener('keyup', (e) => {
	if(keybinds.includes(e.key)){
		keys[Object.keys(keys)[keybinds.indexOf(e.key)]] = false
	}
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
			// Play, Customize, Options
			buttons = []
			buttons.push(new Button('Play', 960, 610, 400, 100,  () => {changeScene('Level_Select')}, true, '#222224', '#333336'))
			buttons.push(new Button('Customize', 960, 780, 400, 100, () => {changeScene('Customize')}, true, '#222224', '#333336'))
			buttons.push(new Button('Options', 960, 950, 400, 100, () => {changeScene('Options')}, true, '#222224', '#333336'))
			break;
		case 'Level_Select':
			screen.style.backgroundColor = '#222224'
			buttons = []
			let unlockeds = []
			
			for(let i = 0; i < 9; i++){
				if(unlocked_levels >= i){
					unlockeds.push(true)
				}else{
					unlockeds.push(false)
				}
			}
			// Tutorial
			buttons.push(new Button('Tutorial', 260, 540, 400, 100, () => {selected_level = '0'; changeScene('Game');}, true, '#222224', '#333336'))
			// Number Levels
			buttons.push(new Button('1', 660, 400, 100, 100, () => {selected_level = '1'; changeScene('Game');}, unlockeds[1], '#222224', '#333336'))
			buttons.push(new Button('2', 960, 250, 100, 100, () => {selected_level = '2'; changeScene('Game');}, unlockeds[2], '#222224', '#333336'))
			buttons.push(new Button('3', 1260, 400, 100, 100, () => {selected_level = '3'; changeScene('Game');}, unlockeds[3], '#222224', '#333336'))
			buttons.push(new Button('4', 660, 680, 100, 100, () => {selected_level = '4'; changeScene('Game');}, unlockeds[4], '#222224', '#333336'))
			buttons.push(new Button('5', 960, 830, 100, 100, () => {selected_level = '5'; changeScene('Game');}, unlockeds[5], '#222224', '#333336'))
			buttons.push(new Button('6', 1260, 680, 100, 100, () => {selected_level = '6'; changeScene('Game');}, unlockeds[6], '#222224', '#333336'))
			buttons.push(new Button('7', 960, 540, 200, 200, () => {selected_level = '7'; changeScene('Game');}, unlockeds[7], '#222224', '#333336'))
			// Endless
			buttons.push(new Button('Endless', 1660, 540, 400, 100, () => {selected_level = '8'; changeScene('Game');}, unlockeds[8], '#222224', '#333336'))
			// Back
			buttons.push(new Button('Back', 960, 980, 400, 100, () => {changeScene('Main_Menu');}, true, '#222224', '#333336'))
			break;
		case 'Game':
			player = new Tank(150, 540, 75, 0, 15, '#333336')
			enemys = []
			switch (selected_level) {
				case '1':
					screen.style.backgroundColor = '#222224'
					enemys.push(new Tank(1770, 540, 75, 0, 5, '#380909', '#1d0505'))
					break;
			
				default:
					screen.style.backgroundColor = '#ffffff'
					enemys.push(new Tank(1770, 540, 75, 5))
					break;
			}
			
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
	ctx.clearRect(0, 0, 1920, 1080)
	requestAnimationFrame(draw)
	switch (scene) {
		case 'Start_Up_Loading':
			// Loading Text
			ctx.font = '12px njnaruto'
			ctx.fillText('.', 960, 540)
			ctx.font = '100px ariel'
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
			drawNjText('Shooting', 960, 225, 100, '#333336')
			drawNjText('Legends', 960, 325, 100, '#333336')
			
			// Buttons

			for(let main_buttons of buttons) {
				// Button - Clicked
				if(main_buttons.checkIfClicked()) {
					main_buttons.onClick()
				}
				// Button - Drawing
				main_buttons.stamp()
			}

			// Buttons - Clicked
			if(play_button.checkIfClicked()) {
				changeScene('Level_Select')
			}
			if(option_button.checkIfClicked()) {
				changeScene('Options')
			}

			// Buttons - Drawing
			play_button.stamp()
			option_button.stamp()
			break;
		case 'Level_Select':
			// Title
			drawNjText('Level_Select', 960, 105, 75, '#333336')

			// Button

			// Level Buttons
			for(let level_button of buttons) {
				// Button - Clicked
				if(level_button.checkIfClicked()) {
					level_button.onClick()
				}
				// Button - Drawing
				level_button.stamp()
			}
			break;
		case 'Game':
			// Player
			// Player - Movement
			player.angle = Math.atan2(player.y-mouse.y, player.x-mouse.x)
			player.x += (keys.right-keys.left)*5
			player.y += (keys.down-keys.up)*5
			// Player - Drawing
			player.stamp()

			// Enemys
			for(let enemy of enemys){
				// Enemy - Movement
				enemy.angle = Math.atan2(enemy.y-player.y, enemy.x-player.x)
				enemy.x -= Math.cos(enemy.angle)*3
				enemy.y -= Math.sin(enemy.angle)*3
				// Enemy - Drawing
				enemy.stamp()
			}
			break;
		default:
			ctx.textAlign = "left"
			ctx.font = '50px ariel'
			ctx.fillStyle = 'black'
			ctx.fillText('How did you get here?', 50, 100)
			break;
	}
}
draw()

function drawNjText(text, x, y, size, fill='white', stroke='black', lineWidth=35) {
	ctx.textAlign = "center"
	ctx.textBaseline = "middle"
	ctx.lineJoin  = 'round'
	ctx.font = `${size}px njnaruto`
	ctx.lineWidth = lineWidth;        
	ctx.strokeStyle = stroke
	ctx.strokeText(text, x, y)
	ctx.fillStyle = fill
	ctx.fillText(text, x, y-(size/10))
}