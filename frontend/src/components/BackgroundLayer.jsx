import bg from "/pexels-pixabay-clouds.jpg"

const BackgroundLayer = () => {
    return (
        <div
            className="w-full h-full bg-cover bg-center absolute top-0 left-0 filter blur-sm z-0"
            style={{
                background: `url(${bg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}
        />
    )
}

export default BackgroundLayer;