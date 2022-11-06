Notes:

While working on this assessment I encountered a few locations where the provided jpg screens were a little unclear as to the precise size/thickness or some of the smaller components so used my best judgement. Similarly there were locations where objects being aligned by flexible stylings appeared to be a pixel or two off from the mockups, and here I opted to keep things simple rather than making micro-adjustments to every item to fit that specific resolution pixel perfectly to the mockups. Of course in a commercial environment this is a matter I would discuss with the designers before deciding how I should balance flexible stylings against pixel perfect accuracy to the mockups.

In creating the web components I opted against the usage of ShadowDOM, I felt that it was an unnecessary complication for this task as most of the components are site specific so don't really benefit from being excluded from the site style sheets or functionality. Perhaps a couple of the more general components such as CollapsiblePanel could considered site independent and at least not benefit from access to the sites styles, but I think in most cases the CollapsiblePanel contents at least would want access to the site styles so I'm uncertain that would improve things. As such I created the components as regular html custom elements and filled any required html through importing into the class and injecting it.

In a commercial setting with more time investment I feel the first angle for improving this piece would be to go through the SASS and extract some of the more commonly reused styles into mixins in the root.scss file. It's hard to tell with a small sample of screens which parts are reused the most but I feel that would be a good next step if I was to continue working on this, additionally I think the design of the cart does not lend itself well to being opened on a mobile in landscape mode, to cater better to that I think perhaps I'd try rotating the alignment of the flex box to have a horizontal scrolling section for the items covering the page and the buttons currently in the footer on the right hand side.
