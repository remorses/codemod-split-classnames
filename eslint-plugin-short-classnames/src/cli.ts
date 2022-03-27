import yargs, { CommandModule } from 'yargs'
import fs from 'fs'
import path from 'path'
import { glob as globFn } from 'smart-glob'
import { runRule } from './rules/utils'
import { Opts } from './rules/rule'

import cac from 'cac'

const cli = cac(require('../package.json').name)

export async function runCodemod({ glob, opts = {} as Opts, dryRun = false }) {
    const files = await globFn(glob, {
        absolute: true,
        gitignore: true,
        ignoreGlobs: ['**/node_modules/**', '**/dist/**'],
    })

    const results: string[] = []
    for (let file of files) {
        let source = (await fs.promises.readFile(file)).toString()
        if (file.endsWith('.d.ts')) {
            continue
        }
        const ext = path.extname(file)
        console.info(`=> ${dryRun ? 'Found' : 'Applying to'} [${file}]`)
        source = (await runRule(source, {})) || source
        results.push(source)
        if (!dryRun) {
            await fs.promises.writeFile(file, source, { encoding: 'utf-8' })
        }
    }
    return results
}

cli.command('[glob]', 'Split long classnames')
    .option('--dry', 'Only show what files would be changed', {
        type: ['boolean'],
    })
    .option('--max', 'Max number of characters in a classname')

    .action((glob, args) => {
        // console.log(args)

        if (!glob) {
            console.error('missing required positional argument glob')
            process.exit(1)
        }
        runCodemod({
            glob,
            opts: { maxClassNameCharacters: args.max || undefined },
            dryRun: args.dry,
        })
    })

cli.help()
cli.parse()

// console.log(JSON.stringify(argv, null, 2))
