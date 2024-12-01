module.exports = {
    transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)', // Include 'axios' for transformation
    ],
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest', // Use Babel for JavaScript/TypeScript files
    },
  };
  