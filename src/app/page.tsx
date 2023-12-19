import {Footer} from '@/components/Footer'
import Navbar from '@/components/Navbar'
import {Services } from '@/components/Services'
import Slider from '@/components/Slider'
import { Style } from '@/components/Style'

export default function Home() {
  return (
    <>

      <Navbar />
      <div className='relative' >
      <Slider />
      <Style />
      <Services />
      <Footer />
      </div>
    </>
  )
}
