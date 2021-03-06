#!/usr/bin/env node

var package = require(process.cwd() + '/package.json')
var fs = require('fs')

var dependencies = [package.dependencies, package.devDependencies]
dependencies.forEach(dependenceObj => {
  dependenceObj && Object.keys(dependenceObj).forEach(depName => {
    dependenceObj[depName] = getModulesVersion(depName)
  })
})

fs.writeFile(process.cwd() + '/package.json', JSON.stringify(package, null, 2), function (err) {
  var noticeText = err ? '写入失败: ' + err : '写入成功'
  console.log(noticeText)
})

function getModulesVersion (moduleName) {
  var module = JSON.parse(fs.readFileSync(process.cwd() + '/node_modules/' + moduleName + '/package.json').toString())
  return module.version
}
