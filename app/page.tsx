
"use client"
import { SignInForm } from './auth/sign-in-form'
import { useState } from 'react'
import HomePage from './home/home'
export default function Home() {
  const [isLogin, setIsLogin] = useState(false)

  return (

    isLogin ? <SignInForm /> : <HomePage />


  )
}
