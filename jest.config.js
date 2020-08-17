module.exports =  {
    transform: { '^.+\\.tsx?$': 'ts-jest' },
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['dist'],
    collectCoverage: false,
};
