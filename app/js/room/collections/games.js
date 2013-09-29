define(function(require) {
	var Backbone = require("backbone");
	return new Backbone.Collection([
		{ name: 'Concentration Room', path: 'roms/croom/croom.nes' },
		{ name: 'LJ65', path: 'roms/lj65/lj65.nes' },
		{ name: 'Bomberman', path: 'roms/BM/BM.nes' },
		{ name: 'Captain American', path:'roms/CA/Captain American [p1][!].nes' },
		{ name: 'Flintstones', path: 'roms/FS/Flintstones, The - The Surprise at Dinosaur Peak! (U) [p1][!].nes' },
		{ name: 'Megaman II', path:'roms/G/Megaman II (U) [!].nes' },
		{ name: 'Double Dragon', path:'roms/Q/Double Dragon (U) [!].nes' },
		{ name: 'F-1 Race', path:'roms/W/F-1 Race (J).nes' },
		{ name: 'Bubble Bobble', path: 'roms/local-roms/Bubble Bobble (U).nes' },
		{ name: 'Contra', path: 'roms/local-roms/Contra (U) [!].nes' },
		{ name: 'Donkey Kong', path: 'roms/local-roms/Donkey Kong (JU).nes' },
		{ name: 'Dr. Mario', path: 'roms/local-roms/Dr. Mario (JU).nes' },
		{ name: 'Golf', path: 'roms/local-roms/Golf (JU).nes' },
		{ name: 'The Legend of Zelda', path: 'roms/local-roms/Legend of Zelda, The (U) (PRG1).nes' },
		{ name: 'Lemmings', path: 'roms/local-roms/Lemmings (U).nes' },
		{ name: 'Lifeforce', path: 'roms/local-roms/Lifeforce (U).nes' },
		{ name: 'Mario Bros.', path: 'roms/local-roms/Mario Bros. (JU) [!].nes' },
		{ name: 'Mega Man', path: 'roms/local-roms/Mega Man (U).nes' },
		{ name: 'Pac-Man', path: 'roms/local-roms/Pac-Man (U) [!].nes' },
		{ name: 'Super Mario Bros.', path: 'roms/local-roms/Super Mario Bros. (JU) (PRG0) [!].nes' },
		{ name: 'Tennis', path: 'roms/local-roms/Tennis (JU) [!].nes' },
		{ name: 'Tetris', path: 'roms/local-roms/Tetris (U) [!].nes' },
		{ name: 'Tetris 2', path: 'roms/local-roms/Tetris 2 (U) [!].nes' },
		{ name: 'Zelda II - The Adventure of Link', path: 'roms/local-roms/Zelda II - The Adventure of Link (U).nes' }
	]);
});
