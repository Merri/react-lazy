module.exports = {
    "extends": "@researchgate/rg-react",
    "parser": "babel-eslint",
    "settings": {
        "import/extensions": [
            ".js",
            ".jsx"
        ],
        "react": {
            "version": "detect"
        }
    },
    "rules": {
        "semi": [
            "error",
            "never"
        ],
        "import/extensions": ["error", "always", { "js": "never", "jsx": "never" }],
        "react/jsx-boolean-value": "never"
    }
}
