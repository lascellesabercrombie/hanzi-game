import Link from 'next/link'
import SvgLibrary from "../../public/navbar/SvgLibrary"
import SvgPractice from "../../public/navbar/SvgPractice"
import SvgSettings from "../../public/navbar/SvgSettings"
import { ReactElement } from 'react'
export default function Navbar() {

  type NavBarItemType = [string, string, ReactElement<any, any>]
  const navbarItems: Array<NavBarItemType> = [
    ["Library", "/library", <SvgLibrary className="fill-slate-200 max-h-full max-w-20 p-2.5" key="library" />],
    ["Practice", "/practice", <SvgPractice className="fill-slate-200 max-h-full max-w-20 p-2.5" key="practice" />],
    ["Settings", "/settings", <SvgSettings className="fill-slate-200 max-h-full max-w-20 p-2.5" key="settings" />]
  ]
  return (<ul className="bg-cyan-950 fixed border-t-2 border-slate-200 bottom-0 max-h-14 min-w-full flex justify-around">
    {navbarItems.map(([name, link, ImageComponent]) => (
      <li className="flex" key={`navbar-item-${name}`}>
        <Link href={link}>
          {ImageComponent}
          <span className='sr-only'>{name}</span>
        </Link>
      </li>))}

  </ul>
  )
}