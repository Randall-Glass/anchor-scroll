/*-----------------------------------------------------------------------------------

The MIT License (MIT)

Copyright (c) 2014 Benjamin De Cock

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

------------------------------------------------------------------------------------ */
/* "anchor scrolling library */

/* "Tried to make it more cross browser compatible */

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame || 
          window.oRequestAnimationFrame || 
          window.msRequestAnimationFrame || 
          function(callback, element){
            window.setTimeout(callback, 1000 / 60);
          };
})();


	function getDocHeight() {
	var body = document.body,
    html = document.documentElement;
	return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	}
	
document.addEventListener("DOMContentLoaded", function() {
  "use strict"

  
  var links = document.querySelectorAll("a.scroll")
  var i = links.length

  var easeInOutCirc = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	t -= 2;
	return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
	}

  while (i--) 
    links.item(i).addEventListener("click", function(e) {
      var startTime
      var startPos = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop ;
      var endPos = document.getElementById(/[^#]+$/.exec(this.href)[0]).getBoundingClientRect().top
      var maxScroll = getDocHeight() - window.innerHeight
	  var scrollEndValue = startPos + endPos < maxScroll ? endPos : maxScroll - startPos
      var duration = 3000
      var scroll = function(timestamp) {
	    var d = new Date();
		var NewTime = d.getTime(); 
		startTime = startTime || NewTime
        var elapsed = NewTime - startTime
        var progress = easeInOutCirc(elapsed, startPos, scrollEndValue, duration)
        window.scrollTo(0,progress)
        elapsed < duration && requestAnimFrame(scroll)
      }   
      requestAnimFrame(scroll)
      e.preventDefault()
    }) 
})
