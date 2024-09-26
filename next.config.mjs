/** @type {import('next').NextConfig} */
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const nextConfig = {
  plugins: [
    new MiniCssExtractPlugin(),
  ],
};

export default nextConfig;
