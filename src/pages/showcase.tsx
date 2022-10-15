import React, { useEffect, useState } from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import ThemedImage from '@theme/ThemedImage'

import IconExternalLink from '../theme/Icon/ExternalLink'
import { Section } from './index'

const renderApp = (app, i) => {
  const imgSource = !app.icon.startsWith('http')
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useBaseUrl('img/showcase/' + app.icon)
    : app.icon

  return (
    <div className="showcase" key={`app-${app.name}-${i}`}>
      <div className="iconBox">
        <img src={imgSource} alt={app.name} className="iconBackground" />
        <img src={imgSource} alt={app.name} className="icon" />
      </div>
      <div className="showcaseContent">
        <div>
          <h3>{app.name}</h3>
          {renderLinks(app)}
        </div>
        {app.infoLink && (
          <a
            className="articleButton"
            href={app.infoLink}
            target="_blank"
            title={app.infoTitle}
            rel="noreferrer"
          >
            Learn more{' '}
            <IconExternalLink width={12} height={12} style={{ opacity: 0.5 }} />
          </a>
        )}
      </div>
    </div>
  )
}

const renderLinks = app => {
  if (!app.linkAppStore && !app.linkPlayStore) {
    return <p />
  }

  const linkAppStore = app.linkAppStore ? (
    <a href={app.linkAppStore} target="_blank" rel="noreferrer">
      iOS
    </a>
  ) : null
  const linkPlayStore = app.linkPlayStore ? (
    <a href={app.linkPlayStore} target="_blank" rel="noreferrer">
      Android
    </a>
  ) : null

  return (
    <p className="showcaseLinks">
      {linkPlayStore}
      {linkPlayStore && linkAppStore ? <span> • </span> : ''}
      {linkAppStore}
    </p>
  )
}

const randomizeApps = apps =>
  apps.filter(app => !app.group).sort(() => 0.5 - Math.random())

function Showcase() {
  // TODO: improve type definition
  const { siteConfig } = useDocusaurusContext() as unknown as {
    siteConfig: {
      customFields: {
        users: Record<
          'meta' | 'microsoft' | 'shopify' | 'others',
          {
            name: string
            icon: string
            linkAppStore: string
            linkPlayStore: string
            pinned: boolean
          }[]
        >
      }
    }
  }

  const { meta, microsoft, shopify, others } = siteConfig.customFields.users
  const [pinnedRandomizedApps, setPinnedRandomizedApps] = useState([])
  const [randomizedApps, setRandomizedApps] = useState([])

  useEffect(() => {
    setRandomizedApps(randomizeApps(others.filter(app => !app.pinned)))
    setPinnedRandomizedApps(randomizeApps(others.filter(app => app.pinned)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout
      title="Showcase"
      description="Thousands of apps are using Documatation, check out these apps!"
    >
      <Section background="dark">
        <div className="sectionContainer headerContainer">
          <h1>
            Who is using <span>Documatation</span>?
          </h1>
          <p>
            Thousands of apps are using Documatation, from established Fortune
            500 companies to hot new startups. If you are curious to see what
            can be accomplished with Documatation, check out these apps!
          </p>
        </div>
      </Section>
      <Section>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Meta logo"
              width={140}
              sources={{
                light: useBaseUrl('/img/meta_positive_primary.svg'),
                dark: useBaseUrl('/img/meta_negative_primary.svg')
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            Documatation is shaping mobile, web, and desktop experiences within
            Meta’s product ecosystem, from Facebook Marketplace, Messenger
            Desktop, Ads Manager to the Oculus companion app and many more.
          </p>
          <div className="logos">{meta.map(renderApp)}</div>
        </div>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Microsoft logo"
              width={180}
              sources={{
                light: useBaseUrl('/img/microsoft-logo-gray.png'),
                dark: useBaseUrl('/img/microsoft-logo-white.png')
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            Microsoft leverages the power of Documatation to deliver excellent
            customer experiences in some of its most well known apps.
            <br />
            Microsoft doesn't stop at mobile platforms either -- Microsoft
            leverages Documatation to target desktop too! Find out more in the{' '}
            <a
              href="https://microsoft.github.io/react-native-windows/resources-showcase"
              target="_blank"
              rel="noreferrer"
            >
              dedicated showcase
            </a>{' '}
            for Documatation Windows and macOS.
          </p>
          <div className="logos">{microsoft.map(renderApp)}</div>
        </div>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Shopify logo"
              width={160}
              sources={{
                light: useBaseUrl('/img/shopify_logo_whitebg.svg'),
                dark: useBaseUrl('/img/shopify_logo_darkbg.svg')
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            All new mobile apps at Shopify are Documatation and we are actively
            migrating our flagship merchant admin app Shopify Mobile to React
            Native as well. You can read more about Documatation development at
            Shopify on our{' '}
            <a
              href="https://shopify.engineering/topics/mobile"
              target="_blank"
              rel="noreferrer"
            >
              blog
            </a>
            .
          </p>
          <div className="logos">{shopify.map(renderApp)}</div>
        </div>
        <div className="showcaseSection showcaseCustomers">
          <h2>Users Showcase</h2>
          <div className="logos">
            {pinnedRandomizedApps.map(renderApp)}
            {randomizedApps.map(renderApp)}
          </div>
        </div>
      </Section>
      <Section background="dark">
        <div className="sectionContainer footerContainer">
          <a
            className="formButton"
            href="https://forms.gle/BdNf3v5hemV9D5c86"
            target="_blank"
            rel="noreferrer"
          >
            Apply to the Showcase by filling out this form
          </a>
          <p>
            A curated list of{' '}
            <a key="demo-apps" href="https://github.com/zhuyudong/universal">
              open source Documatation apps
            </a>{' '}
            is maintained by <a href="https://infinite.red">Infinite Red</a>.
          </p>
        </div>
      </Section>
    </Layout>
  )
}

export default Showcase
