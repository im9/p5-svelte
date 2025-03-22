<script lang="ts">
	import type { MediaElement } from 'p5';
  import P5Sketch from 'p5-svelte';
  import type { p5 as p5Type } from 'p5-svelte';

  let video: MediaElement;
  let displaceColors;
  let playing = false;

  let displaceColorsSrc = `
    precision highp float;

    uniform sampler2D tex0;
    varying vec2 vTexCoord;

    vec2 zoom(vec2 coord, float amount) {
      vec2 relativeToCenter = coord - 0.5;
      relativeToCenter /= amount; // Zoom in
      return relativeToCenter + 0.5; // Put back into absolute coordinates
    }

    void main() {
      // Get each color channel using coordinates with different amounts
      // of zooms to displace the colors slightly
      gl_FragColor = vec4(
        texture2D(tex0, vTexCoord).r,
        texture2D(tex0, zoom(vTexCoord, 1.05)).g,
        texture2D(tex0, zoom(vTexCoord, 1.1)).b,
        texture2D(tex0, vTexCoord).a
      );
    }
  `;

  const sketch = (p5: p5Type) => {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
      video = p5.createVideo(['/video/fingers.mov']);
      video.hide();

      displaceColors = p5.createFilterShader(displaceColorsSrc);
    };

    p5.draw = () => {
      p5.describe(
        'Two videos in the top right and bottom center of the canvas, with the text "Click the canvas to start and pause the video feed." in the top left corner.'
      );
      p5.background(240);

      // Add instructional text to the top right of the canvas.
      p5.textSize(16);
      p5.text('Click the canvas to start and pause the video feed.', 345, 50);

      // Draw the first instance of the video in the canvas.
      p5.image(video, 10, 10);

      // Add a gray filter to the existing elements on the canvas.
      p5.filter(p5.GRAY);

      // Draw the second instance of the video.
      p5.image(video, 150, 150);

      p5.filter(displaceColors);
    };

    p5.mouseDragged = () => {
      // When the canvas is clicked, check to see if the videos are
      // paused or playing. If they are playing, pause the videos.
      if (playing) {
        video.pause();
      } else {
        // If they are paused, play the videos.
        video.loop();
      }

      // Change the playing value to the opposite boolean.
      playing = !playing;
    }
  };
</script>

<div id="p5div" data-wails-no-drag>
  <P5Sketch {sketch} />
</div>

<style>
#p5div {
	margin: 0;
}
</style>
