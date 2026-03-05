/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                modelix: {
                    dark: '#1a1025',
                    purple: '#6d28d9',
                    light: '#a78bfa',
                    accent: '#8b5cf6',
                    bg: '#120b18'
                }
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
            }
        },
    },
    plugins: [],
}
