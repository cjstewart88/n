!function(e){var t={};function F(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,F),n.l=!0,n.exports}F.m=e,F.c=t,F.d=function(e,t,i){F.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},F.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},F.t=function(e,t){if(1&t&&(e=F(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(F.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)F.d(i,n,function(t){return e[t]}.bind(null,n));return i},F.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return F.d(t,"a",t),t},F.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},F.p="javascript",F(F.s=0)}([function(e,t,F){"use strict";F.r(t);var i=function(e){var t=this;for(var F in this.imgs={ground:{path:"./images/ground.png",element:null}},this.loadedImgs=0,this.numberOfImgs=Object.keys(this.imgs).length,this.imgs){var i=this.imgs[F];i.element=new Image,i.element.src=i.path,i.element.onload=function(){++t.loadedImgs===t.numberOfImgs&&e()}}},n=function(){function e(e){this.imgs=e.assets.imgs,this.player=e.player,this.game=e,this.canvas=document.getElementById("level"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=800,this.canvas.height=640,this.animate()}return e.prototype.animate=function(){this.drawLevel(),window.requestAnimationFrame(this.animate.bind(this))},e.prototype.drawLevel=function(){var e=this;this.ctx.globalCompositeOperation="source-over",this.ctx.clearRect(0,0,800,640),this.game.level.map.forEach((function(t,F){t.forEach((function(t,i){var n=32*i,o=32*F;if("0"===t)return e.ctx.fillStyle="#000",void e.ctx.fillRect(n,o,32,32);"F"===t&&e.ctx.drawImage(e.imgs.ground.element,n,o),e.inPlayerSight(n,o)?e.drawLevelExits(t,n,o):(e.drawLevelExits(t,n,o),e.ctx.fillStyle="rgba(0, 0, 0)",e.ctx.fillRect(n,o,32,32))}))})),this.ctx.fillStyle="#444",this.ctx.fillRect(this.player.currentPosition.x,this.player.currentPosition.y,16,16)},e.prototype.inPlayerSight=function(e,t){var F=this.player.currentPosition.x-64,i=this.player.currentPosition.x+64,n=this.player.currentPosition.y-64,o=this.player.currentPosition.y+64;return e>=F&&e<=i&&t>=n&&t<=o},e.prototype.drawLevelExits=function(e,t,F){"N"===e&&(this.ctx.fillStyle="#ff8300",this.ctx.fillRect(t,F,32,32)),"E"===e&&(this.ctx.fillStyle="#ffee00",this.ctx.fillRect(t,F,32,32))},e}(),o=function(){function e(e){this.currentPosition={x:0,y:0},this.game=e,document.getElementById("level").addEventListener("click",this.tryToStart.bind(this)),document.getElementById("level").onmousemove=this.handleMovement.bind(this)}return e.prototype.handleMovement=function(e){this.game.inProgress&&(this.requestedPosition={x:e.offsetX-8,y:e.offsetY-8},this.checkRequestedMove())},e.prototype.tryToStart=function(e){this.game.inProgress||e.offsetX>=0&&e.offsetX<=16&&e.offsetY>=0&&e.offsetY<=16&&this.game.start()},e.prototype.checkRequestedMove=function(){var e=this.game.level.map,t=Math.round(this.requestedPosition.y/32),F=Math.round(this.requestedPosition.x/32);if(e[t]&&e[t][F])switch(e[t][F]){case"0":this.game.end(!0),this.currentPosition={x:0,y:0};break;case"N":this.game.nextLevel(),this.currentPosition={x:0,y:0};break;case"E":this.game.end(),this.currentPosition={x:0,y:0};break;default:this.currentPosition=this.requestedPosition}},e}(),r={one:{name:"one",nextLevel:"two",nextLevelCordinates:{x:24,y:11},map:[["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","F","F","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","F","F","F","F","0","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","F","F","F","F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","F","F","F","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","F","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","F","F","F","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","0","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","0","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0"],["0","F","F","F","F","0","0","0","0","F","F","0","F","F","F","0","0","0","0","0","0","0","F","F","F"],["0","F","F","F","F","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","F","N","F"],["0","F","F","F","F","0","0","0","0","0","0","0","0","F","F","F","F","0","0","0","0","F","F","F","F"],["0","F","F","F","F","F","F","F","F","F","F","F","0","0","0","F","F","0","F","F","F","F","0","0","0"],["0","F","F","F","F","0","0","0","0","0","0","F","F","F","F","F","F","F","F","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","F","F","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]]},two:{name:"two",nextLevel:"three",previousLevel:"one",nextLevelCordinates:{x:8,y:10},map:[["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","F","N","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]]},three:{name:"three",nextLevel:"four",previousLevel:"two",nextLevelCordinates:{x:18,y:14},map:[["F","F","F","F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","F","F","F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","F","F","F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","0","0","F","F","F","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","0","0","F","F","F","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","0","F","F","F","N","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","0","F","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","F","F","F","0","0","0","0","0","0","0","0","0"]]},four:{name:"four",previousLevel:"three",map:[["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["F","F","F","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","F","F","0","0","F","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","F","F","0","0","F","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","F","F","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","F","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","F","E","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","F","F","F","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]]}};F.d(t,"Game",(function(){return s}));var s=function(){function e(){var e=this;this.inProgress=!1,this.assets=new i((function(){e.player=new o(e),e.level=r.one,e.engine=new n(e)}))}return e.prototype.nextLevel=function(){this.inProgress=!1,this.setGameCopy("Level "+this.level.name+" complete... times still ticking... click on the gray box to keep going"),this.level=r[this.level.nextLevel]},e.prototype.start=function(){this.startTime||(this.startTime=Date.now()),this.inProgress=!0,this.setGameCopy("Times ticking... get to the choppa.")},e.prototype.end=function(e){e?this.setGameCopy("You fell into the void... times still ticking, click on the gray box to give it another go."):(this.setGameCopy("It took you "+this.timeToComplete+" seconds. You can do better, click on the gray box to give it another go."),this.level=r.one,this.startTime=null),this.inProgress=!1},e.prototype.setGameCopy=function(e){document.getElementsByClassName("game-copy")[0].innerHTML=e},Object.defineProperty(e.prototype,"timeToComplete",{get:function(){return Math.floor((Date.now()-this.startTime)/1e3)},enumerable:!0,configurable:!0}),e}();new s}]);