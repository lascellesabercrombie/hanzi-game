import Link from 'next/link'

export default function Navbar() {
  return (<ul>
    <li><Link href="/library">Library</Link></li>
    <li><Link href="/practice">Practice</Link></li>
    <li><Link href="/settings">Settings</Link></li>
  </ul>
  )
}