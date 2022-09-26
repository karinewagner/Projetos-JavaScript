export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) { 
    event = event || window.event 
    event.preventDefault() 
  
    window.history.pushState({}, "", event.target.href) 
  
    this.handle() 
  }
  
  handle() { 
    const { pathname } = window.location 
    const route = this.routes[pathname] || this.routes[404] 
  
    fetch(route)
    .then(data => data.text()) 
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })

    this.backgroundColor(pathname)
  }

  controlHome() {
    document.body.classList.add('pageHome')
    document.body.classList.remove('pageUniverse')
    document.body.classList.remove('pageExploration')
    document.body.classList.remove('pageError')
  }

  controlUniverse() {
    document.body.classList.add('pageUniverse')
    document.body.classList.remove('pageHome')
    document.body.classList.remove('pageExploration')
    document.body.classList.remove('pageError')
  }

  controlExplore() {
    document.body.classList.add('pageExploration')
    document.body.classList.remove('pageHome')
    document.body.classList.remove('pageUniverse')
    document.body.classList.remove('pageError')
  }

  controlError() {
    document.body.classList.add('pageError')
    document.body.classList.remove('pageExploration')
    document.body.classList.remove('pageHome')
    document.body.classList.remove('pageUniverse')
  }

  backgroundColor(pageColor) {
    if (pageColor == '/') {
      this.controlHome()
    } else if (pageColor == '/universe') {
      this.controlUniverse()
    } else if (pageColor == '/exploration') {
      this.controlExplore()
    } else if (pageColor != '/' || '/universe' || '/exploration') {
      this.controlError()
    }
  }

  information() {
    window.location.pathname = '/universe'
  }
} 