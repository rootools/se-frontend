{exec} = require 'child_process'
task 'sbuild', 'Build project', ->
  exec 'coffee -c -o js/ src/', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr