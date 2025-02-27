import React, { useState, useRef, useEffect } from 'react';

const formatDate = (dateArray) => {
    if (!dateArray || !Array.isArray(dateArray)) return 'Date non disponible';
    try {
        // Convertir le tableau de date [year, month, day, hour, minute, second] en Date
        const [year, month, day, hour, minute] = dateArray;
        // Attention: les mois dans JavaScript commencent à 0, donc on soustrait 1 du mois
        const date = new Date(year, month - 1, day, hour, minute);
        
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        console.error('Erreur de format de date:', dateArray);
        return 'Date non disponible';
    }
};

const AnnonceCarousel = ({ annonces, autoplay = true, interval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        // Vérifier si l'autoplay est activé et si nous avons des annonces
        if (!autoplay || !annonces || annonces.length === 0) return;

        // Nettoyer l'intervalle précédent si nécessaire
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Créer un nouvel intervalle seulement si l'autoplay est activé et non mis en pause
        if (!isPaused) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) => 
                    prevIndex === annonces.length - 1 ? 0 : prevIndex + 1
                );
            }, interval);
        }

        // Nettoyage lors du démontage du composant
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [autoplay, isPaused, annonces, interval]);

    if (!annonces || annonces.length === 0) {
        return <p style={{ textAlign: 'center', fontSize: '1.5em', color: '#888' }}>Aucune annonce disponible.</p>;
    }

    const scrollToIndex = (index) => {
        const newIndex = (index + annonces.length) % annonces.length;
        setCurrentIndex(newIndex);
    };

    const handleNext = () => {
        scrollToIndex(currentIndex + 1);
    };

    const handlePrev = () => {
        scrollToIndex(currentIndex - 1);
    };

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    return (
        <div 
            style={containerStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button 
                onClick={handlePrev} 
                style={{
                    ...buttonStyle,
                    left: '20px',
                }}
                className="prev-button"
            >&lt;</button>
            
            <div style={carouselStyle}>
                {annonces.map((annonce, index) => (
                    <div 
                        key={index} 
                        style={{
                            ...cardStyle,
                            transform: `translateX(${(index - currentIndex) * 100}%)`,
                            opacity: index === currentIndex ? 1 : 0,
                        }}
                    >
                        <div style={imageContainerStyle}>
                            <img src={annonce.image} alt={annonce.titre} style={imageStyle} />
                            <div style={overlayStyle}>
                                <h2 style={titleStyle}>{annonce.titre}</h2>
                                <p style={descriptionStyle}>{annonce.description}</p>
                                <div style={dateContainerStyle}>
                                    <p style={dateStyle}>
                                        <span style={dateLabelStyle}>Début:</span>{' '}
                                        {formatDate(annonce.dateDebut)}
                                    </p>
                                    <p style={dateStyle}>
                                        <span style={dateLabelStyle}>Fin:</span>{' '}
                                        {formatDate(annonce.dateExpiration)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={handleNext} 
                style={{
                    ...buttonStyle,
                    right: '20px',
                }}
                className="next-button"
            >&gt;</button>
            
            <div style={dotsStyle}>
                {annonces.map((_, index) => (
                    <span
                        key={index}
                        style={{
                            ...dotStyle,
                            backgroundColor: currentIndex === index ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                        }}
                        onClick={() => scrollToIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

const containerStyle = {
    position: 'relative',
    width: '90vw',
    height: '400px',
    margin: '0 auto',
    overflow: 'hidden',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
};

const carouselStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
};

const cardStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transition: 'all 0.5s ease-in-out',
};

const imageContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
};

const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
};

const overlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
    color: 'white',
    padding: '40px',
    transform: 'translateY(0)',
    transition: 'transform 0.3s ease',
};

const titleStyle = {
    fontSize: '2.5em',
    marginBottom: '15px',
    fontWeight: '600',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
};

const descriptionStyle = {
    fontSize: '1.2em',
    marginBottom: '20px',
    lineHeight: '1.6',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
};

const dateContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
};

const dateStyle = {
    fontSize: '1.1em',
    color: 'rgba(255, 255, 255, 0.9)',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
};

const dateLabelStyle = {
    fontWeight: 'bold',
    color: '#fff',
    marginRight: '8px',
};

const buttonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '24px',
    color: 'white',
    cursor: 'pointer',
    zIndex: 2,
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(5px)',
    ':hover': {
        background: 'rgba(255, 255, 255, 0.3)',
    }
};

const dotsStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px',
    zIndex: 2,
};

const dotStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid white',
};

export default AnnonceCarousel;
