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