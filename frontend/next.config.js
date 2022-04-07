const withPWA = require("next-pwa");
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: ['fine02r4.beget.tech', 'admin.ommo.loc'],
    deviceSizes: [576, 768, 992, 1200, 1400],
    imageSizes: [150, 300, 768, 1024, 1180],
  },

  env: {
    apiKey: "AIzaSyBjalccp6S4l4EF5SLvTwyDbMdVTFgohaE",
    authDomain: "diplom-c6975.firebaseapp.com",
    projectId: "diplom-c6975",
    storageBucket: "diplom-c6975.appspot.com",
    messagingSenderId: "701891855833",
    appId: "1:701891855833:web:81183c7c4884c63d15c5c8"
  },
  sassOptions: {
    includePaths: [
        path.join(__dirname, 'scss')
    ],
  },
}

module.exports = withPWA({
  ...nextConfig,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});