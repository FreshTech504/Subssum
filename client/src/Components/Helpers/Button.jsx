import { Link } from "react-router-dom"

function Button({name, link, bg, styles, onClick}) {
  return (
    <Link onClick={onClick} to={link ? `/${link}` : ''} className={`pad1 rounded-[10px] flex items-center justify-center text-center ${ styles ? `${styles}` : `${ bg ? 'bg-second-color hover:bg-second-color-hover text-white' : 'bg-gray-10 border-[2px] border-second-color text-second-color' }` } `}>
        {name}
    </Link>
  )
}

export default Button