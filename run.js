var defaults = {};

var empty = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

["0", "2", "4", "8", "16", "32", "64", "128", "256", "512", "1024", "2048"].forEach((v, i)=>{
	let f = new Image();
	f.src = `./img/${v}.svg`
	defaults[v] = f;
});

var game = new board(JSON.parse(JSON.stringify(empty)), defaults);

setInterval(()=>{
	if(game.haswon()){
		document.getElementById("status").innerHTML = "You won!";
	}else if(game.haslost()){
		document.getElementById("status").innerHTML = "You lost!";
		game.render(document.getElementById("main"), true);
	}else{
		document.getElementById("status").innerHTML = "Score : " + score;
	}
}, 50);

game.salt();
game.salt();
setTimeout(()=>{game.render(document.getElementById("main"))}, 50);
var score = 0;

game.onmerge = (x, y)=>{
	score += game.whatis(x, y) * 2;
	document.getElementById("status").classList.add("_slam");
	setTimeout(()=>{document.getElementById("status").classList.remove("_slam")}, 251);
}

document.addEventListener("keydown", e=>{
	switch(e.code){
		case "ArrowUp":
			game.go("u");
			game.merge("u");
			game.go("u");
			game.salt();
			game.render(document.getElementById("main"), game.haslost());
			break;
		case "ArrowDown":
			game.go("d");
			game.merge("d");
			game.go("d");
			game.salt();
			game.render(document.getElementById("main")), game.haslost();
			break;
		case "ArrowLeft":
			game.go("l");
			game.merge("l");
			game.go("l");
			game.salt();
			game.render(document.getElementById("main")), game.haslost();
			break;
		case "ArrowRight":
			game.go("r");
			game.merge("r");
			game.go("r");
			game.salt();
			game.render(document.getElementById("main")), game.haslost();
			break;
		default:
			break;
	}
});
