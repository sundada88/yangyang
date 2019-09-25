window.addEventListener('touchstart', (e) => {
  let dom = e.target
  let hoverclass
  while (!hoverclass) {
    if (dom.nodeName === 'html') {
      return
    }
    if (!dom.getAttribute) {
      return
    }
    hoverclass = dom.getAttribute('hoverclass')
    if (hoverclass) {
      dom.classList.add(hoverclass)
      dom.addEventListener('touchend', function toggleClass () {
        setTimeout(() => {
          dom.classList.remove(hoverclass)
          dom.removeEventListener('touchend', toggleClass)
        })
      }, false)
    } else {
      dom = dom.parentNode
    }
  }
}, false)
