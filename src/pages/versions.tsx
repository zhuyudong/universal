import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Layout from '@theme/Layout'

const versions = require('../../versions.json')

function VersionItem({ version, currentVersion }) {
  const versionName = version === 'next' ? 'Master' : version

  const isCurrentVersion = currentVersion === version
  const isNext = version === 'next'
  const isRC = version.toUpperCase().indexOf('-RC') !== -1

  const latestMajorVersion = versions[0].toUpperCase().replace('-RC', '')
  const documentationLink = (
    <a
      href={useBaseUrl(
        'docs/' + (isCurrentVersion ? '' : version + '/') + 'miscellaneous'
      )}
    >
      Documentation
    </a>
  )
  let releaseNotesURL = 'https://github.com/zhu yu dong/releases'
  let releaseNotesTitle = 'Changelog'
  if (isNext) {
    releaseNotesURL = `https://github.com/zhuyudong/universal/compare/${latestMajorVersion}-stable...main`
    releaseNotesTitle = 'Commits since ' + latestMajorVersion
  } else if (!isRC) {
    releaseNotesURL = `https://github.com/zhuyudong/universal/releases/tag/v${version}.0`
  }

  const releaseNotesLink = <a href={releaseNotesURL}>{releaseNotesTitle}</a>

  return (
    <tr>
      <th>{versionName}</th>
      <td>{documentationLink}</td>
      <td>{releaseNotesLink}</td>
    </tr>
  )
}

function Versions() {
  const currentVersion = versions.length > 0 ? versions[0] : null
  const latestVersions = ['next'].concat(
    versions.filter(version => version.indexOf('-RC') !== -1)
  )
  const stableVersions = versions.filter(
    version => version.indexOf('-RC') === -1 && version !== currentVersion
  )

  return (
    <Layout title="Versions" wrapperClassName="versions-page">
      <h1>Documatation versions</h1>
      <p>
        Open source Documatation releases follow a monthly release train that is
        coordinated on GitHub through the{' '}
        <a href={'https://github.com/zhuyudong/universal/releases'}>
          <code>kunlun-universal-releases</code>
        </a>{' '}
        repository. At the beginning of each month, a new release candidate is
        created off the <code>main</code> branch of{' '}
        <a href={'https://github.com/zhuyudong/universal'}>
          <code>zhuyudong/universal</code>
        </a>
        . The release candidate will soak for a month to allow contributors like
        yourself to{' '}
        <a href={useBaseUrl('docs/upgrading')}>verify the changes</a> and to
        identify any issues by{' '}
        <a href="https://github.com/zhuyudong/universal/issues">
          writing clear, actionable bug reports
        </a>
        . Eventually, the release candidate will be promoted to stable.
      </p>
      <h2>Next version (Unreleased)</h2>
      <p>
        To see what changes are coming and provide better feedback to React
        Native contributors, use the latest release candidate when possible.
        Changes introduced in a release candidate will have been shipped to
        production Facebook apps for over two weeks by the time the release
        candidate is cut.
      </p>
      <table className="versions">
        <tbody>
          {latestVersions.map(version => (
            <VersionItem
              key={'version_' + version}
              version={version}
              currentVersion={currentVersion}
            />
          ))}
        </tbody>
      </table>
      <h2>Latest version</h2>
      <p>
        The most recent stable version will be used automatically whenever a new
        project is created using the <code>npx react-native init</code> command.
      </p>
      <table className="versions">
        <tbody>
          <VersionItem
            key={'version_' + currentVersion}
            version={currentVersion}
            currentVersion={currentVersion}
          />
        </tbody>
      </table>
      <h2>Previous versions</h2>
      <table className="versions">
        <tbody>
          {stableVersions.map(version => (
            <VersionItem
              key={'version_' + version}
              version={version}
              currentVersion={currentVersion}
            />
          ))}
        </tbody>
      </table>
      <h2>Archived versions</h2>
      <p>
        The documentation for versions below <code>0.60</code> can be found on
        the separate website called{' '}
        <a href="https://kunlun.run/versions">Documatation Archive</a>.
      </p>
    </Layout>
  )
}

export default Versions
