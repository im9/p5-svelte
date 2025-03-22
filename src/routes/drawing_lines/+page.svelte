<script lang="ts">
  import P5Sketch from 'p5-svelte';
  import type { p5 as p5Type } from 'p5-svelte';

  const sketch = (p5: p5Type) => {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
      p5.background(255);
      p5.strokeWeight(10);
      p5.colorMode(p5.HSB);
      p5.describe('A blank canvas where the user draws by dragging the mouse');
    };

    p5.draw = () => {

    };

    p5.mouseDragged = () => {
      let lineHue = p5.mouseX - p5.mouseY;
      p5.stroke(lineHue, 90, 90);
      p5.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);
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
