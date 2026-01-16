import { randomSeeded } from "@std/random";
import { initWasm, Resvg } from "@resvg/resvg-wasm";

await initWasm(fetch("https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm"));

type Rand = {
  draw: boolean;
  isCircle: boolean;
  color: string;
  bgColor: string;
  size: number;
};

export function generateSvg(rng = Math.random) {
  const cols = 13;
  const rows = 5;

  const SIZE = Math.floor(573 / cols);

  const HUE = Math.floor(rng() * 360);
  const SAT = Math.floor(rng() * 2) * 30;

  const width = cols * SIZE;
  const height = rows * SIZE;
  const cellW = SIZE;
  const cellH = SIZE;

  let i = 0;
  const cache: Record<string, Rand> = {};

  const elements = [];

  // Fisher-Yates shuffle
  const shuffle = <T>(array: T[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const bgshuffle = shuffle([0, 1, 2])[0];

  const bg = `hsl(${HUE}, ${SAT}%, ${20 + bgshuffle * 30}%)`;

  // background（#fff使わず薄グレー）
  elements.push(
    `<rect x="0" y="0" width="${width}" height="${height}" fill="${bg}" />`,
  );

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x0 = c * cellW;
      const y0 = r * cellH;

      const cx = x0 + cellW / 2;
      const cy = y0 + cellH / 2;

      let rand: Rand;

      if (r >= rows / 2 && c >= cols / 2) {
        rand = cache[`${rows - r - 1}-${cols - c - 1}`];
      } else if (r >= rows / 2) {
        rand = cache[`${rows - r - 1}-${c}`];
      } else if (c >= cols / 2) {
        rand = cache[`${r}-${cols - c - 1}`];
      } else {
        const draw = rng() < 0.8;
        if (draw) i++;

        const isCircle = i % 2 === 0;

        const [bg, fg] = shuffle([0, 1, 2]);

        const bgColor = `hsl(${HUE}, ${SAT}%, ${20 + bg * 30}%)`;
        const color = `hsl(${HUE}, ${SAT}%, ${20 + fg * 30}%)`;
        const size = SIZE * 0.57;

        rand = cache[`${r}-${c}`] = { draw, isCircle, color, bgColor, size };
      }

      const bgColor = rand.draw ? rand.bgColor : bg;
      elements.push(
        `<rect x="${cx - SIZE / 2}" y="${cy - SIZE / 2}" width="${
          SIZE + 1
        }" height="${SIZE + 1}" fill="${bgColor}" />`,
      );

      if (!rand.draw) continue;
      const size = rand.size;

      if (rand.isCircle) {
        elements.push(
          `<circle cx="${cx}" cy="${cy}" r="${
            size / 2
          }" fill="${rand.color}" />`,
        );
      } else {
        elements.push(
          `<rect x="${cx - size / 2}" y="${
            cy - size / 2
          }" width="${size}" height="${size}" fill="${rand.color}"  />`,
        );
      }
    }
  }

  const svg =
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${elements.join("\n  ")}
</svg>
`.trim();

  return svg;
}

function fnv1a64(str: string): bigint {
  let hash = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;

  for (let i = 0; i < str.length; i++) {
    hash ^= BigInt(str.charCodeAt(i));
    hash = (hash * prime) & 0xffffffffffffffffn;
  }
  return hash;
}

export function monthSvg(monthId: string): string {
  const rng = randomSeeded(fnv1a64(monthId));
  return generateSvg(rng);
}

export function monthPng(monthId: string): Uint8Array<ArrayBuffer> {
  const svg = monthSvg(monthId);
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 800,
    },
    background: "white",
  });
  const pngData = resvg.render();
  return pngData.asPng() as Uint8Array<ArrayBuffer>;
}
