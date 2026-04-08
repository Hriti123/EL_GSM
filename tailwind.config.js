/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3b82f6', // blue-600
                    hover: '#2563eb',   // blue-700
                },
                secondary: {
                    DEFAULT: '#6b7280', // gray-500
                },
                background: '#f9fafb', // gray-50
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
