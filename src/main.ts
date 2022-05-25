import * as core from '@actions/core'
import * as semver from 'semver'

async function run(): Promise<void> {
  try {
    const tag: string = core.getInput('tag')
    core.debug(`Received ${tag} for parsing`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const ut: string = tag.split('_')[0]
    core.debug(`Upstream tag: ${ut}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const sm: string = semver.parse(ut, { loose: true })

    const mmp: string = `${sm.major}.${sm.minor}.${sm.patch}`
    core.debug(`Upstream tag: ${mmp}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const mmp: string = `${sm.major}.${sm.minor}`
    core.debug(`Upstream tag: ${mm}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.setOutput('pft', tag)
    core.setOutput('ut', ut)
    core.setOutput('mmp', mmp)
    core.setOutput('mm', mm)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
