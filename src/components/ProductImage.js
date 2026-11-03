// Placeholder garment illustration tinted with the selected color.
// Swap for real <Image> photos once you have product photography.
const SHAPES = {
  top: "M72 34 Q100 50 128 34 L162 46 L188 176 L168 182 L148 86 L148 222 L52 222 L52 86 L32 182 L12 176 L38 46 Z",
  tee: "M72 34 Q100 52 128 34 L168 52 L186 100 L156 112 L148 94 L148 222 L52 222 L52 94 L44 112 L14 100 L32 52 Z",
  shirt: "M74 30 L100 44 L126 30 L164 44 L190 184 L170 190 L150 92 L150 232 L50 232 L50 92 L30 190 L10 184 L36 44 Z",
  pants: "M56 22 L144 22 L160 228 L116 228 L100 86 L84 228 L40 228 Z",
};

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.max(0, Math.min(255, v + amt));
  return `rgb(${c(n >> 16)}, ${c((n >> 8) & 255)}, ${c(n & 255)})`;
}

export default function ProductImage({ shape = "top", color = "#cccccc", label }) {
  const stripe = /stripe/i.test(label || "");
  const line = shade(color, -40);
  const id = `p-${shape}-${color.slice(1)}`;
  return (
    <svg viewBox="0 0 200 250" role="img" aria-label={label} className="product-svg">
      <defs>
        <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#f6f4ef" />
          <rect width="4" height="10" fill={color} />
        </pattern>
      </defs>
      <path d={SHAPES[shape] || SHAPES.top} fill={stripe ? `url(#${id})` : color} stroke={line} strokeWidth="1.5" strokeLinejoin="round" />
      {shape === "shirt" && (
        <g stroke={line} strokeWidth="1.5" fill="none">
          <path d="M74 30 L90 60 L100 44 L110 60 L126 30" />
          <line x1="100" y1="44" x2="100" y2="232" />
          {[80, 110, 140, 170, 200].map((y) => (
            <circle key={y} cx="104" cy={y} r="2" fill={line} />
          ))}
        </g>
      )}
      {shape === "pants" && (
        <g stroke={line} strokeWidth="1.5" fill="none">
          <line x1="56" y1="36" x2="144" y2="36" />
          <path d="M96 36 L94 50 M104 36 L106 50" />
        </g>
      )}
      {(shape === "top" || shape === "tee") && (
        <path d="M72 34 Q100 50 128 34" stroke={line} strokeWidth="3" fill="none" />
      )}
    </svg>
  );
}
