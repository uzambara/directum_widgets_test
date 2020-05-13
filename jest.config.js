module.exports = {
    globals: {
        'ts-jest': {
            diagnostics: false
        }
    },
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.(css|scss|png|jpg|gif|svg|webp)$": "./jest-ignore-import.js",
        "^.+vmsg.js$": "./jest-ignore-import.js",
        "^.+\\.tsx?$": "ts-jest"
    },
    "transformIgnorePatterns":[],
    "testRegex": "(/__tests__/.*(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "collectCoverage": false,
    "coverageReporters": ["text", "text-summary"],
    "setupFilesAfterEnv": ["<rootDir>/src/jest.setup.ts"]
};