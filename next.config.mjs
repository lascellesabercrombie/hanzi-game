/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/practice',
                permanent: true,
            },
        ]
    },
};
export default nextConfig;
