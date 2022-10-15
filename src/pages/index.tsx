import type { ReactNode, ReactElement } from 'react'
import React, { useEffect } from 'react'
import Head from '@docusaurus/Head'
import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

// import CodeBlock from '@theme/CodeBlock'
import Layout from '@theme/Layout'
import GitHubButton from 'react-github-btn'

// import CrossPlatformSVG from '../../static/img/homepage/cross-platform.svg'
import { setupDissectionAnimation } from './animations/_dissectionAnimation'
import { setupHeaderAnimations } from './animations/_headerAnimation'

function Heading({ text }) {
  return <h2 className="Heading">{text}</h2>
}

function ActionButton({ href, type = 'primary', target, children }) {
  return (
    <a className={`ActionButton ${type}`} href={href} target={target}>
      {children}
    </a>
  )
}

function TextColumn({
  title,
  text,
  moreContent
}: {
  title: string
  text: string
  moreContent?: ReactNode
}) {
  return (
    <>
      <Heading text={title} />
      <div dangerouslySetInnerHTML={{ __html: text }} />
      {moreContent}
    </>
  )
}

function HomeCallToAction() {
  return (
    <>
      <ActionButton
        type="primary"
        href={useBaseUrl('opensource-tools/python-common')}
        target="_self"
      >
        Get started
      </ActionButton>
      <ActionButton
        type="secondary"
        // href={useBaseUrl('docs/miscellaneous')}
        href={useBaseUrl('snippets/miscellaneous')}
        target="_self"
      >
        Learn the basics
      </ActionButton>
    </>
  )
}

function GitHubStarButton() {
  return (
    <div className="github-button">
      <GitHubButton
        href="https://github.com/zhuyudong/universal"
        data-icon="octicon-star"
        data-size="large"
        aria-label="Star zhuyudong/universal on GitHub"
      >
        Star
      </GitHubButton>
    </div>
  )
}

export function Section({
  element = 'section',
  children,
  className,
  background = 'light'
}: {
  element?: ReactElement
  className?: string
  background?: string
  children?: ReactNode
}) {
  const El = element
  return (
    <El
      className={
        className
          ? `Section ${className} ${background}`
          : `Section ${background}`
      }
    >
      {children}
    </El>
  )
}

function TwoColumns({ columnOne, columnTwo, reverse }) {
  return (
    <div className={`TwoColumns ${reverse ? 'reverse' : ''}`}>
      <div className={`column first ${reverse ? 'right' : 'left'}`}>
        {columnOne}
      </div>
      <div className={`column last ${reverse ? 'left' : 'right'}`}>
        {columnTwo}
      </div>
    </div>
  )
}

function ScreenRect({
  className,
  fill,
  stroke
}: {
  className?: string
  fill?: string
  stroke?: string
}) {
  return (
    <rect
      className={`screen ${className || ''}`}
      rx="3%"
      width="180"
      height="300"
      x="-90"
      y="-150"
      fill={fill}
      stroke={stroke}
    />
  )
}

function LogoAnimation() {
  return (
    <svg
      className="LogoAnimation init"
      width={350}
      height={350}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-200 -200 400 400"
    >
      <title>React Logo</title>
      <clipPath id="screen">
        <ScreenRect fill="none" stroke="gray" />
      </clipPath>
      <rect
        x="-25"
        y="120"
        width="50"
        height="25"
        rx="2"
        fill="white"
        stroke="none"
        className="stand"
      />
      <polygon
        points="-125,90 125,90 160,145 -160,145"
        fill="white"
        stroke="white"
        strokeWidth="5"
        strokeLinejoin="round"
        className="base"
      />
      <ScreenRect className="background" stroke="none" />
      <g clipPath="url(#screen)" className="logo">
        <g className="logoInner">
          <circle cx="0" cy="0" r="30" fill="#61dafb" />
          <g stroke="#61dafb" strokeWidth="15" fill="none" id="logo">
            <ellipse rx="165" ry="64" />
            <ellipse rx="165" ry="64" transform="rotate(60)" />
            <ellipse rx="165" ry="64" transform="rotate(120)" />
          </g>
        </g>
        <line
          x1="-30"
          x2="30"
          y1="130"
          y2="130"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          className="speaker"
        />
      </g>
      <ScreenRect fill="none" stroke="white" />
    </svg>
  )
}

function HeaderHero() {
  return (
    <Section background="dark" className="HeaderHero">
      <div className="socialLinks">
        <GitHubStarButton />
      </div>
      <TwoColumns
        reverse
        columnOne={<LogoAnimation />}
        columnTwo={
          <>
            <h1 className="title">Documatation</h1>
            <p className="tagline">Learn once, write&nbsp;anywhere.</p>
            <div className="buttons">
              <HomeCallToAction />
            </div>
          </>
        }
      />
    </Section>
  )
}

function Development() {
  return (
    <Section className="NativeDevelopment" background="light">
      <TwoColumns
        reverse
        columnOne={<TextColumn title="" text="" />}
        columnTwo={
          <div className="dissection">
            {[0, 1, 2, 3].map(i => (
              <img
                alt=""
                key={i}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                src={useBaseUrl(`img/homepage/dissection/${i}.png`)}
              />
            ))}
          </div>
        }
      />
    </Section>
  )
}

/* Community */

function AppList() {
  const { siteConfig } = useDocusaurusContext()
  const apps = Object.values(siteConfig.customFields.users)
    .flat()
    .filter(app => app.pinned)

  return (
    <ul className="AppList">
      {apps.map((app, i) => {
        const imgSource = !app.icon.startsWith('http')
          ? // eslint-disable-next-line react-hooks/rules-of-hooks
            useBaseUrl('img/showcase/' + app.icon)
          : app.icon
        return (
          <li key={i} className="item">
            {app.infoLink ? (
              <a href={app.infoLink}>
                <img src={imgSource} alt={app.name} />
              </a>
            ) : (
              <img src={imgSource} alt={app.name} />
            )}
          </li>
        )
      })}
    </ul>
  )
}

const useHomePageAnimations = () => {
  useEffect(() => setupHeaderAnimations(), [])
  useEffect(() => setupDissectionAnimation(), [])
}

function Index() {
  useHomePageAnimations()
  return (
    <Layout
      description="A framework for building native apps using React"
      wrapperClassName="homepage"
    >
      <Head>
        <title>Documatation · Learn once, write anywhere</title>
        <meta
          property="og:title"
          content="Documatation · Learn once, write anywhere"
        />
        <meta
          property="twitter:title"
          content="Documatation · Learn once, write anywhere"
        />
      </Head>
      <HeaderHero />
      <Development />
    </Layout>
  )
}

export default Index
