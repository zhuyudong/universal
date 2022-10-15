---
id: typescript-tips
title: 'TypeScript Tips'
description: ''
---

1. 如何定义常见文件类型

> Cannot find module './{filename}.less' or its corresponding type declarations.ts(2307)

```ts
/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable @typescript-eslint/no-namespace */

/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | string
    }
}

declare module '*.avif' {
    const src: string
    export default src
}

declare module '*.bmp' {
    const src: string
    export default src
}

// declare module '*.gif'
declare module '*.gif' {
    const src: string
    export default src
}

// declare module '*.jpg'
declare module '*.jpg' {
    const src: string
    export default src
}

// declare module '*.jpeg'
declare module '*.jpeg' {
    const src: string
    export default src
}

// declare module '*.png'
declare module '*.png' {
    const src: string
    export default src
}

declare module '*.webp' {
    const src: string
    export default src
}

// declare module '*.svg'
declare module '*.svg' {
    import type * as React from 'react'

    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >

    const src: string
    export default src
}

// declare module '*.styl'

// declare module '*.css'
declare module '*.css' {
    const src: string
    export default src
}

declare module '*.module.css' {
    const classes: Readonly<Record<string, string>>
    export default classes
}

// declare module '*.less'
declare module '*.less' {
    const src: string
    export default src
}

declare module '*.module.less' {
    const classes: Readonly<Record<string, string>>
    export default classes
}

// declare module '*.scss'
declare module '*.scss' {
    const src: string
    export default src
}

declare module '*.module.scss' {
    const classes: Readonly<Record<string, string>>
    export default classes
}

// declare module '*.sass'
declare module '*.sass' {
    const src: string
    export default src
}

declare module '*.module.sass' {
    const classes: Readonly<Record<string, string>>
    export default classes
}
```
