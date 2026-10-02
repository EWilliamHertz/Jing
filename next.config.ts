import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: [],
  // Allow Next.js HMR inside Cloud Shell environments
  allowedDevOrigins: [
    '3000-cs-553118797525-default.cs-europe-west4-pear.cloudshell.dev',
    'localhost:3000'
  ]
} as any;

export default nextConfig;
