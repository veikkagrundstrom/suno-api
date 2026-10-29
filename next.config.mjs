/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ttf|html)$/i,
      type: 'asset/resource'
    });
    return config;
  },
  experimental: {
    serverMinification: false, // the server minification unfortunately breaks the selector class names
    // load the browser automation from node_modules at runtime: bundling it trips on its optional native deps
    serverComponentsExternalPackages: ['rebrowser-playwright-core', 'ghost-cursor-playwright', '@2captcha/captcha-solver', 'electron'],
  },
};  

export default nextConfig;
