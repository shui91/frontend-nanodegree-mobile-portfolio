Webpage Optimization Project - Sherman Hui

** FOR UDACITY CODE REVIEWERS: For Pagespeed Insight Test and Timeline Tests - USE dist/index.html and dist/views/pizza.html **

** FOR UDACITY CODE REVIEWERS: If code review is needed; use html files in src/ to review un-uglified code, BUT the css won't be applied correctly because the JS in perfmatters.js that loads the CSS files after pageload uses "style.min.css", remove .min to have the src code work correctly for review **

-- Pagespeed Insight Optimizations --

Sat. Jul 11/2015 Mobile: [Pagespeed Score: 93/100, User Experience: 100/100], Desktop: [Pagespeed Score: 95/100, User Experience 100/100]

1. Inlined critical CSS 
2. Deferred loading CSS until page is fully loaded using JS
3. Included media queries to print.css so it's only used when the user is printing the page
4. Made slight CSS optimizations by generalizing style changes in style.css and inlined the critical styles as mentioned above
5. Moved JS links to the bottom of html files to defer retrieval and loading
6. Added Async tags to asynchronously load JS
7. Removed dependancy on google fonts 
8. Minified html and css files, uglified js files
9. Using grunt, minimized and optimized all photo assets
10. Moved Analytics into perfmatters.js because it isn't a critical asset and improves pagespeed

-- 60FPS Optimizations -- 

1. As per inclass instructions removed old dx function in favour of more succinct function that changes pizza width with respect to %
2. Removed class selections from within loops, as it only needs to be done once.
3. Removed use of querySelectorAll in favor of getElementByClassName or getElementById because these are more efficient
4. Implemented requestAnimationFrame to debounce scrolling; tutorial from html5rocks.com/e/tutorials/speed/animations/ 
	- this ensures rAF only calls updatePositions on scroll, otherwise updatePositions is not run
5. Removed usage of scrollTop because of it's inefficiency, replaced with caching current scroll positions
6. Implemented usage of transform/translateX because style.left was much more costly to use
7. Added additional CSS properties, such as translate3d, translateZ, and backface-visibility, to enable hardware acceleration to improve render times
8. Edited addEventListener to activate onScroll instead of updatePositions to improve script times since onScroll is only run when the user scrolls
9. Lowered the number of moving pizzas in the background to 35 to improve render times as this seems to be the maximum amount of pizzas that appear on screen.
10. Minor improvement of removing "var" within loops and setting the variables outside of loop so that it's not being created within the loop multiple times.