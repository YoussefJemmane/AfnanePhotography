import Navbar from '@/components/Navbar'
import Slider from '@/components/Slider'
import { Style } from '@/components/Style'

export default function Home() {
  return (
    <>

      <Navbar />
      <div className='relative' >
      <Slider />
      <Style />

      </div>
    </>
  )
}
