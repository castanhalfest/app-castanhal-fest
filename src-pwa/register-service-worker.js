import { register } from 'register-service-worker'
import { Notify } from 'quasar'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },
  ready (/* registration */) {
    console.log('Service worker is active.')
  },

  registered (/* registration */) {
    console.log('Service worker has been registered.')
  },

  cached (/* registration */) {
    console.log('Content has been cached for offline use.')
  },

  updatefound (/* registration */) {
    // Notify.create({
    //   message: 'Nova Atualização Disponível!',
    //   icon: 'mdi-cellphone-arrow-down',
    //   closeBtn: 'Atualizar',
    //   timeout: 10000,
    //   type: 'positive',
    //   classes: 'glossy text-white',
    //   onDismiss () {
    //     location.reload(true)
    //   }
    // })
    console.log('New content is downloading.')
  },

  updated (registration) {
    console.log('Updated is avaible.')
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!window.chrome) {
      Notify.create({
        message: 'Nova Atualização Disponível! ',
        icon: 'mdi-cellphone-arrow-down',
        closeBtn: 'Atualizar',
        timeout: 10000,
        type: 'positive',
        classes: 'glossy text-white',
        onDismiss () {
          location.reload(true)
        }
      })
    } else {
      const updateManual = () => {
        registration.update().catch((er) => console.error('Error on update worker', er))
      }
      setInterval(updateManual, 500)
    }
  },

  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },

  error (err) {
    console.error('Error during service worker registration:', err)
  }
})
