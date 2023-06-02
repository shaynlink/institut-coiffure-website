const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src example.com;
  style-src 'self' fonts.googleapis.com;
  font-src 'self';
`


module.exports = [
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on'
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block'
    },
    {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN'
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff'
    },
    {
      key: 'Referrer-Policy',
      value: 'origin-when-cross-origin'
    },
    // {
    //     key: 'Content-Security-Policy',
    //     value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
    // }
]
module.exports.ContentSecurityPolicy = ContentSecurityPolicy;
