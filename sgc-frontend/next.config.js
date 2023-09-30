/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    API_URL:"http://localhost:3001/api/",
    CONDUCTOR_IMAGE_URL:"http://localhost:3001/api/assets/conductores/",
    VEHICULO_IMAGE_URL:"http://localhost:3001/api/assets/vehiculos/",

  }
}

module.exports = nextConfig
