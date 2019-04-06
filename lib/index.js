const { resolve } = require('path')
const { readFileSync } = require('fs')

module.exports = (options, context) => ({
  name: '@uzkk/quiz',

  plugins: [
    ['@vuepress/register-components', {
      components: [
        { name: 'Quiz', path: resolve(__dirname, 'comp') },
      ],
    }],
  ],

  additionalPages () {
    return [{
      title: '东方知识水平测试',
      path: '/quiz/',
      permalink: '/quiz/',
      frontmatter: {
        description: '测试你的本命东方 Project 角色',
        layout: 'Quiz',
        header: {
          banner: false,
        },
      },
    }]
  },

  chainWebpack (config) {
    config.resolve.extensions.merge(['.yml', '.yaml'])

    config.module
      .rule('yaml')
        .test(/\.ya?ml$/)
        .use('js-yaml-loader')
        .loader('js-yaml-loader')
        .end()
  },
})
