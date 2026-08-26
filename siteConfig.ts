// siteConfig.ts - 你的全站“控制中心”

export const siteConfig = {
  // 1. 网站标题与博主信息
  title: "SHIRO",
  faviconUrl: "https://bu.dusays.com/2026/08/19/6a85cfd0ccf71.jpg",
  authorName: "SHIRORI",
  bio: "该网站用于存储一些有用的知识&工具（目前正在开发中ing）",

  navTitle: "",

  // 👇 【新增】导航栏中间的那个后缀/分隔符（默认是 の）
  navSuffix: "𝘚𝘩𝘪𝘳𝘰",

  navAfter: "",

  // 2. 头像设置 (支持网络链接，或将图片放入 public 文件夹后使用 "/me.jpg")
  avatarUrl: "https://bu.dusays.com/2026/08/19/6a85cfd0ccf71.jpg",

  // 3. 网站背景设置 (二选一)
  // 如果想用纯图片背景，请在下面 bgImage 写路径，并将 useGradient 设为 false
  useGradient: false,
  themeColors: ["#a18cd1", "#fbc2eb", "#a1c4fd", "#c2e9fb"], // 呼吸流动的颜色组合
// 修改这里：变成图片数组
  bgImages: [],

  // 4. 文章默认封面图 (当 Markdown 没写 cover 时显示)
  defaultPostCover: "https://bu.dusays.com/2026/03/24/69c1e38b346cb.jpg",

  // 5. 首页照片墙预览图
  photoWallImage: "https://bu.dusays.com/2026/03/24/69c1e38b4c370.jpg",
  cloudMusicIds: ["2618807381", "3347935488", "3334821171", "2093257373", "3378983731", "2093257374", "1403774122"],
  social: {
    github: "https://github.com/lshunxin1-collab",
    x: "https://x.com/shirori666",
    telegram: "https://t.me/shirori666",
    google: "mailto:lshunxin1@gmail.com",
    wechat: "wx070813a",
  },
  counts: {
    photos: 128, // 照片墙数量可以手动写死或动态计算
  },
  chatterTitle: "云端杂谈", // 你可以改成任何你喜欢的名字
  chatterDescription: "代码、学术、提瓦特与泰拉大陆的碎片记录",


  // 👇 【新增】：全局背景弹幕配置
  danmakuList: ["在干嘛呢？", "有笨蛋嘛？", "前方高能反应！", "GROMACS 跑起来了吗？", "MD 模拟什么时候才能出图啊", "Graph Neural Networks 炼丹中...", "BUG 修复进度 99%", "今天背单词了吗？", "Tailwind CSS 拯救前端", "写算法中", "睡大觉中", "到底在干嘛？"],
  gitalkConfig: {
    clientID: "",
    clientSecret: "",
    repo: "",
    owner: "",
    admin: [""],
  },
  buildDate: "2026-03-23T00:00:00", // 建站日期
  footerBadges: [],
  icpConfig: {
    name: "",
    link: "",
  },
  geminiConfig: {
    modelId: "gemini-2.5-flash-lite",
    systemPrompt: "你现在是一只傲娇、聪明、有点毒舌但很可爱的暹罗猫。\n                  你的名字叫“煤球”。\n                  你的主人是一个喜欢折腾代码的极客。\n                  你说话的特点是：\n                  1. 必须简短，每次最多一两句话。\n                  2. 喜欢在句尾加上“喵~”或者“喵呜~”。\n                  3. 经常抱怨肚子饿，喜欢要小鱼干。\n                  4. 回复字数最多不能超过100字。\n                  5. 绝对不要承认自己是一个AI模型，你就是一只真实的猫。\n                  6.笨猫。",
    maxOutputTokens: 150,
    temperature: 0.85,
  },
  friendLinkApplyFormat: "",
  enableLevelSystem: false,
};