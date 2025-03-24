// lib.js : just the definitions, all the init stuff is in run.js
class board {
	constructor(board, cache){
		this.board = board;
		this.cache = cache;
		this.size = {x : board[0].length, y : board.length};
		this.onmerge = (x, y)=>{};
	}
	whatis(x, y){
		if(x < 0 || y < 0 || x > this.size.x - 1 || y > this.size.y - 1){
			return 1;
		}
		return this.board[x][y];
	}
	set(x, y, val){
		return this.board[x][y] = val;
	}
	render(canvas, grayscale){
		let c = canvas.getContext("2d");
		if(grayscale){
			c.filter = "grayscale(1)";
		}
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
		switch(dir){
			case "u":
				while(true){
					let cp = JSON.stringify(this.board);
					for(let x = 0; x < this.size.x; x++){
						for(let y = 0; y < this.size.y; y++){
							if(this.whatis(x - 1, y) == 0){
								let pre = this.whatis(x, y);
								this.set(x, y, 0);
								this.set(x - 1, y, pre);
							}
						}
					}
					if(cp == JSON.stringify(this.board)){
						break;
					}
				}
				break;
			case "d":
				while(true){
					let cp = JSON.stringify(this.board);
					for(let x = 0; x < this.size.x; x++){
						for(let y = 0; y < this.size.y; y++){
							if(this.whatis(x + 1, y) == 0){
								let pre = this.whatis(x, y);
								this.set(x, y, 0);
								this.set(x + 1, y, pre);
							}
						}
					}
					if(cp == JSON.stringify(this.board)){
						break;
					}
				}
				break;
			case "l":
				while(true){
					let cp = JSON.stringify(this.board);
					for(let x = 0; x < this.size.x; x++){
						for(let y = 0; y < this.size.y; y++){
							if(this.whatis(x, y - 1) == 0){
								let pre = this.whatis(x, y);
								this.set(x, y, 0);
								this.set(x, y - 1, pre);
							}
						}
					}
					if(cp == JSON.stringify(this.board)){
						break;
					}
				}
				break;
			case "r":
				while(true){
					let cp = JSON.stringify(this.board);
					for(let x = 0; x < this.size.x; x++){
						for(let y = 0; y < this.size.y; y++){
							if(this.whatis(x, y + 1) == 0){
								let pre = this.whatis(x, y);
								this.set(x, y, 0);
								this.set(x, y + 1, pre);
							}
						}
					}
					if(cp == JSON.stringify(this.board)){
						break;
					}
				}
				break;
			default:
				console.error(`Can't go in direction ${v}!`)
				break;
		}
	}
	haswon(){
		for(let x = 0; x < this.size.x; x++){
			for(let y = 0; y < this.size.y; y++){
				if(this.whatis(x, y) == 2048){
					return true;
				}
			}
		}
		return false;
	}
	merge(dir){
		switch(dir){
			case "u":
				for(let x = 0; x < this.size.x; x++){
					for(let y = 0; y < this.size.y; y++){
						if(this.whatis(x - 1, y) == this.whatis(x, y)){
							this.onmerge(x, y);
							this.set(x, y, 0);
							this.set(x - 1, y, this.whatis(x - 1, y) * 2);
						}
					}
				}
				break;
			case "d":
				for(let x = 0; x < this.size.x; x++){
					for(let y = 0; y < this.size.y; y++){
						if(this.whatis(x + 1, y) == this.whatis(x, y)){
							this.onmerge(x, y);
							this.set(x, y, 0);
							this.set(x + 1, y, this.whatis(x + 1, y) * 2);
						}
					}
				}
				break;
			case "l":
				for(let x = 0; x < this.size.x; x++){
					for(let y = 0; y < this.size.y; y++){
						if(this.whatis(x, y - 1) == this.whatis(x, y)){
							this.onmerge(x, y);
							this.set(x, y, 0);
							this.set(x, y - 1, this.whatis(x, y - 1) * 2);
						}
					}
				}
				break;
			case "r":
				for(let x = 0; x < this.size.x; x++){
					for(let y = 0; y < this.size.y; y++){
						if(this.whatis(x, y + 1) == this.whatis(x, y)){
							this.onmerge(x, y);
							this.set(x, y, 0);
							this.set(x, y + 1, this.whatis(x, y + 1) * 2);
						}
					}
				}
				break;
			default:
				console.error(`Can't go in direction ${v}!`)
				break;
		}
	}
	haslost(){
		for(let x = 0; x < this.size.x; x++){
			for(let y = 0; y < this.size.y; y++){
				if(this.whatis(x, y) == 0){
					return false;
				}
				if(this.whatis(x - 1, y) == this.whatis(x, y) || this.whatis(x + 1, y) == this.whatis(x, y) || this.whatis(x, y - 1) == this.whatis(x, y) || this.whatis(x, y + 1) == this.whatis(x, y)){
					return false;
				}
			}
		}
		return true;
	}
}
