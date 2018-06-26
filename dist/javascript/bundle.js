!function(e){var t={};function F(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,F),n.l=!0,n.exports}F.m=e,F.c=t,F.d=function(e,t,i){F.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},F.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},F.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return F.d(t,"a",t),t},F.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},F.p="javascript",F(F.s=0)}([function(e,t,F){"use strict";F.r(t);var i=function(){return function(e){var t=this;for(var F in this.imgs={ground:{path:"./images/ground.png",element:null}},this.loadedImgs=0,this.numberOfImgs=Object.keys(this.imgs).length,this.imgs){var i=this.imgs[F];i.element=new Image,i.element.src=i.path,i.element.onload=function(){++t.loadedImgs===t.numberOfImgs&&e()}}}}(),n=function(){function e(e){this.imgs=e.assets.imgs,this.player=e.player,this.game=e,this.canvas=document.getElementById("level"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=800,this.canvas.height=640,this.animate()}return e.prototype.animate=function(){this.drawLevel(),window.requestAnimationFrame(this.animate.bind(this))},e.prototype.drawLevel=function(){var e=this;this.ctx.clearRect(0,0,800,640),this.game.level.map.forEach(function(t,F){t.forEach(function(t,i){var n=32*i,r=32*F;if("0"===t)return e.ctx.fillStyle="#000",void e.ctx.fillRect(n,r,32,32);if("F"===t&&e.ctx.drawImage(e.imgs.ground.element,n,r),e.inPlayerSight(n,r)){var o=e.ctx.createRadialGradient(32*e.player.currentPosition.x+16,32*e.player.currentPosition.y+16,0,32*e.player.currentPosition.x+16,32*e.player.currentPosition.y+16,50);o.addColorStop(.1,"rgba(254, 185, 98, 0.5)"),o.addColorStop(1,"rgba(0,0,0,0.9)"),e.ctx.fillStyle=o,e.ctx.fillRect(n,r,32,32),e.drawLevelExits(t,n,r)}else e.drawLevelExits(t,n,r),e.ctx.fillStyle="rgba(0,0,0,0.9)",e.ctx.fillRect(n,r,32,32)})}),this.ctx.fillStyle="#444",this.ctx.fillRect(32*this.player.currentPosition.x,32*this.player.currentPosition.y,32,32)},e.prototype.inPlayerSight=function(e,t){var F=32*(this.player.currentPosition.x-1),i=32*(this.player.currentPosition.x+1),n=32*(this.player.currentPosition.y-1),r=32*(this.player.currentPosition.y+1);return e>=F&&e<=i&&t>=n&&t<=r},e.prototype.drawLevelExits=function(e,t,F){"N"===e&&(this.ctx.fillStyle="#ff8300",this.ctx.fillRect(t,F,32,32)),"P"===e&&(this.ctx.fillStyle="#ffee00",this.ctx.fillRect(t,F,32,32))},e}(),r=function(){function e(e){this.currentPosition={x:0,y:0},this.game=e,window.addEventListener("keydown",this.handleControls.bind(this))}return e.prototype.handleControls=function(e){switch(e.key){case"ArrowLeft":this.requestedPosition={x:this.currentPosition.x-1,y:this.currentPosition.y};break;case"ArrowRight":this.requestedPosition={x:this.currentPosition.x+1,y:this.currentPosition.y};break;case"ArrowUp":this.requestedPosition={x:this.currentPosition.x,y:this.currentPosition.y-1};break;case"ArrowDown":this.requestedPosition={x:this.currentPosition.x,y:this.currentPosition.y+1}}this.checkRequestedMove()},e.prototype.checkRequestedMove=function(){var e=this.game.level.map;if(e[this.requestedPosition.y]&&e[this.requestedPosition.y][this.requestedPosition.x])switch(e[this.requestedPosition.y][this.requestedPosition.x]){case"0":this.requestedPosition=void 0;break;case"N":this.game.setLevel({direction:"next"});break;case"P":this.game.setLevel({direction:"previous"});break;default:this.currentPosition=this.requestedPosition}},e}(),o={one:{nextLevel:"two",nextLevelCordinates:{x:24,y:11},map:[["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","F","F","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","F","F","F","F","0","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","F","F","F","F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","F","F","F","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","F","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","F","F","F","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","0","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","0","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0"],["0","F","F","F","F","0","0","0","0","F","F","0","F","F","F","0","0","0","0","0","0","0","F","F","F"],["0","F","F","F","F","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","F","N","F"],["0","F","F","F","F","0","0","0","0","0","0","0","0","F","F","F","F","0","0","0","0","F","F","F","F"],["0","F","F","F","F","F","F","F","F","F","F","F","0","0","0","F","F","0","F","F","F","F","0","0","0"],["0","F","F","F","F","0","0","0","0","0","0","F","F","F","F","F","F","F","F","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","F","F","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]]},two:{nextLevel:"three",previousLevel:"one",nextLevelCordinates:{x:8,y:10},map:[["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","P","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","F","N","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]]},three:{nextLevel:"four",previousLevel:"two",nextLevelCordinates:{x:18,y:14},map:[["F","F","F","F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","P","F","0","F","F","F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","F","F","F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","0","0","F","F","F","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","0","0","F","F","F","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","0","F","F","F","N","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","0","F","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0"]]},four:{previousLevel:"three",map:[["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","P","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","F","F","0","0","F","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","F","F","0","0","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]]}};F.d(t,"Game",function(){return s});var s=function(){function e(){var e=this;this.assets=new i(function(){e.player=new r(e),e.setLevel({name:"one"}),e.engine=new n(e)})}return e.prototype.setLevel=function(e){var t;t=e.name?e.name:this.level[e.direction+"Level"],this.level=o[t],e.direction&&("previous"===e.direction?this.player.currentPosition=this.level.nextLevelCordinates:this.player.currentPosition={x:0,y:0})},e}();new s}]);