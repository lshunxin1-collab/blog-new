// 🛡️ 本文件由 XingHuiSama 控制台自动生成，请勿手动修改
export interface Photo { url: string; caption?: string; }
export interface Album { id: string; title: string; description: string; cover: string; date: string; photos: Photo[]; }

export const albums: Album[] = [
  {
    "title": "blue archive",
    "cover": "https://bu.dusays.com/2026/08/26/6a8df34a5722f.png",
    "id": "album_1787683949606",
    "photos": [
      {
        "url": "https://bu.dusays.com/2026/08/26/6a8df37ba199c.png"
      },
      {
        "url": "https://bu.dusays.com/2026/08/19/6a85ce97d5dee.jpg"
      },
      {
        "url": "https://bu.dusays.com/2026/08/19/6a85cf79b4581.jpg"
      },
      {
        "url": "https://bu.dusays.com/2026/08/19/6a85cf441f44a.png"
      },
      {
        "url": "https://bu.dusays.com/2026/08/19/6a85ceaa2c436.jpg"
      },
      {
        "url": "https://bu.dusays.com/2026/08/19/6a85ceda88b74.png"
      },
      {
        "url": "https://bu.dusays.com/2026/08/20/6a85df5674868.png"
      },
      {
        "url": "https://bu.dusays.com/2026/08/20/6a85df4af2d7e.jpg"
      }
    ],
    "date": "2026-08-25"
  }
];