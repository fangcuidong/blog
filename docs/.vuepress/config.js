module.exports = {
  title: 'fcd\'s web Lib',
  description: 'fcd\'s blog',
  base: '/web-lib/',
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    subSidebar: 'auto',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '导航',
        items: [
          { text: 'Github', link: 'https://github.com/fangcuidong' },
          { text: '掘金', link: 'https://juejin.cn/user/501033035639256/collections' }
        ]
      }
    ],
    sidebar: [
      {
        title: '前端自学路径',
        path: '/',
        collapsable: false, // 不折叠
      },
      {
        title: 'HTML',
        path: '/html/',
        collapsable: false,
        children: [
          { title: 'HTML5语义化', path: '/html/HTML5语义化' }
        ],
      },
      {
        title: 'CSS',
        path: '/css/',
        collapsable: true,
        children: [
          { title: 'CSS常见面试题', path: '/css/CSS常见面试题' },
          { title: 'flex布局', path: '/css/flex布局' },
          { title: 'grid布局', path: '/css/grid布局' },
        ],
      }
    ]
  },
  plugins: [
    // 支持中文文件名
    [
      'permalink-pinyin',
      {
        lowercase: true, // Converted into lowercase, default: true
        separator: '-', // Separator of the slug, default: '-'
      },
    ],
  ]

}