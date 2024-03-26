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
  const currentPageStyling = "border-solid border-2 border-blue-200"
  const navbarItems: Array<NavBarItemType> = [
    ["Library", "/library", <SvgLibrary className={`${pathname === "/library" ? "fill-blue-200" : "fill-slate-200"} rounded-lg max-h-full max-w-10 ${pathname === "/library" ? currentPageStyling : 'border-solid border-2 border-transparent'}`} key="library" />],
    ["Practice", "/practice", <SvgPractice className={`${pathname === "/practice" ? "fill-blue-200" : "fill-slate-200"} rounded-lg max-h-full max-w-10 ${pathname === "/practice" ? currentPageStyling : 'border-solid border-2 border-transparent'}`} key="practice" />],
    ["Settings", "/settings", <SvgSettings className={`${pathname === "/settings" ? "fill-blue-200" : "fill-slate-200"} rounded-lg max-h-full max-w-10 ${pathname === "/settings" ? currentPageStyling : 'border-solid border-2 border-transparent'}`} key="settings" />]
  ]

  return (<ul className="bg-cyan-950 fixed border-t-2 border-slate-200 bottom-0 max-h-14 min-w-full flex justify-around">
    {navbarItems.map(([name, link, ImageComponent]) => (
      <li className="flex" key={`navbar-item-${name}`}>
        <Link href={link} className="p-2.5">
          {ImageComponent}
          <span className='sr-only'>{name}</span>
        </Link>
      </li>))}

  </ul>
  )
}