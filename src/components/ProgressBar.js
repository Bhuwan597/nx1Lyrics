"use client"
import React, { useEffect, useState } from 'react'
import styles from '../app/cssStyles/Main.module.css'

const ProgressBar = () => {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
       const interval = setInterval(()=>{
         setProgress((prevProgress)=> prevProgress >= 100?0:prevProgress+10)
       }, 600)
    
      return () => clearInterval(interval)
    }, [])
    
  return (
    <div className={styles.loadingContainer}>
     <div className={styles.loadingBar} style={{width : `${progress}%`}}></div>
    </div>
  )
}

export default ProgressBar
