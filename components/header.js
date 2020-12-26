import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = () => {
	const router = useRouter()
	return (
		<div className="header">
			<h1>Site</h1>
			<ul>
				<li className={(router.pathname == '/' ? 'active' : '')}>
					<Link href="/"><span>Home</span></Link>
				</li>
				<li className={(router.pathname == '/pages' ? 'active' : '')}>
					<Link href="/pages"><span>Pages</span></Link>
				</li>
				<li className={(router.pathname == '/posts' ? 'active' : '')}>
					<Link href="/posts"><span>Posts (Blog)</span></Link>
				</li>
				<li className={(router.pathname == '/books' ? 'active' : '')}>
					<Link href="/books"><span>Books</span></Link>
				</li>
			</ul>
		</div>
	)
}

export default Header