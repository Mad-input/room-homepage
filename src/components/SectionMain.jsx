import Arrow from "./icons/Arrow";
import LargeArrow from './icons/LargeArrow'
import data from '../assets/data.json'
import { useEffect, useState } from "react";
import IconHamburguer from './icons/IconHamburguer'
import IconClose from './icons/IconClose'

export default function SectionMain() {
    const [id, setId] = useState(0)
    const [modal, setModal] = useState(data.interfaces[id])
    const [isMobile, setIsMobile] = useState(false)
    const [showNavbar, setShowNavbar] = useState(false)

    // Cambiar modal con el evento keyup de window
    useEffect(()=>{
        const maxLength = data.interfaces.length - 1
        setModal(data.interfaces[id])
        const handleKey = (e)=> {

            const {key} = e

            if (key == 'ArrowLeft' && id > 0) {
                setId(id - 1)
            }else if (key === 'ArrowRight' && id < maxLength) {
                setId(id + 1)
            }else return
        }

        window.addEventListener('keyup', handleKey)
        return ()=> {
            window.removeEventListener('keyup',handleKey)
        }
    },[id, modal])

    // Verificar si es mobile
    useEffect(()=>{
        const handleResize = ()=> {
            setIsMobile(window.innerWidth < 1220)
        }
        handleResize()
        window.addEventListener('resize', handleResize)

        return ()=> {
            window.removeEventListener('resize', handleResize)
        }
    },[isMobile])


    // Cambiar modal con el evento click
    const changeModal = (type)=> {
        if (type === 'right' && id < data.interfaces.length - 1) {
            setId(id + 1)
        }else if (type === 'left' && id > 0){
            setId(id - 1)
        }
    }

    const right = ()=> {
        changeModal('right')
    }
    const left = ()=> {
        changeModal('left')
    }
    const closeNavbar = ()=> {
        setShowNavbar(false)
    }
    const openNavbar = ()=> {
        setShowNavbar(true)
    }
  return (
    <section className="section__main">
        <div className="haeder__main">
        <img src={modal.image} alt="image - room 1" />
            {
                isMobile 
                ? <nav className={`nav__mobile`}>
                    <button onClick={openNavbar} className="open__nav__mobile">
                        <span>
                        <IconHamburguer></IconHamburguer>
                        </span>
                    </button>
                    <div className="logo">room</div>
                    <ul className={` list__nav__mobile ${showNavbar ? 'active' : ''}`}>
                        <li onClick={closeNavbar} ><IconClose></IconClose></li>
                        <li className="item__list">home</li>
                        <li className="item__list">shop</li>
                        <li className="item__list">about</li>
                        <li className="item__list">contact</li>
                    </ul>
                    {
                        showNavbar ? <div className="placeholder"></div> : ''
                    }
                  </nav> 
                : <nav className="nav__section-main">
                    <div className="logo">room</div>
                    <ul className="list__nav-main">
                        <li className="item__list">home</li>
                        <li className="item__list">shop</li>
                        <li className="item__list">about</li>
                        <li className="item__list">contact</li>
                    </ul>
                  </nav>

            }

            <div className="buttons">
                <button onClick={left}>
                    <span>
                    <Arrow></Arrow>
                    </span>
                </button>
                <button onClick={right}>
                    <span>
                    <Arrow></Arrow>
                    </span>
                </button>
            </div>
        </div>
        <div className="description__main">
            <h1 className="title__description">{modal.title}</h1>
            <p className="description">
                {modal.description}
            </p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="link">Shop Now <LargeArrow></LargeArrow></a>
        </div>
    </section>
  )
}
