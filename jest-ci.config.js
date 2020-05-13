module.exports = {
    "roots": [
        "<rootDir>/ClientApp/src"
    ],
    "transform": {
        "^.+\\.(css|scss)$": "./jest-ignore-import.js",
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
    "collectCoverage": true,
    "coverageReporters": ["lcov"],
    "testResultsProcessor": "jest-teamcity-reporter",
    "collectCoverageFrom": [ "**/*.{tsx}" ],
    "setupTestFrameworkScriptFile":"<rootDir>/ClientApp/src/jest.setup.ts"
};