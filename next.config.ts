import type { NextConfig } from 'next'

const nextConfig: NextConfig = {

  // ─── VPS Deployment ──────────────────────────────────────────────────────
  output: 'standalone',
  poweredByHeader: false,
  compress: true,

  // ─── Optimización de Imágenes ────────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  // ─── Transpilación ESM ───────────────────────────────────────────────────
  transpilePackages: ['three'],

  // ─── Optimización de Imports ─────────────────────────────────────────────
  experimental: {
    optimizePackageImports: ['@react-three/drei', 'gsap', 'lenis'],
  },

  // ─── [MEJORA 2] Output File Tracing — WASM Decoders ─────────────────────
  outputFileTracingIncludes: {
    '/**': [
      './node_modules/three/examples/jsm/libs/draco/**',
      './node_modules/three/examples/jsm/libs/basis/**',
      './node_modules/postprocessing/build/**/*.js',
    ],
  },

  // ─── [NUEVO] Turbopack — Next.js 16 default bundler ──────────────────────
  //
  // En Next.js 16, Turbopack es el bundler por defecto tanto para
  // `next dev` como para `next build`. No acepta `webpack.config`
  // directamente — requiere su propia sección `turbopack`.
  //
  // `raw-loader` está en la lista oficial de loaders compatibles
  // con Turbopack y devuelve el contenido del archivo como string,
  // equivalente a `type: 'asset/source'` de webpack.
  //
  // Reglas separadas por extensión (más robusto que brace-expansion
  // con el globset de Rust que usa Turbopack internamente).
  //
  turbopack: {
    rules: {
      '*.glsl': { loaders: ['raw-loader'], as: '*.js' },
      '*.vert': { loaders: ['raw-loader'], as: '*.js' },
      '*.frag': { loaders: ['raw-loader'], as: '*.js' },
      '*.vs':   { loaders: ['raw-loader'], as: '*.js' },
      '*.fs':   { loaders: ['raw-loader'], as: '*.js' },
    },
  },

  // ─── Webpack — fallback explícito (`next dev --webpack`) ─────────────────
  //
  // Se mantiene para el caso de que se use el flag --webpack manualmente.
  // Con `turbopack` configurado arriba, Next.js ya NO lanza el error de
  // "webpack config sin turbopack config".
  //
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vert|frag|vs|fs)$/i,
      type: 'asset/source',
    })
    return config
  },

  // ─── HTTP Headers ─────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cross-Origin-Opener-Policy',   value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy',  value: 'credentialless' },
          { key: 'Strict-Transport-Security',     value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options',               value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options',        value: 'nosniff' },
          { key: 'Referrer-Policy',               value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',            value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-DNS-Prefetch-Control',        value: 'on' },
        ],
      },
      {
        source: '/models/:path*.glb',
        headers: [
          { key: 'Content-Type',               value: 'model/gltf-binary' },
          { key: 'Cache-Control',               value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/models/:path*.gltf',
        headers: [
          { key: 'Content-Type',               value: 'model/gltf+json' },
          { key: 'Cache-Control',               value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/textures/:path*.ktx2',
        headers: [
          { key: 'Content-Type',               value: 'image/ktx2' },
          { key: 'Cache-Control',               value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/hdri/:path*',
        headers: [
          { key: 'Content-Type',               value: 'application/octet-stream' },
          { key: 'Cache-Control',               value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/hdri/:path*.exr',
        headers: [
          { key: 'Content-Type',               value: 'image/x-exr' },
          { key: 'Cache-Control',               value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/:path*.wasm',
        headers: [
          { key: 'Content-Type',               value: 'application/wasm' },
          { key: 'Cache-Control',               value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ]
  },
}

export default nextConfig