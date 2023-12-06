(()=>{"use strict";const n=function(){const n=function(){const n=["A","B","C","D","E","F","G","H","I","J"],e=["1","2","3","4","5","6","7","8","9","10"],t=[];for(let s=0;s<n.length;s+=1){const i=n[s];for(let n=0;n<e.length;n+=1){const s={name:i+e[n],shipOnSpace:null};t.push(s)}}return t}(),e=[];e.push(...n);const t=[],s=[];return{name:null,boardArr:e,placeShip:function(n,s,i){const r={length:n,hits:0,sunk:"not sunk",hit:function(){this.hits+=1,this.isSunk()},isSunk:function(){return this.hits===this.length&&(this.sunk="sunk"),this.sunk}};t.push(r);const c=e.find((n=>n.name===s)),a=e.find((n=>n.name===i));if(c.name[0]===a.name[0])for(let n=e.indexOf(c);n<=e.indexOf(a);n+=1)e[n].shipOnSpace=r;else if(c.name[1]===a.name[1])for(let n=e.indexOf(c);n<=e.indexOf(a);n+=10)e[n].shipOnSpace=r},receiveAttack:function(n){const t=e.find((e=>e.name===n));return t.shipOnSpace?(t.shipOnSpace.hit(),"hit"):(s.push(n),"miss")},checkIfAllShipsSunk:function(){return!!t.every((n=>"sunk"===n.sunk))&&(this.allSunk=!0,!0)}}},e=(document.getElementById("header"),document.getElementById("game-info"),document.getElementById("game")),t=function(){const e={board:null,isTurn:!0,checkTurn:function(){const n=document.getElementById("player-name");this.isTurn?n.classList.add("isTurn"):this.isTurn||n.classList.remove("isTurn")}};e.board=n(),e.board.name="player1";const t=function(){const n=[],e=function(){const n=function(n,e){return Math.floor(Math.random()*(e-n+1)+n)};return["A","B","C","D","E","F","G","H","I","J"][n(1,9)]+n(1,10)};return{compAttack:function(t){const s=t.filter((e=>!n.includes(e.name)));let i=e();return function n(t){return s.find((n=>n.name===t))||(i=e(),n(i)),t}(i)},board:null,isTurn:!1,checkTurnAndAttack:function(n){const e=document.getElementById("computer-name");if(this.isTurn){e.classList.add("isTurn");const t=this.compAttack(n),s=document.getElementById(`player1 ${t}`);setTimeout((()=>{s.click()}),3e3)}else this.isTurn||e.classList.remove("isTurn")}}}();t.board=n(),t.board.name="computerPlayer";const s=function(n){n.placeShip(5,"A1","A5"),n.placeShip(4,"C1","C4"),n.placeShip(3,"F1","F3"),n.placeShip(3,"H1","H3"),n.placeShip(2,"I9","J9")};return s(e.board),s(t.board),{player1:e,computerPlayer:t,switchTurns:function(){e.board.checkIfAllShipsSunk()?alert("Game over! Player Loses"):t.board.checkIfAllShipsSunk()&&alert("Game over! Player Wins"),e.isTurn?(e.isTurn=!1,t.isTurn=!0):t.isTurn&&(e.isTurn=!0,t.isTurn=!1),e.checkTurn(),t.checkTurnAndAttack(e.board.boardArr)}}}();!function(){const n=document.createElement("div");n.setAttribute("id","playerBoardContainer"),n.classList.add("board-container");const s=document.createElement("div");s.setAttribute("id","computerBoardContainer"),s.classList.add("board-container"),e.append(s,n);const i=t.player1.board,r=t.computerPlayer.board,c=function(n,e,s){const{boardArr:i}=n;i.forEach((i=>{const r=document.createElement("div");!function(n,e,s,i){n.addEventListener("click",(()=>{i.isTurn||("hit"===s.receiveAttack(e.name)?n.classList.add("hit-cell"):"miss"===s.receiveAttack(e.name)&&n.classList.add("miss-cell"),t.switchTurns())}))}(r,i,n,s),r.classList.add("gridSquare"),r.setAttribute("id",`${n.name} ${i.name}`),null!=i.shipOnSpace&&r.classList.add("hasShip"),r.innerHTML=i.name,e.append(r)}))};c(i,n,t.player1),c(r,s,t.computerPlayer)}()})();