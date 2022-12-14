const Spinner = () => {
    return (
        <div className="loader animate-spin mx-auto" style={{  border:'10px solid #f3f3f3',
            borderTop: '10px solid #00b3ff',
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            animation: 'spin 1s linear infinite'}}></div>)
};




export default Spinner;
