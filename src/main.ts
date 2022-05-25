import * as core from '@actions/core'
import * as semver from '@semver'


async function run(): Promise<void> {
  try {
    const tag: string = core.getInput('tag')
    core.debug(`Received ${tag} for parsing`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    // Remove pixel marker from tag string: 8.1.3-fpm-bullseye_2
    const ut: string = tag.split('_')[0]
    core.debug(`Upstream tag: ${ut}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    // Parse exiting tag to SemVer object
    const sm: SemVer = semver.parse(ut, { loose: true })
    const release: string = sm.prerelease().split('-')[1]

    core.setOutput('pft', tag)
    core.setOutput('ut', ut)

    // Create output for 8.1.3 and 8.1
    core.setOutput('mmp', `${ sm.major }.${ sm.minor }.${ sm.patch }`)
    core.setOutput('mm',  `${ sm.major }.${ sm.minor }`)

    // Create tags 8.1.3-bullseye and 8.1-bullseye
    core.setOutput('mmpr', `${ sm.major }.${ sm.minor }.${ sm.patch }-${ release }`)
    core.setOutput('mmr',  `${ sm.major }.${ sm.minor }-${ release }`)

    // Output image debian release
    core.setOutput('release', release)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
