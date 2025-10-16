import db from '../db.js';

const insertSection = db.prepare(`
  INSERT INTO single_sections (key, content, updated_at)
  VALUES (@key, @content, CURRENT_TIMESTAMP)
  ON CONFLICT(key) DO UPDATE SET content = excluded.content, updated_at = excluded.updated_at
`);

const sections = [
  {
    key: 'hero',
    content: {
      title: '北京商会',
      subtitle: '连接世界的北京商务平台',
      description: '为会员企业提供全方位的资讯、活动与资源服务，助力北京企业走向全球。',
      ctaText: '加入我们',
      ctaLink: '#contact',
      secondaryCtaText: '了解更多',
      secondaryCtaLink: '#highlights'
    },
  },
  {
    key: 'contact',
    content: {
      phone: '+86 10 1234 5678',
      email: 'contact@beijingchamber.cn',
      address: '北京市朝阳区国际商务中心 20F',
      wechat: 'BJChamber',
      officeHours: '周一至周五 09:00-18:00'
    },
  },
  {
    key: 'about',
    content: {
      mission: '凝聚北京商业力量，共创国际化发展新格局。',
      vision: '成为全国最具影响力的国际化商会组织。',
      values: ['开放', '创新', '协作', '共赢']
    }
  }
];

sections.forEach(({ key, content }) => {
  insertSection.run({ key, content: JSON.stringify(content) });
});

const insertCollection = db.prepare(`
  INSERT INTO collections (collection, title, summary, body, image_url, link, event_date, order_index, visible)
  VALUES (@collection, @title, @summary, @body, @imageUrl, @link, @eventDate, @orderIndex, @visible)
`);

const now = new Date();

const news = [
  {
    title: '北京商会与国际伙伴签署合作协议',
    summary: '推动跨境协作，助力会员企业拓展海外市场。',
    body: '北京商会与多家国际商务协会签署合作协议，旨在构建更紧密的国际合作网络。',
    imageUrl: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80',
    link: '#',
    eventDate: now.toISOString().split('T')[0],
    orderIndex: 0,
    visible: 1,
  },
  {
    title: '会员企业创新成果发布',
    summary: '多家会员企业展示最新科技成果，彰显北京创新实力。',
    body: '在年度创新大会上，会员企业带来了最新的技术突破与商业模式。',
    imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
    link: '#',
    eventDate: now.toISOString().split('T')[0],
    orderIndex: 1,
    visible: 1,
  }
];

news.forEach((item, index) => {
  insertCollection.run({
    collection: 'news',
    title: item.title,
    summary: item.summary,
    body: item.body,
    imageUrl: item.imageUrl,
    link: item.link,
    eventDate: item.eventDate,
    orderIndex: index,
    visible: item.visible,
  });
});

const events = [
  {
    title: '全球市场洞察论坛',
    summary: '解码国际市场趋势，助力企业走出去。',
    body: '论坛邀请多位行业专家分析国际市场最新变化。',
    imageUrl: null,
    link: '#',
    eventDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7).toISOString().split('T')[0],
    orderIndex: 0,
    visible: 1,
  },
  {
    title: '会员圆桌沙龙',
    summary: '搭建会员交流平台，分享成功经验。',
    body: '沙龙采用小规模闭门形式，聚焦企业实际痛点。',
    imageUrl: null,
    link: '#',
    eventDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 21).toISOString().split('T')[0],
    orderIndex: 1,
    visible: 1,
  }
];

events.forEach((item, index) => {
  insertCollection.run({
    collection: 'events',
    title: item.title,
    summary: item.summary,
    body: item.body,
    imageUrl: item.imageUrl,
    link: item.link,
    eventDate: item.eventDate,
    orderIndex: index,
    visible: item.visible,
  });
});

const members = [
  {
    title: '京华科技集团',
    summary: '智能制造与工业互联网领军企业。',
    body: '服务领域覆盖智慧城市、智能制造与工业互联网。',
    imageUrl: 'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=800&q=80',
    link: '#',
    eventDate: null,
    orderIndex: 0,
    visible: 1,
  },
  {
    title: '首都文旅控股',
    summary: '打造文化旅游新名片。',
    body: '整合北京文化与旅游资源，推动城市国际传播。',
    imageUrl: 'https://images.unsplash.com/photo-1529429617124-aee318a6c244?auto=format&fit=crop&w=800&q=80',
    link: '#',
    eventDate: null,
    orderIndex: 1,
    visible: 1,
  }
];

members.forEach((item, index) => {
  insertCollection.run({
    collection: 'members',
    title: item.title,
    summary: item.summary,
    body: item.body,
    imageUrl: item.imageUrl,
    link: item.link,
    eventDate: item.eventDate,
    orderIndex: index,
    visible: item.visible,
  });
});

console.log('Database seeded with demo content');
db.close();

