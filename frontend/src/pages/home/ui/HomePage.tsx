import orbitlogo from '../../../assets/icons/orbitlogo.png';

export const HomePage = () => {
    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <img
                src={orbitlogo}
                alt="Orbit Logo"
                style={{
                    opacity: 0.3,
                    display: "inline-block",
                    marginTop: "-200px" // подняли картинку вверх
                }}
            />
            <h1
                style={{
                    fontSize: "5rem",
                    position: "absolute",
                    marginTop: "100px",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "orange",
                    border: "1px solid white",
                    margin: 0,
                }}
            >
                АВТОРИЗУЙТЕСЬ
            </h1>
        </div>
    );
};
