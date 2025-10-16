const Alert = ({alert}) => {
    return (
        <div className={`${alert.error ? "from-red-400 to-red-600" : "from-indigo-400 to-indigo-600"} bg-gradient-to-r w-full text-white text-center py-2 mb-4 rounded-lg text-sm font-bold uppercase`}>
            <p>{alert.message}</p>
        </div>
    )
}

export default Alert