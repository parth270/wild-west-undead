import { store } from '@/services/store'
import { Provider } from 'react-redux'
import studio from '@theatre/studio'
import '@theatre/core'
import Loader2 from '@/layouts/Loader2'
import extension from '@theatre/r3f/dist/extension'

studio.extend(extension)
studio.initialize()

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Loader2>
        <Component {...pageProps} />
      </Loader2>
    </Provider>
  )
}
