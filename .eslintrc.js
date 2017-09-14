module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "globals": {
        "__BROWSER__": true,
        "__dirname": true,
        "__x": true,
        "global": true,
        "module": true,
        "process": true,
        "require": true,
        "Buffer": true,
        "DocumentTouch": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx"]
            }
        }
    },
    "rules": {
        "eol-last": [
            "error",
            "always"
        ],
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-case-declarations": [
            0
        ],
        "no-empty": [
            "error",
            {
                "allowEmptyCatch": true
            }
        ],
        "no-unused-vars": [
            "error",
            {
                "vars": "all",
                "args": "after-used",
                "ignoreRestSiblings": true
            }
        ],
        "object-curly-spacing": [
            "error",
            "always"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
}
