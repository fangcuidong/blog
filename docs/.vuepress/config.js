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
    lastUpdated: '上次更新',
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
        collapsable: false,
        children: [
          { title: 'CSS常见面试题', path: '/css/CSS常见面试题' },
          { title: 'BFC', path: '/css/BFC' },
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
    // 最后更新时间
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // moment : JavaScript 日期处理类库 http://momentjs.cn/
          const moment = require('moment');
          moment.locale(lang);
          return moment(timestamp).fromNow();
        }
      }
    ],
  ],
  head: [
    [
      // 访问统计
      'script', {},
      `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?84ac11f5508e341c55b40f45c7b2cbec";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `
    ]
  ]
}