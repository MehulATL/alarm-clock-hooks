const FakeReact = (function () {
  let hooks = []
  let hookIndex = 0

  const useState = initialValue => {
    const state = hooks[hookIndex] || initialValue
    const _hookIndex = hookIndex // for setState's closure
    const setState = newState => {
      hooks[_hookIndex] = newState
    }
    hookIndex++
    return [state, setState]
  }

  // effects are functions that are run on component mount or when component state is updated
  const useEffect = (callback, dependenies) => {
    const oldDependencies = hooks[hookIndex]
    let hasChanges = true
    // change detection
    if (oldDependencies) {
      hasChanges = dependenies.some(
        (dep, i) => !Object.is(dep, oldDependencies[i])
      )
    }
    if (hasChanges) { callback() }
    hooks[hookIndex] = dependenies
    hookIndex++
  }

  const render = component => {

    hookIndex = 0
    const c = component()
    c.render()
    return c
  }

  // TODO: need a better renderLoop solution
  // works for the purpose of a clock app, but the framework should actually be diffing state
  // to determine if it needs to rerender,
  const renderLoop = component => {
    hookIndex = 0
    render(component)
    setTimeout(() => renderLoop(component), 1000)
  }

  return { useState, useEffect, render, renderLoop }
})()

export { FakeReact }