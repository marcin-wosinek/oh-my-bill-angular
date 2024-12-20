import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'webapp',
  webDir: '../dist/webapp',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
