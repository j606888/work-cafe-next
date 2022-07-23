This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Design

1. 如果有橫向跨頁，需要多個 Box 各自決定要不要包 Container 嗎？
2. Figma 還沒有主要配色之前(Wireframe) 就單純在各個元件用 sx 上色，最後再用 palatte 就好嗎？
3. 會完全按照上面的 字體大小、長、寬 來做嗎？還是一個參考而已？
4. 看完 Figma 有什麼額外問題或是怎麼配合

## MUI

1. @mui/material vs @mui/system ( 兩個好像都能用 )
2. 官方預設用 roboto, 如果 Design 是用其他種類會有什麼影響
3. 用 MUI 做這些 customize component 是不是不太方便？有什麼優缺點
4. Typography 怎麼挑？（對應 Figma) 會用 palatte 設定嗎？
5. 什麼時候用 styled.div or Box?
6. 什麼時候用 Box or Stack?
7. 什麼時候用 sx or m(margin)/p(padding)
8. 什麼時候查 Components or Components API
9. 第一次使用這個工具時會怎麼了解他？(Official Doc, Youtube)

## React

1. 怎麼拆 Component ( ex: CityList )
2. 顏色切換（ ex: Option )
3. 多個地方會有自己的 Button, 怎麼命名, 還是都是在一個 Button 用參數控制樣式？
4. 怎麼 Mock API? ( json-file or json-server or constant )

## How to build

1. Searchbar customize
2. Next button ( with maybe animations)
3. Any Learning resource?

# 2022/07/23

* After install story book, a lot of warnings
