import React from 'react'
import { useAuth } from '../../context/auth'
import FilledButton from '../../components/ui/FilledButton/filledButton';
import './styles.scss'

const HomePage = () => {
  
  const auth = useAuth();

  return (
    <div className='-mt-7'>
      <div className='grid grid-cols-4 gap-0'>
        <div className='p-7 pl-10 text-left border-r-2 border-zinc-100/50 h-screen'>
          <div className='left-grid-heading mb-5'>
            <p className='font-bold leading-10'>Recent workouts</p>
            <FilledButton text={'+ Add New'}/>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis adipisci error neque, unde in recusandae quasi, quisquam obcaecati nostrum eius nam dolores blanditiis possimus minus eveniet dolor tenetur enim expedita.</p>
        </div>
        <div className='col-span-2 text-left p-7'>
          <p className='text-4xl mb-2'>The home for all things fitness</p>
          <p className='text-gray-500'>Welcome to your personal dashboard, where you can find an introduction to the tools and services myFit has to offer to help you on your fitness journey</p>
        </div>
        <div className='p-7 text-left'>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum iste nemo beatae incidunt omnis iure, rem doloribus cum ad! Quos sapiente non repellendus aspernatur sed dignissimos consectetur ut totam! Adipisci?</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage