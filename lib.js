// lib.js : just the definitions, all the init stuff is in run.js
class board {
	constructor(board, cache){
		this.board = board;
		this.cache = cache;
		this.size = {x : board[0].length, y : board.length};
	}
	whatis(x, y){
		return this.board[x][y];
	}
	set(x, y, val){
		return this.board[x][y] = val;
	}
	render(canvas){
		let c = canvas.getContext("2d");
		// Compute scale:
		let xs = canvas.width / this.size.x;
		let ys = canvas.height / this.size.y;
		for(let x = 0; x < this.size.x; x++){
			for(let y = 0; y < this.size.y; y++){
				c.drawImage(this.cache[this.whatis(x, y)], y * ys, x * xs, ys, xs);
				//console.log(this.cache[this.whatis(x, y)], this.whatis(x, y), x, y, xs, ys);
			}
		}
	}
	salt(){
		let av = [];
		for(let x = 0; x < this.size.x; x++){
			for(let y = 0; y < this.size.x; y++){
				if(this.whatis(x, y) == 0){
					av.push([x, y]);
				}
			}
		}
		if(av.length == 0){
			return false;
		}else{
			let pick = av[Math.floor(av.length * Math.random())];
			this.set(pick[0], pick[1], Math.random() < 0.9 ? 2 : 4);
			return true;
		}
	}
	go(dir){
		//
	}
}
