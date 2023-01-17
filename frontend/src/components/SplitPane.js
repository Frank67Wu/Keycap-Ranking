

const SplitPane = ({width, height, children, c1, c2, c3}) => {

    // Splits the background into three colours, c1, c2, and c3
    const gradient = 'linear-gradient(to right,' + c1 + ' 33.3%,' + c2 + ' 33.3%,' + c2 + ' 66.6%,' + c3 + ' 66.6%,' + c3 + ' 100%)'
    
    return (
        <div className='splitPane' style={{width:width, height:height, 
            background: gradient }}>
            <h2 className="centeredText">
                {children.text}
            </h2>
            <img src='assets/4x.png'/>
        </div>
    )

}

export default SplitPane