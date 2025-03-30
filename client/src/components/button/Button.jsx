const Button = ({ children, onClick }) => {
    return <button onClick={onClick} className="p-3 border-gray-200">{children}</button>;
}

export default Button;