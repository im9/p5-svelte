<script lang="ts">
  import { onMount } from 'svelte';
  import P5Sketch from 'p5-svelte';
  import type { p5 as p5Type } from 'p5-svelte';

  let width = 100;
  let height = 100;
  let osc = null

  const sketch = (p5: p5Type) => {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
    };

    p5.draw = () => {
      p5.background(255);
      p5.ellipse(p5.width / 2, p5.height / 2, width, height);
      // osc.stop();
    };
  };

	onMount(async () => {
    if (window !== undefined) {
      await import( "../../lib/index.js");
      await import( "p5/lib/addons/p5.sound");

      osc = new window.p5.Oscillator();
      osc.setType('sine');
    }
	});
</script>

<div id="p5div" data-wails-no-drag>
	<label>
		Width
		<input type="range" bind:value={width} min="100" max="1000" step="0.01" />
		{width}
	</label>

	<label>
		Height
		<input type="range" bind:value={height} min="100" max="1000" step="0.01" />
		{height}
	</label>
  <P5Sketch {sketch} />
</div>

<style>
#p5div {
	margin: 5% auto;
}
</style>
