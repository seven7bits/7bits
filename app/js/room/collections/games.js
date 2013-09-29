define(function(require) {
	var Backbone = require("backbone");
	return new Backbone.Collection([
		{ type: 'nes', name: 'Concentration Room', path: 'roms/croom.nes' },
		{ type: 'nes', name: 'LJ65', path: 'roms/lj65.nes' },
		{ type: 'nes', name: 'Bomberman', path: 'roms/BM.nes' },
		{ type: 'nes', name: 'Captain American', path:'roms/Captain American [p1][!].nes' },
		{ type: 'nes', name: 'Flintstones', path: 'roms/Flintstones, The - The Surprise at Dinosaur Peak! (U) [p1][!].nes' },
		{ type: 'nes', name: 'Megaman II', path:'roms/Megaman II (U) [!].nes' },
		{ type: 'nes', name: 'Double Dragon', path:'roms/Double Dragon (U) [!].nes' },
		{ type: 'nes', name: 'F-1 Race', path:'roms/F-1 Race (J).nes' },
		{ type: 'nes', name: 'Bubble Bobble', path: 'roms/Bubble Bobble (U).nes' },
		{ type: 'nes', name: 'Contra', path: 'roms/Contra (U) [!].nes' },
		{ type: 'nes', name: 'Donkey Kong', path: 'roms/Donkey Kong (JU).nes' },
		{ type: 'nes', name: 'Dr. Mario', path: 'roms/Dr. Mario (JU).nes' },
		{ type: 'nes', name: 'Golf', path: 'roms/Golf (JU).nes' },
		{ type: 'nes', name: 'The Legend of Zelda', path: 'roms/Legend of Zelda, The (U) (PRG1).nes' },
		{ type: 'nes', name: 'Lemmings', path: 'roms/Lemmings (U).nes' },
		{ type: 'nes', name: 'Lifeforce', path: 'roms/Lifeforce (U).nes' },
		{ type: 'nes', name: 'Mario Bros.', path: 'roms/Mario Bros. (JU) [!].nes' },
		{ type: 'nes', name: 'Mega Man', path: 'roms/Mega Man (U).nes' },
		{ type: 'nes', name: 'Pac-Man', path: 'roms/Pac-Man (U) [!].nes' },
		{ type: 'nes', name: 'Super Mario Bros.', path: 'roms/Super Mario Bros. (JU) (PRG0) [!].nes' },
		{ type: 'nes', name: 'Tennis', path: 'roms/Tennis (JU) [!].nes' },
		{ type: 'nes', name: 'Tetris', path: 'roms/Tetris (U) [!].nes' },
		{ type: 'nes', name: 'Tetris 2', path: 'roms/Tetris 2 (U) [!].nes' },
		{ type: 'nes', name: 'Zelda II - The Adventure of Link', path: 'roms/Zelda II - The Adventure of Link (U).nes' },
		{ type: 'js', name: 'OOOOOOOOOOOOOOOO', path: '/js/games/fangois/7bits/game.html', config: 'js/games/fangois/7bits/config.json'}
	]);
});
