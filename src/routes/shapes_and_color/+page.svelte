<script lang="ts">
  import P5Sketch from 'p5-svelte';
  import type { p5 as p5Type } from 'p5-svelte';

  const sketch = (p5: p5Type) => {
    p5.setup = () => {
      p5.textOutput();
      p5.createCanvas(window.innerWidth, window.innerHeight);
      p5.angleMode(p5.DEGREES);
      p5.background('steelblue');
      p5.strokeWeight(4);
      p5.fill(200, 200, 255);

      // Dark blue
      p5.stroke(20, 20, 100);
      p5.square(20, 20, 100);

      // Dark red
      p5.stroke(100, 20, 20);

      // The rectangle uses the last set fill color,
      // which is light blue, set before drawing the square
      p5.rect(100, 40, 200, 100);

      // Hue, saturation, and brightness values
      // On scales of 0-360°, 0-100%, and 0-100% respectively
      p5.colorMode(p5.HSB);

      // Light green
      p5.fill(120, 70, 90);

      // Dark green
      p5.stroke(120, 60, 30);
      p5.ellipse(540, 100, 300, 100);

      // Dark fuchsia
      p5.fill(300, 90, 30);

      // Draw without lines
      p5.noStroke();
      p5.circle(560, 100, 100);

      // Hue, saturation, and lightness values
      // On scales of 0-360°, 0-100%, and 0-100% respectively
      // This is similar to HSB (above),
      // but whereas 100% brightness is the brightest version of that hue,
      // 100% lightness is always white.
      p5.colorMode(p5.HSL);

      // Light green
      p5.fill(120, 70, 90);

      // Dark green
      p5.stroke(120, 60, 30);
      p5.arc(540, 100, 300, 100, 180, 360, p5.CHORD);

      // Save current settings
      p5.push();

      // Switch back to red, green, blue color mode
      p5.colorMode(p5.RGB);

      // Navy blue
      p5.stroke(20, 10, 80);
      p5.line(20, 200, 200, 350);

      // Restore last saved settings
      p5.pop();

      // Because the color settings were saved after drawing the arc
      // and then restored before drawing the triangle,
      // the triangle uses the same settings as the arc
      p5.triangle(250, 350, 350, 200, 450, 350);

      // Hex string
      // This is a set of red, green, blue values
      // Encoded in base 16
      p5.stroke('#EFD8D8');

      // Draw without inner color
      p5.noFill();
      p5.quad(500, 250, 550, 200, 700, 300, 650, 350);
    };

    p5.draw = () => {

    };
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
