module.exports = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.GITHUB_PAGES === 'true' ? '/diabetes-clinical-care' : '',
  images: { unoptimized: true },
  trailingSlash: true,
};
