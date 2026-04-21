import React, { useState, useEffect } from "react";

function Carousel(){

const images = [
"https://images.unsplash.com/photo-1523240795612-9a054b0db644",
"https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
"https://images.unsplash.com/photo-1588072432836-e10032774350"
]

const [index,setIndex] = useState(0)

useEffect(()=>{

const interval = setInterval(()=>{

setIndex((index+1)%images.length)

},3000)

return ()=>clearInterval(interval)

})

return(

<div className="carousel">

<img src={images[index]} alt="banner"/>

</div>

)

}

export default Carousel;