import React from 'react'
import { useAuth } from '../../context/auth'
import FilledButton from '../../components/ui/FilledButton/filledButton';
import './styles.scss'

const HomePage = () => {
  
  const auth = useAuth();

  return (
    <div className='-mt-7'>
      <div className='grid grid-cols-4 gap-0'>
        <div className='p-7 pl-10 text-left border-r-1 h-screen bg-neutral-800'>
          <div className='left-grid-heading mb-5 items-center'>
            <p className='font-bold leading-10'>Recent workouts</p>
            <div>
              <FilledButton text={'+ Add New'} py={'py-1'} textSize={'text-sm'} textWeight={'font-normal'}/>
            </div>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis adipisci error neque, unde in recusandae quasi, quisquam obcaecati nostrum eius nam dolores blanditiis possimus minus eveniet dolor tenetur enim expedita.</p>
        </div>
        <div className='col-span-2 text-left p-7'>
          <p className='text-3xl mb-2'>The home for all things fitness</p>
          <p className='text-gray-500 mb-10'>Welcome to your personal dashboard, where you can find an introduction to the tools and services myFit has to offer to help you on your fitness journey</p>
          <p className='text-lg mb-4'>Recommended for you</p>
          <div className='bg-neutral-800 border-1 shadow-xl rounded px-8 pt-6 pb-8 mb-10 w-100'>

          </div>
          <div className='grid grid-cols-2 gap-4'> 
            <div>
              <p className='text-md mb-4'>Start building your profile</p>
              <div className='bg-neutral-800 border-1 shadow-xl rounded px-4 pt-4 pb-8 mb-4 w-100'>
                <p className='text-md mb-2'>Add a new exercise</p>
                <p className='text-md text-gray-400 leading-0 mb-7'>An exercise can be anything from a weight lifting exercise to a simple stretch</p>
                <input
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-7"
                  id="exercise-name"
                  type="text"
                  placeholder="name for your exercise..."
                />
                <div className='flex mb-5 items-center'>
                  <input className='h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300' type="radio" id="publish" name="access-pref" value="true" />
                  <div className='pl-4 text-sm'>
                    <label htmlFor="publish">Publish exercise so that anyone can view it</label>
                  </div>
                </div>
                <div className='flex'>
                  <input className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" type="radio" id="private" name="access-pref" value="false" />
                  <div className='pl-4 text-sm'>
                    <label htmlFor="private">Keep exercise private to your library</label>
                  </div>
                </div>
                <br />
                <FilledButton text={'Create new exercise'} textWeight={'font-normal'} py={'py-1'}/>
              </div>
            </div>
          </div>
        </div>
        <div className='p-7 text-left'>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum iste nemo beatae incidunt omnis iure, rem doloribus cum ad! Quos sapiente non repellendus aspernatur sed dignissimos consectetur ut totam! Adipisci?</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage