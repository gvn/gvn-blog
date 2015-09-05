---
title: The Tapestrument Revisited
publishDate: 2015-09-02
modifiedDate: 2015-09-04
template: post.jade
collection: posts
tags: projects, arduino, microcontrollers, music, art
---

![The Tapestrument](/blog/img/tapestrument/kitchen.jpg)

A few years back when the Arduino microcontroller began to garner increasing attention among makers I also took notice. Electrical engineering has long both fascinated and frustrated me. When I was very young, I made frequent excursions to Radio Shack and subsequently attempted to cobble projects together from whatever components looked coolest. I never had luck doing much more than making LEDs blink or buzzers sound. Eventually, I discovered programming, which came far more intuitively to me. I left my soldering iron to gather dust and became absorbed in code.

![Closeup of The Tapestrument](/blog/img/tapestrument/closeup.jpg)

The promise of microcontrollers, and Arduino in particular, to bridge the gap between high level programming and the world of electronics is very exciting. I enrolled in a single evening course at a local maker space and became instantly hooked. Arduino felt like an API to the physical world. Suddenly anything electronic could be programmable with endless creative possibilities.

![Schematic](/blog/img/tapestrument/schematic.png)

In July of 2012 I attended "[The Record](http://nasher.duke.edu/therecord)" exhibition at the Henry Art Gallery. It proved massively inspiring and I decided to try and build an instrument of my own design. My initial desire was to create a MIDI controlled turntable that could have its motor speed changed by incoming notes. With this modification I'd be able to play the turntable much like a DJ, but with precise and programmable control. I hoped to be able to compose music for it with standard notation software.

My quasi-rational fear of electrocution dictated that I move to battery powered devices. I settled on modifying a Walkman with the same basic intention: to adjust its playback speed based on incoming MIDI note values. In my mind it would be like a low-budget [Mellotron](https://en.wikipedia.org/wiki/Mellotron).

![Recording drones from the JX-3P. Gaffer tape optional.](/blog/img/tapestrument/synth.jpg)

Over the next month or two I discovered that although the programming side of Arduino is straightforward, the electrical side of the equation is still very challenging for me. Hardware is also much more difficult to work with by nature as there's no easy way to undo changes or revisit saved progress. It was hard to leave the comfort zone of a completely digital workspace. Eventually, I did end up with a working prototype that I dubbed The Tapestrument. To make its "voices" I recorded sustained notes from a JX-3P synthesizer onto cassettes. As a means to indulge my love of alchemy I taped over Yanni and Michael Bolton albums procured from Value Village.

I didn't go much further than getting my prototype to the point that [I could play it with a keyboard](https://vimeo.com/53477991). Achieving precise control over its motor speed in order to tune the notes proved quite difficult. At best I had a microtonal, monophonic instrument. Still, I found it to be a valuable exercise in indulging a creative hypothesis. Microcontrollers are a huge leap in terms of making circuitry more accessible, but they aren't going to invalidate a deeper understanding of the science of electrical engineering.

Recently, I discovered that someone else built a [similar instrument](http://www.crudlabs.org/?section=crudman) with superior results, which is wonderful to behold. I still hope to see a MIDI controlled turntable emerge at some point. For now I'll just keep my eyes open and maybe even try building one again!


#### Related Links
- [Video : Beta 1](https://vimeo.com/51502871)
- [Video : Beta 2](https://vimeo.com/53477991)
- [Source Code](https://github.com/gvn/tapestrument)
- [PDF : Deck from Seattle ID](https://github.com/gvn/seattle-id/raw/master/11.14.12/gvn-tapestrument.pdf)
