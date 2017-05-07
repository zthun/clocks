module.exports = {
  options: {
    npmtag: 'rc',
    commitMessage: 'Release Candidate <%= version %>.  [skip ci]',
    beforeBump: ['default']
  }
};
