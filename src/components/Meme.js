import React from "react";

function Meme() {
    const [meme,setMeme] = React.useState({
        topText:"",
        bottomText:"",
        memeImage:""
    })
    const [allMemesImages,setAllMemesImages] = React.useState("")
    let count = 0
    function renderNewImage() {
        const randomNum = Math.floor(Math.random()*allMemesImages.length)
        const randomArray = allMemesImages[randomNum]
        count++
        setMeme((prevMeme) => {
            return {
                ...prevMeme,
                memeImage: randomArray.url
            }
        })
    }
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then((respond)=>respond.json())    
        .then((data)=>setAllMemesImages(data.data.memes))
    },[count])
  
    function handleChange(event) {
        const {name,value} = event.target
        setMeme((prevState)=>{
            return {
                ...prevState,
                [name]:value
            }
        })
    }

    return (
        <div className="input-container">
            <div className="input-field">
                <input className="input1" placeholder="Shut up" name="topText" onChange={handleChange} value={meme.topText}></input>
                <input className="input2" placeholder="and take my money" name="bottomText" onChange={handleChange} value={meme.bottomText}></input>
                <button className="img-btn" onClick={renderNewImage} >Get a new meme image</button>
            </div>
            <div className="image-container">
            {meme.memeImage && <img src={meme.memeImage} alt="Not Supported" className="image"/>}
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
       </div>
    
    )
};
export default Meme;