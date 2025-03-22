// place files you want to import through the `$lib` alias in this folder.
import p5 from "p5";

declare global {
  interface Window {
	p5: typeof p5;
  }
}

window.p5 = p5;
