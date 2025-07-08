// @ts-nocheck
export default defineNuxtPlugin(() => {
  const router = useRouter()
  
  const initPcoded = () => {
    if (process.server) return
    
    if (typeof window !== 'undefined' && (window as any).feather) {
      (window as any).feather.replace()
    }
    
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).bootstrap) {
        const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
        dropdownElementList.forEach(dropdownToggleEl => {
          try {
            new (window as any).bootstrap.Dropdown(dropdownToggleEl)
          } catch (error) {
            console.log('Error initializing dropdown:', error)
          }
        })
      }
    }, 200)
    
    const sidebar_hide = document.querySelector('#sidebar-hide')
    if (sidebar_hide) {
      sidebar_hide.addEventListener('click', function () {
        if (document.querySelector('.pc-sidebar')?.classList.contains('pc-sidebar-hide')) {
          document.querySelector('.pc-sidebar')?.classList.remove('pc-sidebar-hide')
        } else {
          document.querySelector('.pc-sidebar')?.classList.add('pc-sidebar-hide')
        }
      })
    }
    
    const mobile_collapse = document.querySelector('#mobile-collapse')
    if (mobile_collapse) {
      mobile_collapse.addEventListener('click', function () {
        var temp_sidebar = document.querySelector('.pc-sidebar')
        if (temp_sidebar) {
          if (document.querySelector('.pc-sidebar')?.classList.contains('mob-sidebar-active')) {
            
            if (typeof (window as any).rm_menu === 'function') {
              (window as any).rm_menu()
            }
          } else {
            document.querySelector('.pc-sidebar')?.classList.add('mob-sidebar-active')
            document.querySelector('.pc-sidebar')?.insertAdjacentHTML('beforeend', '<div class="pc-menu-overlay"></div>')
            document.querySelector('.pc-menu-overlay')?.addEventListener('click', function () {
              if (typeof (window as any).rm_menu === 'function') {
                (window as any).rm_menu()
              }
            })
          }
        }
      })
    }
    
    if (typeof (window as any).menu_click === 'function') {
      (window as any).menu_click()
    }
    
    const elem = document.querySelectorAll('.pc-sidebar .pc-navbar a')
    for (var l = 0; l < elem.length; l++) {
      var pageUrl = window.location.href.split(/[?#]/)[0]
      const linkElement = elem[l] as HTMLAnchorElement
      if (linkElement.href == pageUrl && linkElement.getAttribute('href') != '') {
        const parentNode = linkElement.parentNode as HTMLElement
        const grandParent = parentNode?.parentNode as HTMLElement
        const greatGrandParent = grandParent?.parentNode as HTMLElement
        const greatGreatGrandParent = greatGrandParent?.parentNode as HTMLElement
        const greatGreatGreatGrandParent = greatGreatGrandParent?.parentNode as HTMLElement
        
        if (parentNode) parentNode.classList.add('active')
        if (greatGrandParent) greatGrandParent.classList.add('pc-trigger')
        if (greatGrandParent) greatGrandParent.classList.add('active')
        if (grandParent) grandParent.style.display = 'block'
        if (greatGreatGreatGrandParent) greatGreatGreatGrandParent.classList.add('pc-trigger')
        if (greatGreatGrandParent) greatGreatGrandParent.style.display = 'block'
      }
    }
  }
  
  router.afterEach(() => {
    nextTick(() => {
      initPcoded()
    })
  })
  
  onMounted(() => {
    initPcoded()
  })
}) 