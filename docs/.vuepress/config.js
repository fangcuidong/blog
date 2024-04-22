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
        text: '前端框架',
        items: [
          { text: 'Vue', link: 'https://cn.vuejs.org/' },
          { text: 'React', link: 'https://react.dev/' },
          { text: 'Angular', link: 'https://angular.io/' },
          {
            text: '跨端',
            items: [
              { text: 'uni-app', link: 'https://uniapp.dcloud.net.cn/' },
              { text: 'taro', link: 'https://docs.taro.zone/docs/' },
              { text: 'React Native', link: 'https://reactnative.dev/' },
              { text: 'Flutter', link: 'https://flutter.dev/' },
              { text: 'Electron', link: 'https://www.electronjs.org/zh/' },

            ]
          },
          {
            text: '微前端',
            items: [
              { text: 'single-spa', link: 'https://single-spa.js.org/' },
              { text: 'qiankun', link: 'https://qiankun.umijs.org/' },
              { text: '无界', link: 'https://wujie-micro.github.io/doc/' },
              { text: 'Micro-App', link: 'https://micro-zoe.github.io/micro-app/' },
            ]
          },
        ]
      },
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
      },
      {
        title: '常见面试题',
        path: '/interview/list',
        collapsable: false, // 不折叠
      },
      {
        title: 'TypeScript基础',
        path: 'TypeScript/TypeScript基础',
      },
      {
        title: 'React',
        path: 'react/React 官方教程.md',
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
};