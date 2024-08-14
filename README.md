# Element truncate

this repository explores the possibility of truncating elements with only pure CSS.

This alows for use in SSG components and for better performance and UX on web.

## Progress

1. Calculating elements truncation using JS
  My first instinct to create such truncator was to use JS, measure container, each element and then calculate visible and hidden elements.

    #### flaws: 
    when using framework like Next.js the webpage is loaded immediatelly, but the truncator either flashed all the elements at start or was hidden until calculation finishes.
    Also cannot be used on SSG pages.

2. calculating only the hidden elements, letting browser wrap
  As I was dissatisfied with my previous solution I thought about leveraging CSS flex to do the wrapping part and measure container and each element to calculate remaining element.
  
    #### flaws:
    Although the elements loaded immediatelly, there still was some flashing of remaining indicators which was still a problem.

3. leveraging browser
  After some more thinking, I came up with a better wersion of the previous solution.
  "If I can let the browser do the wrapping, might as well do the indicators". So I came up with the idea to append the remaining elements to each element as such:

    let's imagine we have 5 elements with 3 shown

   `
  (el1) +4 | (el2) +3 | (el3) +2
  ` 

    This would then reintroduce a problem with showing too many indicators, so to mitigate this problem, I shifted every element except first to left with negative margin.
    This basically solved the very problem.

    #### flaws: 
      when the indicator is made clickable, for example with popup, the root for the popup is at the clicked indicator, but when screen is resized and elements wrapped with changed indicator, the popup will be still **based on the clicked indicator, not the current one**.

You can see my last soulution in `src` folder.