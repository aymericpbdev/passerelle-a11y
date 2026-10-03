/*
|--------------------------------------------------------------------------
| JavaScript entrypoint for running ace commands
|--------------------------------------------------------------------------
|
| DO NOT MODIFY THIS FILE AS IT WILL BE OVERRIDDEN DURING THE BUILD
| PROCESS.
|
| See docs.adonisjs.com/guides/typescript-build-process#creating-production-build
|
| Since, we cannot run TypeScript source code using "node" binary, we need
| a JavaScript entrypoint to run ace commands.
|
| This file registers the "ts-node/esm" hook with the Node.js module system
| and then imports the "bin/console.ts" file.
|
*/

/**
 * Register hook to process TypeScript files using ts-node
 */
import '@poppinss/ts-exec' 
/* Remplacement de 'ts-node-maintained @swc/core' 
poppinss est un compilateur JIT (Just In Time) utilisé uniquement en développement
API Node.js plus moderne et compatible avec Adonisjs 7 et Node 24.x */

/**
 * Import ace console entrypoint
 */
await import('./bin/console.js')
