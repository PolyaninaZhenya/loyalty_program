const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  env: {
    apiKey: "AIzaSyBjalccp6S4l4EF5SLvTwyDbMdVTFgohaE",
    authDomain: "diplom-c6975.firebaseapp.com",
    projectId: "diplom-c6975",
    storageBucket: "diplom-c6975.appspot.com",
    messagingSenderId: "701891855833",
    appId: "1:701891855833:web:81183c7c4884c63d15c5c8"
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/scss')]
  },
}

module.exports = {
  ...nextConfig,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}