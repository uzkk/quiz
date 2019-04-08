const { resolve } = require('path')
const { readFileSync } = require('fs')

// workaround vuepress #1525
const App = require('@vuepress/core/lib/node/App')
App.prototype.addPage = async function (options) {
  const Page = require('@vuepress/core/lib/node/Page')
  options.permalinkPattern = this.siteConfig.permalink
  const page = new Page(options, this)
  await page.process({
    markdown: this.markdown,
    computed: new this.ClientComputedMixinConstructor(),
    enhancers: this.pluginAPI.getOption('extendPageData').items,
  })
  const index = this.pages.findIndex(({ path }) => path === page.path)
  if (index >= 0) {
    this.pages.splice(index, 1, page)
  } else {
    this.pages.push(page)
  }
}

module.exports = ({
  base = '/quiz/',
}, context) => ({
  name: '@uzkk/quiz',

  plugins: [
    ['@vuepress/register-components', {
      components: [
        { name: 'Quiz', path: resolve(__dirname, 'comp') },
      ],
    }],
  ],

  additionalPages: [{
    title: '东方知识水平测试',
    path: base,
    permalink: base,
    frontmatter: {
      description: '测试你的东方 Project 姿势水平',
      layout: 'Quiz',
    },
  }, {
    title: '关于知识水平测试',
    path: base + 'about.html',
    permalink: base + 'about.html',
    frontmatter: {
      description: '关于知识水平测试',
      layout: 'Post',
      aside: false,
    },
    filePath: resolve(__dirname, 'pages/about.md'),
  }],

  enhanceAppFiles: {
    name: 'uzkk-quiz-base.js',
    content: `export default ({ Vue }) => {
  Vue.prototype.UZKK_QUIZ_BASE = ${JSON.stringify(base)}
}`,
  },
})
