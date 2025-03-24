var defaults = {};

var empty = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

["0", "2", "4", "8", "16", "32", "64", "128", "256", "512", "1024", "2048"].forEach((v, i)=>{
	let f = new Image();
	f.src = `./img/${v}.svg`
	defaults[v] = f;
});

var game = new board(JSON.parse(JSON.stringify(empty)), defaults);

setInterval(()=>{
	game.render(document.getElementById("main"));
});
