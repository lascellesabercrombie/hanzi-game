'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SvgLibrary from "../../public/navbar/SvgLibrary"
import SvgPractice from "../../public/navbar/SvgPractice"
import SvgSettings from "../../public/navbar/SvgSettings"
import { ReactElement } from 'react'

type NavBarItemType = [string, string, ReactElement<any, any>]

export default function Navbar() {

  const pathname = usePathname()
  const currentPageStyling = "fill-blue-200 border-blue-200"
  const otherPageStyling = "fill-slate-200 border-transparent"
  const navbarItems: Array<NavBarItemType> = [
    ["Library", "/library", <SvgLibrary className={`border-solid border-2 rounded-lg max-h-full max-w-10 p-0.5 ${pathname === "/library" ? currentPageStyling : otherPageStyling}`} key="library" />],
    ["Practice", "/practice", <SvgPractice className={`border-solid border-2 rounded-lg max-h-full max-w-10 p-0.5 ${pathname === "/practice" ? currentPageStyling : otherPageStyling}`} key="practice" />],
    ["Settings", "/settings", <SvgSettings className={`border-solid border-2 rounded-lg max-h-full max-w-10 p-0.5 ${pathname === "/settings" ? currentPageStyling : otherPageStyling}`} key="settings" />]
  ]

  return (
    <nav>
      <ul className="bg-cyan-950 fixed border-t-2 border-slate-200 bottom-0 max-h-14 min-w-full flex justify-around">
        {navbarItems.map(([name, link, ImageComponent]) => (
          <li className="flex" key={`navbar-item-${name}`}>
            <Link href={link} className="p-2">
              {ImageComponent}
              <span className='sr-only'>{name}</span>
            </Link>
          </li>))}

      </ul>
    </nav>
  )
}