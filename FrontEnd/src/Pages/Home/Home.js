import React from 'react'
import NavComp from '../../Components/NavBar/NavBar'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Landing from '../../Components/Landing/Landing'
import LastCourses from '../../Components/LastCourses/LastCourses'
import AboutUs from '../../Components/AboutUsHomepage/AboutUs'
import LastArticles from '../../Components/LastArticles/LastArticles'
import PopularCourses from '../../Components/PopularCourses/PopularCourses'
import PresellCourses from '../../Components/PresellCourses/PresellCourses'
import './Home.css'
import Title from '../../Components/Title/Title'
export default function Home() {
  return (
    <div >
    <Title text={'سبزلرن'}/>
    <Header></Header>
      <NavComp sticky={true}></NavComp>
      <Landing></Landing>
      <LastCourses></LastCourses>
      <PopularCourses></PopularCourses>
      <PresellCourses></PresellCourses>
      <LastArticles></LastArticles>
      <AboutUs></AboutUs>
      <Footer></Footer>
    </div>
  
  )
}
